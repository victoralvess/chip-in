<template>
  <div>
    <NavigationBar />

    <div class="container mt-40">
      <GoalsList :placeholders="15" :goals="goals"/>
    </div>
  </div>
</template>

<style scoped>
.mt-40 {
  margin-top: 40px;
}
</style>

<script>
import GoalsList from '@/components/compounds/GoalsList'
import NavigationBar from '@/components/compounds/NavigationBar'

import axios from 'axios'

export default {
  name: 'home',
  components: {
    GoalsList,
    NavigationBar
  },
  data () {
    return {
      goals: null
    }
  },
  async created () {
    try {
      const response = await axios.get('/v1/goals')

      this.goals = response.data
    } catch (error) {}
  }
}
</script>
