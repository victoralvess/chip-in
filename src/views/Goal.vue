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
        <Button class="btn-danger m-40" :click="closeGoal" v-if="goal.is_open">Close</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.goal-container,
.m-40 {
  margin-top: 40px;
}
</style>

<script>
import ProgressBar from '@/components/atoms/ProgressBar'
import Button from '@/components/atoms/Button'
import LinePlaceholder from '@/components/atoms/LinePlaceholder'
import ButtonPlaceholder from '@/components/atoms/ButtonPlaceholder'

import axios from 'axios'

export default {
  name: 'goal',
  components: {
    ProgressBar,
    Button,
    LinePlaceholder,
    ButtonPlaceholder
  },
  data() {
    return {
      id: null,
      goal: null,
      uid: null
    }
  },
  async created() {
    const user = this.$store.getters.user
    this.uid = user.id
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
    }
  }
}
</script>
