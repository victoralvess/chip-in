<template>
  <div>
    <NavigationBar />

    <div class="container mt-40">
      <GoalsList :placeholders="12" :goals="goals"/>
    </div>
  </div>
</template>

<style scoped>
.mt-40 {
  margin-top: 40px;
}
</style>

<script src="./Home.js"></script>
