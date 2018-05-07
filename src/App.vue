<template>
  <div id="app" class="d-flex flex-column">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';

#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;
  color: #2c3e50;*/
  position: absolute;
  width: 100%;
  height: 100%;
}

#app > * {
  height: 100%;
}
 
a {
  &.router-link-exact-active {
    color: green;
  }
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
