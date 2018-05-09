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
      <ListGroup>
        <ListGroupItem>
          <div>
            <a href="/goals/1">Goal 1</a>
            <ProgressBar :value="97"/>
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
      user: null
    }
  },
  created () {
    this.user = this.$store.getters.user
  }
}
</script>
