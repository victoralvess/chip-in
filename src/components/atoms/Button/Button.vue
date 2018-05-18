<template>
  <button class="btn" @click="!!click && click()">
  	<slot/>
  </button>
</template>

<style lang="css" scoped>
@import "../../styles/css/button.css";
</style>

<script src="./Button.js"></script>
