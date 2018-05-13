<template>
  <div v-if="goal" class="container goal-container">
    <h1>{{goal.title}}</h1>
    <p>{{goal.description}}</p>
    <ProgressBar :value="goal.progress">{{goal.earned}} / {{goal.goal}}</ProgressBar>
    <div class="d-flex justify-content-between">
      <span>{{goal.due.substr(0, 10)}}</span>
      <span>
        <b>{{goal.is_open ? 'Open' : 'Closed'}}</b>
      </span>
    </div>
    <div class="d-flex justify-content-end">
      <Button class="btn-danger m-40" :click="closeGoal" v-if="goal.is_open">Close</Button>
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

import axios from 'axios'

export default {
  name: 'goal',
  components: {
    ProgressBar,
    Button
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
    try {
      const response = await axios.get(`/v1/users/${this.uid}/goals/${this.id}`, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.jwt}`
        }
      })
      const goal = response.data
      this.setGoal(goal)

    } catch (error) {
      if (error.response.status === 404) return this.$router.push('/404')
      this.$router.push('/')
    }
  },
  methods: {
    setGoal (goal) {
      this.goal = {
        ...goal,
        progress: goal.earned / goal.goal * 100
      }
    },
    async closeGoal() {
      try {
        const userPatchResponse = await axios.patch(`/v1/users/${this.uid}`, [{
          op: 'update_wallet',
          field: 'wallet',
          value: this.goal.earned
        }], {
          headers: {
            'Authorization': `Bearer ${this.$store.getters.jwt}`
          }
        })
        const user = userPatchResponse.data
        this.$store.dispatch('user', user.user)
        this.$store.dispatch('jwt', user.jwt)

        const goalPatchResponse = await axios.patch(`/v1/goals/${this.id}`, [{
          op: 'update',
          field: 'is_open',
          value: false
        }], {
          headers: {
            'Authorization': `Bearer ${this.$store.getters.jwt}`
          }
        })

        const goal = goalPatchResponse.data
        this.setGoal(goal)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
