<template>
  <div>
    <NavigationBar />

    <div class="container mt-40 center-child">
      <GoalsList :placeholders="12" :goals="goals"/>
    </div>
  </div>
</template>

<style>
.mt-40 {
  margin-top: 40px;
}

.center-child,
.center-child > * {
  height: calc(100% -  96px);
}
</style>

<script src="./Home.js"></script>
