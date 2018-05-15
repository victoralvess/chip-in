<template>
  <NavBar class="navbar-light bg-light">
    <Button class="navbar-toggler" data-toggle="collapse" data-target=".navbar-collapse">
      <span class="navbar-toggler-icon"></span>
    </Button>
    <NavBarNav>
      <div class="nav-item">
        <router-link to="/" class="nav-link">Home</router-link>
      </div>
      <div class="nav-item dropdown" v-if="isLoggedIn">
        <a href="" class="nav-link dropdown-toggle" data-toggle="dropdown">Dashboard</a>
        <div class="dropdown-menu">
          <router-link to="/dashboard" class="dropdown-item">General View</router-link>
          <router-link to="/dashboard/goals/create" class="dropdown-item">Create a Goal</router-link>
        </div>
      </div>
      <div class="nav-item" v-if="isLoggedIn">
        <router-link to="/about" class="nav-link">About</router-link>
      </div>
      <div class="nav-item" v-if="!isLoggedIn">
        <router-link to="/sign-in">Sign In</router-link>
      </div>
      <div class="nav-item" v-else>
        <router-link to="/sign-out">Sign Out</router-link>
      </div>
    </NavBarNav>
  </NavBar>
</template>

<script>
import Button from '@/components/atoms/Button'
import NavBar from '@/components/atoms/NavBar'
import NavBarNav from '@/components/atoms/NavBarNav'

import { verifyLoggedIn } from '@/utils'

export default {
  name: 'NavigationBar',
  components: {
    Button,
    NavBar,
    NavBarNav
  },
  data() {
    return {
      isLoggedIn: verifyLoggedIn()
    }
  }
}
</script>
