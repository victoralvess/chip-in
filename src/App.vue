<template>
  <div id="app" class="d-flex flex-column">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap-reboot";
//@import "../node_modules/bootstrap/scss/bootstrap-grid";
@import "../node_modules/bootstrap/scss/mixins/lists";
@import "../node_modules/bootstrap/scss/mixins/transition";
//@import "../node_modules/bootstrap/scss/root";
@import "../node_modules/bootstrap/scss/type";
@import "../node_modules/bootstrap/scss/grid";
@import "../node_modules/bootstrap/scss/transitions";
@import "../node_modules/bootstrap/scss/jumbotron";
@import "../node_modules/bootstrap/scss/alert";
@import "../node_modules/bootstrap/scss/utilities/flex";
@import "../node_modules/bootstrap/scss/utilities/display";
@import "../node_modules/bootstrap/scss/utilities/spacing";

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
 
a {
  &.router-link-exact-active {
    color: #383d41;
    font-weight: bold;
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
