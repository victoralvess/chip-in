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
      <LinePlaceholder v-if="!goals" :times="5" />
      <ListGroup v-if="goals">
       <ListGroupItem v-for="goal of goals" :key="goal.id">
         <div>
           <router-link :to="{ name: 'goal', params: { id: goal.id } }">{{goal.title}}</router-link>
           <ProgressBar :value="goal.progress"/>
         </div>
       </ListGroupItem>
      </ListGroup>
    </div>
  </div>
</template>

<script>
import ListGroup from '@/components/atoms/ListGroup'
import ListGroupItem from '@/components/atoms/ListGroupItem'
import ProgressBar from '@/components/atoms/ProgressBar'
import Card from '@/components/atoms/Card'
import CardBody from '@/components/atoms/CardBody'
import LinePlaceholder from '@/components/atoms/LinePlaceholder'
import Pusher from 'pusher-js'

import axios from 'axios'

const PUSHER_APP_KEY = '588c3e31412e021da7a4'
const WS_HOST = 'ws.pusherapp.com'
const HTTP_HOST = 'sockjs.pusher.com'
const ENCRYPTED = true
const CLUSTER = 'mt1'

const CHANNEL_NAME = 'chip-in'
const COLLABORATION_EVENT = 'collaboration'

const pusher = new Pusher(PUSHER_APP_KEY, {
  wsHost: WS_HOST,
  httpHost: HTTP_HOST,
  encrypted: ENCRYPTED,
  cluster: CLUSTER
})

const channel = pusher.subscribe(CHANNEL_NAME)

export default {
  name: 'dashboard',
  components: {
    ListGroup,
    ListGroupItem,
    ProgressBar,
    Card,
    CardBody,
    LinePlaceholder
  },
  data () {
    return {
      user: null,
      goals: null,
    }
  },
  async created () {
    channel.unbind()
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
