<template>
  <div class="progress">
    <div class="progress-bar" :style="{ width: value + '%' }">
    </div>
  </div>
</template>

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
