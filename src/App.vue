<template>
  <div id="app" class="d-flex flex-column">
    <router-view/>
  </div>
</template>

<style>
@import "main.css";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  width: 100%;
  height: 100%;
}

#app > * {
  height: 100%;
}

.mb-20 {
  margin-bottom: 20px;
}
 
.flex-1 {
  flex: 1;
}

.h-100 {
  height: 100%;
}
</style>

<script>
import 'bootstrap'

export default {}
</script>
