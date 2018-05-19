import GoalsList from '@/components/compounds/GoalsList/GoalsList.vue'
//import Card from '@/components/atoms/Card/Card.vue'
//import CardBody from '@/components/atoms/Card/Body/Body.vue'

import axios from 'axios'
import uniqBy from 'lodash.uniqby'

export default {
  name: 'dashboard',
  components: {
    //Card,
    //CardBody,
    GoalsList
  },
  data () {
    return {
      user: null,
      goals: null,
      channel: null
    }
  },
  methods: {
    handler ({ goal }) {
      const { id } = goal

      if (this.goals && this.goals.length) {
        const index = this.goals.findIndex(g => g.id === id)
        if (index > -1) {
          this.goals = uniqBy([
            ...this.goals.slice(0, index),
            goal,
            ...this.goals.slice(index + 1)
          ], 'id')
        } else {
          this.goals.push(goal)
        }
      } else {
        this.goals = [ goal ]
      }
    }
  },
  mounted () {
    this.channel = this.$store.getters.channel
    const { ACHIEVE_EVENT, COLLABORATION_EVENT, CREATED_EVENT } = this.$store.getters.events

    this.channel.bind(ACHIEVE_EVENT, this.handler)
    this.channel.bind(COLLABORATION_EVENT, this.handler)

    this.channel.bind(CREATED_EVENT, ({ goal }) => {
      if (this.goals && this.goals.length) {
        this.goals.push(goal)
      } else {
        this.goals = [ goal ]
      }
    })
  },
  async created () {
    this.user = this.$store.getters.user
    const jwt = this.$store.getters.jwt
    
    try {
      const response = await axios.get(`/v1/users/${this.user.id}/goals`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      })

      const goals = response.data
      this.goals = goals
    } catch (error) {
      try {
        const { status } = error.response
        if (status === 401 || status === 403) return this.$router.push({ name: 'sign-in', query: { next: this.$route.path } })
      } catch (e) {}
      this.$router.push('/')
    }
  },
  beforeDestroy () {
    this.channel.unbind()
  }
}
