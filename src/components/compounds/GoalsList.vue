<template>
  <div>
    <LinePlaceholder v-if="!goals" :times="placeholders" />
      <ListGroup v-if="goals">
        <ListGroupItem v-for="goal of goals" :key="goal.id">
          <div>
           <router-link :to="{ name: 'goal', params: { id: goal.id } }">{{goal.title}}</router-link>
           <ProgressBar :value="goal.progress"/>
          </div>
        </ListGroupItem>
      </ListGroup>
  </div>
</template>

<script>
import LinePlaceholder from '@/components/atoms/LinePlaceholder'
import ListGroup from '@/components/atoms/ListGroup'
import ListGroupItem from '@/components/atoms/ListGroupItem'
import ProgressBar from '@/components/atoms/ProgressBar'

export default {
  components: {
    LinePlaceholder,
    ListGroup,
    ListGroupItem,
    ProgressBar
  },
  props: {
    goals: {
      type: Array || Object || null
    },
    placeholders: {
      type: Number,
      default: 1
    }
  }
}
</script>
