<template>
  <div :class="{
    'd-flex': goals && goals.length === 0,
    'justify-content-center': true,
    'align-items-center': true,
    'goals-list-container': true
    }">
    <div v-if="goals && goals.length === 0">
      <img src="/img/hide.svg" class="not-found-icon">
      <div class="icon-credit">
        <small>
          Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
        </small>
      </div>
    </div>
    <div class="mb-40 flex-1 goals-list" v-else>
      <LinePlaceholder v-if="!goals" :times="placeholders" />
      <ListGroup v-else-if="goals && goals.length > 0">
        <ListGroupItem v-for="goal of goals" :key="goal.id">
        <div :class="{ status: true, open: goal.is_open && !goal.expired, 'need-save-money': user && goal.uid === user.id && goal.is_open && goal.expired }"></div>
          <div>
            <router-link :to="{ name: 'goal', params: { id: goal.id } }" class="wrap">{{goal.title}}</router-link>
            <ProgressBar :value="goal.progress"/>
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  word-break: break-word;
}

.not-found-icon {
  height: 150px;
  width: 150px;
}

.icon-credit {
  position: absolute;
  bottom: 2px;
  left: 2px;
}

.status {
    width: 15px;
    height: 15px;
    background: #ff694f;
    border-radius: 50%;
    position: absolute;
    right: 7px;
    top: 7px;
}

.status.open {
  background: #73d457 !important;
}

.status.need-save-money {
  background: #ffe721 !important;
}

.status.need-save-money:after {
  content: "$";
  font-size: 12px;
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translate(-50%);
}

</style>

<script src="./GoalsList.js"></script>
