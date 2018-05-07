<template>
  <div class="container">
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
  </div>
</template>

<script>
import Button from '@/components/atoms/Button';
import NavBar from '@/components/atoms/NavBar';
import NavBarNav from '@/components/atoms/NavBarNav';

export default {
  name: 'NavigationBar',
  components: {
    Button,
    NavBar,
    NavBarNav
  }
}
</script>
