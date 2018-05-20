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
      channel: null,
      privateChannel: null,
    }
  },
  methods: {
    handler ({ goal }) {
      const { id, uid } = goal

      if (uid === this.user.id) {
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
    }
  },
  mounted () {
    this.channel = this.$store.getters.channel
    // this.privateChannel = this.$store.getters.privateChannel
    const { ACHIEVE_EVENT, COLLABORATION_EVENT, CREATED_EVENT, WALLET_UPDATED_EVENT } = this.$store.getters.events

    this.channel.bind(ACHIEVE_EVENT, this.handler)
    this.channel.bind(COLLABORATION_EVENT, this.handler)
    this.channel.bind(WALLET_UPDATED_EVENT, ({ event, uid, value }) => {
      const uidIsEqual = uid === this.user.id
      const uidHaveToBeEqual = event === ACHIEVE_EVENT
      const match = uidIsEqual === uidHaveToBeEqual// || (!uidEqual)

      if (match) {
        this.user.wallet = value
      }
    })

    this.channel.bind(CREATED_EVENT, ({ goal }) => {
      if (this.user.id === goal.uid) {
        if (this.goals && this.goals.length) {
          this.goals.push(goal)
        } else {
          this.goals = [ goal ]
        }
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
        if (status === 404) return this.$router.push({ name: 'error', params: { code: status, message: 'Goals not found.' } })
      } catch (e) {}
      this.$router.push('/')
    }
  },
  beforeDestroy () {
    this.channel.unbind()
  }
}
