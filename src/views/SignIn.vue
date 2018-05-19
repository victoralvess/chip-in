<template>
  <div class="flex-1 d-flex flex-column justify-content-center align-items-center">
    <div class="go-to-home-link">
      <router-link to="/">Go to Home</router-link>
    </div>
    <Card>
      <CardBody>
       <div class="alert alert-danger" v-if="error">{{error}}</div>
       <Form class="d-flex flex-column" :submitHandler="signIn">
          <div class="form-group">
            <Label for="username" label="Username"/>
            <Input type="text" id="username" name="username" v-model="username" minlength="4"/>
          </div>
          <div class="form-group">
            <Label for="password" label="Password"/>
            <Input type="password" id="password" name="password" v-model="password" minlength="6"/>
          </div>
          <small class="mb-20">
            <router-link to="/sign-up">I don't have a account.</router-link>
          </small>
          <Button type="submit" class="btn-primary ml-auto mr-auto">Sign In</Button>          
        </Form>
      </CardBody>
    </Card>
  </div>
</template>

<script src="./SignIn.js"></script>
