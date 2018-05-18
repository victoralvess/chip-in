<template>
  <div>  
    <div class="jumbotron d-flex flex-column justify-content-center align-items-center">
      <div class="profile-placeholder"></div>
      <div class="profile-img">
        <img :src="`https://ui-avatars.com/api/?background=fff&color=0058b7&name=${user.username[0]}&size=150&rounded=true`">
      </div>      
    </div>
    <div class="container d-flex flex-column">
      <!--<Card>
        <CardBody>
          {{user.username}} | ${{user.wallet}}
        </CardBody>
      </Card> -->
      <GoalsList :placeholders="5" :goals="goals"/>
    </div>
  </div>
</template>

<style scoped>
.profile-placeholder {
  width: 148px;
  height: 148px;
  background-color: rgba(165, 165, 165, 0.3);
  border-radius: 50%;
}

.profile-img {
  position: absolute;  
}
</style>

<script src="./Home.js"></script>
