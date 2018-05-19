import GoalsList from '@/components/compounds/GoalsList/GoalsList.vue'
import NavigationBar from '@/components/compounds/NavigationBar/NavigationBar.vue'

import axios from 'axios'
import uniqBy from 'lodash.uniqby'

export default {
  name: 'home',
  components: {
    GoalsList,
    NavigationBar
  },
  data () {
    return {
      goals: null,
      channel: null
    }
  },
  async created () {
    try {
      const response = await axios.get('/v1/goals')

      this.goals = response.data
    } catch (error) {
      try {
        const { status, data: { message } } = error.response
        return this.$router.push({ name: 'error', params: { code: status, message: message } })
      } catch (error) {
        return this.$router.push({ name: 'error', params: { code: 500, message: 'Server Error. Try Again Soon.' } })
      }
    }
  },
  async mounted () {
    this.channel = this.$store.getters.channel
    const { ACHIEVE_EVENT, COLLABORATION_EVENT, CREATED_EVENT } = this.$store.getters.events


    this.channel.bind(COLLABORATION_EVENT, this.handler)
    this.channel.bind(ACHIEVE_EVENT, this.handler)

    this.channel.bind(CREATED_EVENT, ({ goal }) => {
      if (this.goals && this.goals.length)
        this.goals.push(goal)
      else
        this.goals = [ goal ]
    })    
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
  beforeDestroy () {
    this.channel.unbind()
  },
  destroyed () {
    this.goals = null
    this.channel = null
  }
}
