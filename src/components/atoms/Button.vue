<template>
  <button class="btn" @click="!!click && click()"><slot/></button>
</template>

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
