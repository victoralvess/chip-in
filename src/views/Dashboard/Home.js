import GoalsList from '@/components/compounds/GoalsList/GoalsList.vue'

import axios from 'axios'
import { addGoal } from '@/views/utils'

export default {
  name: 'dashboard',
  components: {
    GoalsList
  },
  data () {
    return {
      user: null,
      goals: null,
      channel: null,
    }
  },
  methods: {
    handler ({ goal }) {
      const { uid } = goal

      if (this.user.id === uid) {
        this.goals = addGoal(this.goals, goal)
      }
    }
  },
  mounted () {
    this.channel = this.$store.getters.channel
    const { ACHIEVE_EVENT, COLLABORATION_EVENT, CREATED_EVENT, WALLET_UPDATED_EVENT } = this.$store.getters.events

    this.channel.bind(ACHIEVE_EVENT, this.handler)
    this.channel.bind(COLLABORATION_EVENT, this.handler)
    this.channel.bind(CREATED_EVENT, this.handler)

    this.channel.bind(WALLET_UPDATED_EVENT, ({ event, uid, value }) => {
      const uidIsEqual = uid === this.user.id
      const uidHaveToBeEqual = event === ACHIEVE_EVENT
      const match = uidIsEqual === uidHaveToBeEqual

      if (match) {
        this.user.wallet = value
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
        const { status, data: { message } } = error.response
        if (status === 401 || status === 403) return this.$router.push({ name: 'sign-in', query: { next: this.$route.path } })
        if (status === 404) {
          const { dispatch } = this.$store
          dispatch('user', null)
          dispatch('jwt', null)
          return this.$router.push({ name: 'error', params: { code: status, message: message } })
        }
        if (status === 500) return this.$router.push({ name: 'error', params: { code: status, message: 'Server Error. Try Again Soon.' } })
      } catch (e) {}
      this.$router.push('/')
    }
  },
  beforeDestroy () {
    this.channel.unbind()
  }
}
