<template>
  <div>
    <LinePlaceholder v-if="!goals" :times="placeholders" />
    <ListGroup v-if="goals && goals.length > 0">
      <ListGroupItem v-for="goal of goals" :key="goal.id">
        <div>
          <router-link :to="{ name: 'goal', params: { id: goal.id } }">{{goal.title}}</router-link>
          <ProgressBar :value="goal.progress"/>
        </div>
      </ListGroupItem>
    </ListGroup>
  </div>
</template>

<script src="./GoalsList.js"></script>
