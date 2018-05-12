<template>
  <div>
    <NavigationBar/>
    <div class="jumbotron d-flex flex-column justify-content-center align-items-center">
      <img src="//via.placeholder.com/150x150">
    </div>
    <div class="container d-flex flex-column">
      <Card>
        <CardBody>
          {{user.username}} | ${{user.wallet}}
        </CardBody>
      </Card>
      <ListGroup v-if="goals">
        <ListGroupItem v-for="goal of goals" :key="goal.id">
          <div>
            <router-link :to="'/goals/' + goal.id">{{goal.title}}</router-link>
            <ProgressBar :value="goal.progress"/>
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/compounds/NavigationBar'
import ListGroup from '@/components/atoms/ListGroup'
import ListGroupItem from '@/components/atoms/ListGroupItem'
import ProgressBar from '@/components/atoms/ProgressBar'
import Card from '@/components/atoms/Card'
import CardBody from '@/components/atoms/CardBody'

import axios from 'axios'

export default {
  name: 'dashboard',
  components: {
    NavigationBar,
    ListGroup,
    ListGroupItem,
    ProgressBar,
    Card,
    CardBody
  },
  data () {
    return {
      user: null,
      goals: null,
    }
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
      this.goals = goals.map(goal => {
        return {
          ...goal,
          id: goal._id,
          progress: goal.earned * 100 / goal.goal
        }
      })
    } catch (error) {
      this.$router.push('/')
    }
  }
}
</script>
