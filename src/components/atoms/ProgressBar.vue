<template>
  <div class="progress">
    <div class="progress-bar" :style="{ width: value + '%' }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
@import "../styles/css/progress.css";
</style>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  }
}
</script>
