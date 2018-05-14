<template>
  <div>
    <div v-for="n in times">
      <div class="line-placeholder"></div>
      <div class="line-placeholder line-placeholder--large last"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line-placeholder {
  max-width: 200px;
  height: 13px;
  margin: 5px;
  animation: pulse 1s infinite ease-in-out;
  border-radius: 3px;

  &--large {
    max-width: 95%;
    height: 15px;
  }
}

.last {
  margin-bottom: 20px;
}

@keyframes pulse {
    0% {
        background-color: rgba(165, 165, 165, 0.1)
    }
    50% {
        background-color: rgba(165, 165, 165, 0.3)
    }
    100% {
        background-color: rgba(165, 165, 165, 0.1)
    }
}
</style>

<script>
export default {
  props: {
    times: {
      type: Number,
      default: 1
    }
  }
}
</script>
