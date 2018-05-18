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
      <div class="nav-item ml-auto">
        <Button :click="signOut" class="btn-danger">Sign Out</Button>
      </div>
    </NavBarNav>
    <NavBarNav v-else>
      <div class="nav-item">
        <router-link to="/" class="nav-link">Home</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/sign-in" class="nav-link">Sign In</router-link>
      </div>
    </NavBarNav>
  </NavBar>
</template>

<style scoped>
@import "../../styles/css/navigation.css";
.router-link-exact-active {
  color: #383d41;
  font-weight: bold;
}
</style>

<script src="./NavigationBar.js"></script>
