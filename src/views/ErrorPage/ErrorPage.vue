<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div class="d-flex">
      <h1 class="code">{{error.code}}</h1>
      <p class="message">{{error.message}}</p>
    </div>
    <div class="space">
      <router-link to="/" class="button">Back to Home</router-link>
    </div>
  </div>
</template>

<style scoped>
.space {
  margin-top: 30px;
}

.code {
  font-weight: bold;
  font-size: 70px;
  margin-right: 20px;
  color: #333;
}

.message {
  text-align: center;
  font-size: 16px;
  margin-top: 30px;
  color: #777770;
}

.button {
  background: #de2200;
  color: white;
  font-weight: bold;
  padding: 10px 20px 10px 20px;
  border-radius: 50px;
  text-decoration: none;
}

.button:hover {
  background: #b31b00;
}
</style>

<script src="./ErrorPage.js"></script>
