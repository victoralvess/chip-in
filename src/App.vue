<template>
  <div id="app" class="d-flex flex-column">
    <NavBar class="navbar-light bg-light">
      <Button class="navbar-toggler" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="navbar-toggler-icon"></span>
      </Button>
      <NavBarNav>
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
      </NavBarNav>
    </NavBar>
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
 
a {
  &.router-link-exact-active {
    color: green;
  }
}

.flex-1 {
  flex: 1;
}
</style>

<script>
import 'bootstrap'
import Button from '@/components/Button';
import NavBar from '@/components/NavBar';
import NavBarNav from '@/components/NavBarNav';

export default {
  components: {
    Button,
    NavBar,
    NavBarNav
  }
}
</script>
