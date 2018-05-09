<template>
  <input class="form-control" :value="value" @input="$emit('input', $event.target.value)">
</template>

<script>
export default {
  name: 'Input',
  props: ['value'],
}
</script>
