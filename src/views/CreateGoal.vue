<template>
  <div> 
    <div class="h-100 container d-flex justify-content-center align-items-center">
      <Card class="flex-1">
        <CardBody>
          <ListGroup v-if="errors.length">
            <ListGroupItem class="list-group-item-danger" v-for="(error, index) in errors" :key="index">
              {{ error.message }}
            </ListGroupItem>
          </ListGroup>
          <div class="alert alert-success" v-if="feedback">
            {{feedback}}
          </div>
          <form class="d-flex flex-column" @submit.prevent="createGoal">
            <div class="form-group">
              <Label for="title" label="Title" required/>
              <Input type="text" name="title" id="title" v-model="form.title" required/>
            </div>          
            <div class="form-group">
              <Label for="description" label="Description"/>
              <Input type="text" name="description" id="description" v-model="form.description" required/>
            </div>
            <div class="form-group">
              <Label for="goal" label="Goal" required/>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <Input type="number" name="goal" id="goal" min="1" v-model.number="form.goal" required/>
              </div>
            </div>
            <div class="form-group">
              <Label for="due" label="Due Date"/>
              <Input type="date" name="due" id="due" :min="new Date().toISOString().substr(0,10)" v-model="form.due" required/>
            </div>
            <div class="d-flex justify-content-space-between">
              <Button type="reset" class="btn-danger" :click="clean">Clean</Button>
              <Button type="submit" class="btn-primary">Create Goal</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/atoms/Card'
import CardBody from '@/components/atoms/CardBody'
import Label from '@/components/atoms/Label'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ListGroup from '@/components/atoms/ListGroup'
import ListGroupItem from '@/components/atoms/ListGroupItem'

import axios from 'axios'

const defaultForm = {
  title: ' ',
  description: ' ',
  goal: 100,
  due: new Date().toISOString().substr(0,10)
}

export default {
  name: 'create',
  components: {
    NavigationBar,
    Card,
    CardBody,
    Label,
    Input,
    Button,
    ListGroup,
    ListGroupItem
  },
  data() {
    return {
      form: { ...defaultForm },
      errors: [],
      feedback: null
    }
  },
  created() {
    this.form = {
      ...defaultForm,
      ...this.$store.getters.createGoalForm
    }
  },
  methods: {
    async createGoal() {
      const store = this.$store

      store.dispatch('saveCreateGoalForm', this.form)
      try {
        const response = await axios.post('/v1/goals/add', JSON.stringify(this.form), {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${store.getters.jwt}`
          }
        })

        this.feedback = 'Goal created.'
        this.errors = []
        setTimeout(_ => this.feedback = null, 7000)
        this.form = { ...defaultForm }
        store.dispatch('cleanCreateGoalForm')
      } catch(error) {
        if (error.response.status === 401) return this.$router.push('/')
        this.errors = error.response.data
      }
    },
    clean() {
      this.form = { ...defaultForm }
      this.feedback = null;
      this.errors = [];
      this.$store.dispatch('cleanCreateGoalForm')
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('saveCreateGoalForm', this.form)
    next()
  }
}
</script>
