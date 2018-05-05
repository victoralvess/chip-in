<template>
  <label>{{ label }}</label>
</template>

<script>
export default {
  name: 'Label',
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>
