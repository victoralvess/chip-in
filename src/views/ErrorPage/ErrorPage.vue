<template>
  <div class="d-flex justify-content-center align-items-center">
    <h1 class="code">{{error.code}}</h1>
    <p class="message">{{error.message}}</p>
  </div>
</template>

<style scoped>
.code {
  font-weight: bold;
  font-size: 70px;
  margin-right: 20px;
  color: #333;
}

.message {
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
  color: #777770;
}
</style>

<script src="./ErrorPage.js"></script>
