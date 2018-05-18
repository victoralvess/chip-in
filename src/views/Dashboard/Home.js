import GoalsList from '@/components/compounds/GoalsList/GoalsList.vue'
//import Card from '@/components/atoms/Card/Card.vue'
//import CardBody from '@/components/atoms/Card/Body/Body.vue'

import axios from 'axios'

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
  mounted () {
    this.channel = this.$store.getters.channel
    const { COLLABORATION_EVENT, CREATED_EVENT } = this.$store.getters.events

    this.channel.bind(COLLABORATION_EVENT, ({ goal }) => {
      const { id } = goal

      if (this.goals && this.goals.length) {
        const index = this.goals.findIndex(g => g.id === id)
        this.goals = [
          ...this.goals.slice(0, index),
          goal,
          ...this.goals.slice(index + 1)
        ]
      } else {
        this.goals = [ ...goal ]
      }
    })

    this.channel.bind(CREATED_EVENT, ({ goal }) => {
      if (this.goals && this.goals.length) {
        this.goals.push(goal)
      } else {
        this.goals = [ ...goal ]
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
//this.user= null
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