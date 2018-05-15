<template>
  <div class="container goal-container">
    <div v-if="!goal"> 
      <LinePlaceholder :times="4" />
      <div class="d-flex justify-content-end">
        <ButtonPlaceholder />
      </div>
    </div>
    <div v-if="goal">
      <h1>{{goal.title}}</h1>
      <p>{{goal.description}}</p>
      <ProgressBar :value="goal.progress">{{goal.earned}} / {{goal.goal}}</ProgressBar>
      <div class="d-flex justify-content-between">
        <span>{{goal.due.substr(0, 10)}}</span>
        <span>
          <b>{{goal.is_open ? 'Open' : 'Closed'}}</b>
        </span>
      </div>
      <div class="d-flex justify-content-end" v-if="goal.uid === uid">
        <Button class="btn-danger mt-40" :click="closeGoal" v-if="goal.is_open">Close</Button>
      </div>
      <form @submit.prevent="contribute" v-else-if="goal.is_open">
        <div class="form-group mt-40">
          <Label for="value" label="Contribution value" />
          <Input type="number" name="value" id="value" min="0" :max="user.wallet" v-model.number="value"/>
          <Button class="btn-success mt-40" type="submit">Contribute</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.goal-container,
.mt-40 {
  margin-top: 40px;
}
</style>

<script>
import ProgressBar from '@/components/atoms/ProgressBar'
import Button from '@/components/atoms/Button'
import LinePlaceholder from '@/components/atoms/LinePlaceholder'
import ButtonPlaceholder from '@/components/atoms/ButtonPlaceholder'
import Label from '@/components/atoms/Label'
import Input from '@/components/atoms/Input'

import axios from 'axios'

export default {
  name: 'goal',
  components: {
    ProgressBar,
    Button,
    LinePlaceholder,
    ButtonPlaceholder,
    Label,
    Input
  },
  data() {
    return {
      id: null,
      goal: null,
      uid: null,
      user: null,
      value: 0
    }
  },
  async created() {
    this.user = this.$store.getters.user
    this.uid = this.user.id
    this.id = this.$route.params.id

    const channel = this.$store.getters.channel
    const { ACHIEVE_EVENT, COLLABORATION_EVENT } = this.$store.getters.events
    channel.unbind()
    
    channel.bind(ACHIEVE_EVENT, data => {
      this.goal = data.goal
    });

    channel.bind(COLLABORATION_EVENT, data => {
      const { goal, user, jwt } = data
      this.goal = goal
      this.user = user
      this.value = 0
      const { dispatch } = this.$store
      dispatch('user', user)
      dispatch('jwt', jwt)
    })
    
    try {
      const response = await axios.get(`/v1/users/${this.uid}/goals/${this.id}`, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.jwt}`
        }
      })
      this.goal = response.data
    } catch (error) {
      if (error.response.status === 404) return this.$router.push('/404')
      this.$router.push('/')
    }
  },
  methods: {
    async closeGoal() {
      try {
        await axios.post(`/v1/goals/${this.id}/achieve`, {}, {
          headers: {
            'Authorization': `Bearer ${this.$store.getters.jwt}`
          }
        })
      } catch (error) {
        console.log(error)
        console.log(error.response)
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

        console.log(response)
    } catch (e) {
      console.log('error', e)
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
</script>
