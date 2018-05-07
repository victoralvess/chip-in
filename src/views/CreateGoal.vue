<template>
  <div> 
    <NavigationBar/>
    <div class="h-100 container d-flex justify-content-center align-items-center">
      <Card class="flex-1">
        <CardBody>
          <form class="d-flex flex-column">
            <div class="form-group">
              <Label for="title" label="Title"/>
              <Input type="text" name="title" id="title"/>
            </div>          
            <div class="form-group">
              <Label for="description" label="Description"/>
              <Input type="text" name="description" id="description"/>
            </div>
            <div class="form-group">
              <Label for="goal" label="Goal"/>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <Input type="number" name="goal" id="goal" min="1"/>
              </div>
            </div>
            <div class="form-group">
              <Label for="due" label="Due Date"/>
              <Input type="date" name="due" id="due" :min="new Date().toISOString().substr(0,10)"/>
            </div>
            <Button type="submit" class="btn-primary mr-auto ml-auto">Create Goal</Button>
          </form>
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
  }
}
</script>
