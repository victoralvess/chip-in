<template>
  <form method="POST" @submit.prevent="submitHandler">
    <slot></slot>
  </form>
</template>

<style lang="css" scoped>
@import "../../styles/css/form.css";
</style>

<script src="./Form.js"></script>
