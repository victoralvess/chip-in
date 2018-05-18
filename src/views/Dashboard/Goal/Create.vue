<template>
  <div class="d-flex align-items-center justify-content-center h-100"> 
    <div class="container">
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
          <Form class="d-flex flex-column" :submitHandler="createGoal">
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
          </Form>
        </CardBody>
      </Card>
    </div>
  </div>
</template>

<script src="./Create.js"></script>
