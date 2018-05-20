import ProgressBar from '@/components/atoms/ProgressBar/ProgressBar.vue'
import Button from '@/components/atoms/Button/Button.vue'
import LinePlaceholder from '@/components/atoms/Placeholder/Line/Line.vue'
import ButtonPlaceholder from '@/components/atoms/Placeholder/Button/Button.vue'
import Form from '@/components/atoms/Form/Form.vue'
import Label from '@/components/atoms/Label/Label.vue'
import Input from '@/components/atoms/Input/Input.vue'

import axios from 'axios'

export default {
  name: 'goal',
  components: {
    ProgressBar,
    Button,
    LinePlaceholder,
    ButtonPlaceholder,
    Form,
    Label,
    Input
  },
  data() {
    return {
      id: null,
      goal: null,
      uid: null,
      user: null,
      value: 0,
      channel: null
    }
  },
  mounted() {
    this.channel = this.$store.getters.channel
    const { ACHIEVE_EVENT, COLLABORATION_EVENT } = this.$store.getters.events
  
    this.channel.bind(ACHIEVE_EVENT, this.pusherHandler)
    this.channel.bind(COLLABORATION_EVENT, this.pusherHandler)
  },
  async created () {        
    this.user = this.$store.getters.user
    this.uid = this.user.id
    this.id = this.$route.params.id

    try {
      const response = await axios.get(`/v1/goals/${this.id}`, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.jwt}`
        }
      })
      this.goal = response.data
    } catch (error) {
      const { status } = error.response
      if (status === 404) return this.$router.push('/404')
      else if (status === 401) return this.$router.push({ name: 'sign-in', query: { next: this.$route.path } })
      this.$router.push('/')
    }
  },
  beforeDestroy() {
    this.channel.unbind();
  },
  methods: {
    pusherHandler ({ goal }) {
      this.goal = goal
    },
    async closeGoal() {

      this.goal.is_open = false

      try {
        const response = await axios.post(`/v1/goals/${this.id}/achieve`, {}, {
          headers: {
            'Authorization': `Bearer ${this.$store.getters.jwt}`
          }
        })
      
        const { user, jwt: newJwt } = response.data
        this.user = user

        const { dispatch } = this.$store
        dispatch('user', user)
        dispatch('jwt', newJwt)
      } catch (error) {
        const { status } = error.response
        const { $router: r } = this;
        
        this.goal.is_open = true

        if (status === 401) return r.push('/sign-in')
        else if (status == 404) return r.push('/404')

        r.push('/')
      }
    },
    async contribute() {
      this.user = this.$store.getters.user
      const jwt = this.$store.getters.jwt
    
      const { earned: originalEarned, progress: originalProgress, goal } = this.goal
      const { wallet: originalWallet } = this.user

      try {
        this.goal.earned += this.value
        this.goal.progress = this.goal.earned * 100 / this.goal.goal
        this.user.wallet -=  this.value

        const response = await axios.post(`/v1/goals/${this.id}/contribute`, {
          uid: this.user.id,
          value: this.value
        }, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
      })

        const { user, jwt: newJwt } = response.data
        this.user = user

        const { dispatch } = this.$store
        dispatch('user', user)
        dispatch('jwt', newJwt)
    } catch (e) {
      const { status } = e.response

      if (status === 401) return this.$router.push('/sign-in')

      this.goal = {
        ...this.goal,
        earned: originalEarned,
        progress: originalProgress
      }

      this.user.wallet = originalWallet
    }

    }
  }
}
