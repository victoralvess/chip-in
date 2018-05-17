<template>
  <NavBar class="navbar-light bg-light">
    <Button class="navbar-toggler" data-toggle="collapse" data-target=".navbar-collapse">
      <span class="navbar-toggler-icon"></span>
    </Button>
    <NavBarNav v-if="isLoggedIn">
      <div class="nav-item">
        <router-link to="/" class="nav-link">Home</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/dashboard/goals/create" class="nav-link">Create a Goal</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/about" class="nav-link">About</router-link>
      </div>
      <div class="nav-item ml-auto">
        <Button @click="signOut" class="btn-danger">Sign Out</Button>
      </div>
    </NavBarNav>
    <NavBarNav v-else>
      <div class="nav-item">
        <router-link to="/" class="nav-link">Home</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/sign-in">Sign In</router-link>
      </div>
    </NavBarNav>
  </NavBar>
</template>

<style scoped>
@import "../styles/css/navigation.css";
</style>

<script>
import Button from '@/components/atoms/Button'
import NavBar from '@/components/atoms/NavBar'
import NavBarNav from '@/components/atoms/NavBarNav'

import { verifyLoggedIn } from '@/utils'

import axios from 'axios'

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
  },
  methods: {
    async signOut () {
      try {
        await axios.post('/sign-out')
        const { dispatch } = this.$store
        dispatch('user', null)
        dispatch('jwt', null)
      } catch (error) {}

      this.$router.push('/')
    }
  }
}
</script>
