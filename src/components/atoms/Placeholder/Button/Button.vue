<template>
  <Placeholder :times="times">
    <div class="button-placeholder last"></div>
  </Placeholder>
</template>

<style lang="css" scoped>
.button-placeholder {
  width: 65px;
  height: 40px;
  margin: 5px;
  animation: pulse 1s infinite ease-in-out;
  border-radius: 3px;
}
</style>

<script src="./Button.js"></script>
