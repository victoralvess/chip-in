<template>
  <div>
    <NavigationBar />
    <div class="container filter-group">
      <a href="#/#closed" class="no-decoration button no-right" role="button" @click="closed">Closed</a>
      <a href="#/#active" class="no-decoration button no-borders" role="button" @click="active">Active</a>
      <a href="#/#all" class="no-decoration button no-left filter" role="button" @click="all">All</a>
    </div>
    <div class="container mt-40 center-child">
      <GoalsList :placeholders="12" :goals="goalsList"/>
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

.filter-group {
  display: flex;
  justify-content: center;
  position: relative;
  top: 20px;
}

.no-decoration {
  text-decoration: none !important;
}

.no-right {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.no-borders {
  border-radius: 0 !important;
  border-left: 1px white solid;
  border-right: 1px white solid;
}

.no-left {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}


.button {
  cursor: pointer;
  background-color: #0053ad;
  color: white !important;
  padding: 5px 16px;
  border-radius: 50px;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
  flex: 1;
}

.button:hover,
.filter {
  background-color: #002f63;
}
</style>

<script src="./Home.js"></script>
