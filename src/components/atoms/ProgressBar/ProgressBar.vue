<template>
  <div class="progress">
    <div class="progress-bar" :style="{ width: value + '%' }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
@import "../../styles/css/progress.css";
</style>

<script src="./ProgressBar.js"></script>
