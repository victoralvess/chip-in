<template>
  <div>  
    <div class="pr jumbotron d-flex flex-column justify-content-center align-items-center">
      <div class="wallet" v-if="user">
        💵 {{user.wallet}}
      </div>
      <div class="profile-placeholder"></div>
      <div class="profile-img">
        <img :src="`https://ui-avatars.com/api/?background=fff&color=0058b7&name=${user.username[0]}&size=150&rounded=true`">
      </div>      
    </div>
    <div class="container d-flex flex-column">
      <GoalsList :placeholders="5" :goals="goals"/>
    </div>
  </div>
</template>

<style scoped>
.pr {
  position: relative;
}

.profile-placeholder {
  width: 148px;
  height: 148px;
  background-color: rgba(165, 165, 165, 0.3);
  border-radius: 50%;
}

.profile-img {
  position: absolute;  
}

.wallet {
  position: absolute;
  bottom: 5px;
  right: 15px;
  font-size: 22px;
}
</style>

<script src="./Home.js"></script>
