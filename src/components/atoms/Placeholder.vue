<template>
  <div>
    <div v-for="n in times">
      <slot/>
    </div>
  </div>
</template>

<style lang="scss">
.last {
  margin-bottom: 20px !important;
}

@keyframes pulse {
    0% {
        background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
        background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
        background-color: rgba(165, 165, 165, 0.1);
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
