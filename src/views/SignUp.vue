<template>
  <div class="flex-1 d-flex flex-column justify-content-center align-items-center">
    <Card>
      <CardBody>
       <div class="alert alert-danger" v-if="error">{{error}}</div>
       <Form class="d-flex flex-column" :submitHandler="signUp">
         <div class="form-group">
           <Label for="username" label="Username"/>
           <Input type="text" id="username" name="username" v-model="username" minlength="4"/>
         </div>
         <div class="form-group">
           <Label for="password" label="Password"/>
           <Input type="password" id="password" name="password" v-model="password" minlength="6"/>
         </div>
         <div class="form-group">
           <Label for="confirm-password" label="Confirm password"/>
           <Input type="password" id="confirm-password" name="confirm-password" v-model="confirmPassword" minlength="6"/>
         </div>
         <small class="mb-20">
           <router-link to="/sign-in">I already have an account.</router-link>
         </small>
         <Button type="submit" class="btn-primary ml-auto mr-auto">Sign Up</Button>
       </Form>
      </CardBody>
    </Card>
  </div>
</template>

<script src="./SignUp.js"></script>
