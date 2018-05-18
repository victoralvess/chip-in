<template>
  <div>  
    <div class="jumbotron d-flex flex-column justify-content-center align-items-center">
      <img src="//via.placeholder.com/150x150">
    </div>
    <div class="container d-flex flex-column">
      <!--<Card>
        <CardBody>
          {{user.username}} | ${{user.wallet}}
        </CardBody>
      </Card> -->
      <GoalsList :placeholders="5" :goals="goals" />
    </div>
  </div>
</template>

<script src="./Home.js"></script>
