<template>
  <Placeholder :times="times">
    <div class="line-placeholder"></div>
    <div class="line-placeholder line-placeholder--large last"></div>
  </Placeholder>
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
</style>

<script>
import Placeholder from '@/components/atoms/Placeholder'

export default {
  components: {
    Placeholder
  },
  props: {
    times: {
      type: Number,
      default: 1
    }
  }
}
</script>
