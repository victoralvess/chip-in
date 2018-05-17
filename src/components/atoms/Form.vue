<template>
  <form method="POST" @submit.prevent="submitHandler">
    <slot></slot>
  </form>
</template>

<style lang="css" scoped>
@import "../styles/css/form.css";
</style>

<script>
export default {
  name: 'Form',
  props: {
    submitHandler: {
      type: Function,
      required: true
    }
  }
}
</script>
