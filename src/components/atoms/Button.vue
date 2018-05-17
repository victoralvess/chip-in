<template>
  <button class="btn" @click="!!click && click()"><slot/></button>
</template>

<style lang="css" scoped>
@import "../styles/css/button.css";
</style>

<script>
export default {
  name: 'Button',
  props: {
    click: {
      default: false
    }
  }
}
</script>
