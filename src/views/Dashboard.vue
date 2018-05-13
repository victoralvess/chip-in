<template>
  <div>
    <NavigationBar />
    <router-view name="dashboard"></router-view>
  </div>
</template>

<script>
import NavigationBar from '@/components/compounds/NavigationBar.vue'

export default {
  components: {
    NavigationBar
  }
}
</script>
