import GoalsList from '@/components/compounds/GoalsList/GoalsList.vue'
import NavigationBar from '@/components/compounds/NavigationBar/NavigationBar.vue'

import axios from 'axios'

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
      return this.$router.push('/404')
    }
  },
  async mounted () {
    this.channel = this.$store.getters.channel
    const { CREATED_EVENT } = this.$store.getters.events

    this.channel.bind(CREATED_EVENT, ({ goal }) => {
      if (this.goals && this.goals.length)
        this.goals.push(goal)
      else
        this.goals = [ ...goal ]
    })    
  },
  beforeDestroy () {
    this.channel.unbind()
  },
  destroyed () {
    this.goals = null
    this.channel = null
  }
}