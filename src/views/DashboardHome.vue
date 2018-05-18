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
      channel: null
    }
  },
  async mounted () {
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
</script>
