<template>
  <div>  
    <div class="jumbotron d-flex flex-column justify-content-center align-items-center">
      <img src="//via.placeholder.com/150x150">
    </div>
    <div class="container d-flex flex-column">
      <!--<Card>
        <CardBody>
          {{user.username}} | ${{user.wallet}}
        </CardBody>
      </Card> -->
      <GoalsList :placeholders="5" :goals="goals" />
    </div>
  </div>
</template>

<script>
import Card from '@/components/atoms/Card'
import CardBody from '@/components/atoms/CardBody'
import GoalsList from '@/components/compounds/GoalsList'

import axios from 'axios'

export default {
  name: 'dashboard',
  components: {
    Card,
    CardBody,
    GoalsList
  },
  data () {
    return {
      user: null,
      goals: null,
    }
  },
  async created () {
    const channel = this.$store.getters.channel
    const { COLLABORATION_EVENT, CREATED_EVENT } = this.$store.getters.events
    // channel.unbind()
    channel.bind(COLLABORATION_EVENT, data => {
      const { goal, user, jwt } = data
      const { id } = goal

      const index = this.goals.findIndex(g => g.id === id)
      this.goals = [
        ...this.goals.slice(0, index),
        goal,
        ...this.goals.slice(index + 1)
      ]
      
      this.$store.dispatch('user', user)
      this.$store.dispatch('jwt', jwt)
    })

    channel.bind(CREATED_EVENT, ({ goal }) => {
      this.goals.push(goal)
    })
    
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
      this.$router.push('/')
    }
  }
}
</script>
