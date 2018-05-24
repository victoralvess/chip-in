<template>
  <Placeholder :times="times">
    <template slot-scope="placeholder">
      <div class="line-placeholder"></div>
      <div class="line-placeholder line-placeholder--large last"></div>
    </template>
  </Placeholder>
</template>

<style scoped>
.line-placeholder {
  max-width: 200px;
  height: 13px;
  margin: 5px;
  animation: pulse 1s infinite ease-in-out;
  border-radius: 3px;
}

.line-placeholder--large {
  max-width: 95%;
  height: 15px;
}
</style>

<script src="./Line.js"></script>
