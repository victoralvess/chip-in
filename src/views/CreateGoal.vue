<template>
  <div> 
    <NavigationBar/>
    <div class="h-100 container d-flex justify-content-center align-items-center">
      <Card class="flex-1">
        <CardBody>
          <form class="d-flex flex-column" @submit="createGoal">
            <div class="form-group">
              <Label for="title" label="Title"/>
              <Input type="text" name="title" id="title" v-model="form.title"/>
            </div>          
            <div class="form-group">
              <Label for="description" label="Description"/>
              <Input type="text" name="description" id="description" v-model="form.description"/>
            </div>
            <div class="form-group">
              <Label for="goal" label="Goal"/>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <Input type="number" name="goal" id="goal" min="1" v-model.number="form.goal"/>
              </div>
            </div>
            <div class="form-group">
              <Label for="due" label="Due Date"/>
              <Input type="date" name="due" id="due" :min="new Date().toISOString().substr(0,10)" v-model="form.due"/>
            </div>
            <Button type="submit" class="btn-primary mr-auto ml-auto">Create Goal</Button>
          </form>
          {{form}}
        </CardBody>
      </Card>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/compounds/NavigationBar'
import Card from '@/components/atoms/Card'
import CardBody from '@/components/atoms/CardBody'
import Label from '@/components/atoms/Label'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

export default {
  name: 'about',
  components: {
    NavigationBar,
    Card,
    CardBody,
    Label,
    Input,
    Button
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        goal: '',
        due: ''
      }
    }
  },
  created() {
    this.form = {
      ...this.$store.getters.createGoalForm
    }
  },
  methods: {
    createGoal() {
      const store = this.$store
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('saveCreateGoalForm', this.form)
    next()
  }
}
</script>
