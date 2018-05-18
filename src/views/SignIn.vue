<template>
  <div class="flex-1 d-flex flex-column justify-content-center align-items-center">
    <Card>
      <CardBody>
       <div class="alert alert-danger" v-if="error">{{error}}</div>
       <Form class="d-flex flex-column" :submitHandler="signIn">
         <div class="form-group">
           <Label for="username" label="Username"/>
           <Input type="text" id="username" name="username" v-model="username"/>
         </div>
         <div class="form-group">
           <Label for="password" label="Password"/>
           <Input type="password" id="password" name="password" v-model="password"/>
         </div>
         <Button type="submit" class="btn-primary ml-auto mr-auto">Sign In</Button>
       </Form>
      </CardBody>
    </Card>
  </div>
</template>

<script src="./SignIn"></script>
