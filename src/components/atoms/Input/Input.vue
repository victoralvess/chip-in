<template>
  <input class="form-control" :value="value" @input="$emit('input', $event.target.value)">
</template>

<script src="./Input.js"></script>
