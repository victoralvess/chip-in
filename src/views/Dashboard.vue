<template>
  <div>
    <div class="jumbotron d-flex flex-column justify-content-center align-items-center">
      <img src="//via.placeholder.com/150x150">
    </div>
    <div class="container d-flex flex-column">
      <ListGroup>
        <ListGroupItem>
          <div>
            <a href="/goals/1">Goal 1</a>
            <ProgressBar value="97"/>
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>
  </div>
</template>

<script>
import ListGroup from '@/components/ListGroup'
import ListGroupItem from '@/components/ListGroupItem'
import ProgressBar from '@/components/ProgressBar'

export default {
  name: 'dashboard',
  components: {
    ListGroup,
    ListGroupItem,
    ProgressBar
  }
}
</script>
