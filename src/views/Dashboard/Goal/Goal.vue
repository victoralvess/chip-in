<template>
  <div class="container goal-container">
    <div v-if="!goal"> 
      <LinePlaceholder :times="4" />
      <div class="d-flex justify-content-end">
        <ButtonPlaceholder />
      </div>
    </div>
    <div v-if="goal">
      <h1>{{goal.title}}</h1>
      <p>{{goal.description}}</p>
      <ProgressBar :value="goal.progress">{{goal.earned}} / {{goal.goal}}</ProgressBar>
      <div class="d-flex justify-content-between">
        <span>{{goal.due.substr(0, 10)}}</span>
        <span>
          <b>{{goal.is_open ? 'Open' : 'Closed'}}</b>
        </span>
      </div>
      <div class="d-flex justify-content-end" v-if="goal.uid === uid">
        <Button class="btn-danger mt-40" :click="closeGoal" v-if="goal.is_open">Close</Button>
      </div>
      <Form :submitHandler="contribute" v-else-if="goal.is_open && !goal.expired">
        <div class="form-group mt-40">
          <Label for="value" label="Contribution value" />
          <Input type="number" name="value" id="value" min="0" :max="user.wallet" v-model.number="value"/>
          <Button class="btn-success mt-40" type="submit">Contribute</Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.goal-container,
.mt-40 {
  margin-top: 40px;
}
</style>

<script src="./Goal.js"></script>
