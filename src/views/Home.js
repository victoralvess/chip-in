import GoalsList from '@/components/compounds/GoalsList/GoalsList.vue'
import NavigationBar from '@/components/compounds/NavigationBar/NavigationBar.vue'

import axios from 'axios'
import { addGoal, handleErrorRedirect } from '@/views/utils'

export default {
  name: 'home',
  components: {
    GoalsList,
    NavigationBar,
  },
  computed: {
    goals: {
      get () {
        return this.$store.getters.goals
      },
      set (goals) {
       this.$store.commit('setGoals', goals) 
      }
    },
    closedGoals () {
      return this.$store.getters.closedGoals
    },
    activeGoals () {
      return this.$store.getters.activeGoals
    },
  },
  data () {
    return {
      goalsList: null,
      channel: null
    }
  },
  async created () {
    this.goalsList = this.goals

    try {
      const response = await axios.get('/v1/goals')
      
      const goals = response.data

      if (JSON.stringify(this.goals) !== JSON.stringify(goals)) {
        this.goals = goals
        this.goalsList = this.goals
      }

    } catch (error) {
      try {
        const code = error.response.status
        const message = error.response.data.message || message
        this.$router.push(await handleErrorRedirect(code, message))
      } catch (e) {}
    }
  },
  async mounted () {
    this.channel = this.$store.getters.channel
    const { ACHIEVE_EVENT, COLLABORATION_EVENT, CREATED_EVENT } = this.$store.getters.events


    this.channel.bind(COLLABORATION_EVENT, this.handler)
    this.channel.bind(ACHIEVE_EVENT, this.handler)
    this.channel.bind(CREATED_EVENT, this.handler)    
  },
  methods: {
    handler ({ goal }) {
      this.goals = addGoal(this.goals, goal)
    },
    toggleClass (href) {
      document.querySelectorAll(`.filter-group > a`).forEach(el => el.classList.toggle('filter', false))
      document.querySelector(`.filter-group > a[href="#/#${href}"]`).classList.toggle('filter', true)
    },
    closed () {
      this.toggleClass('closed')
      this.goalsList = this.closedGoals
    },
    active () {
      this.toggleClass('active')
      this.goalsList = this.activeGoals
    },
    all () {
      this.toggleClass('all')
      this.goalsList = this.goals
    }
  },
  beforeDestroy () {
    this.channel.unbind()
  },
  destroyed () {
    // this.goals = null
    this.channel = null
  }
}
