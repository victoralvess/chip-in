<template>
  <div class="flex-1 d-flex flex-column justify-content-center align-items-center">
    <Card>
      <CardBody>
       <div class="alert alert-danger" v-if="error">{{error}}</div>
       <form class="d-flex flex-column" @submit.prevent="signIn">
         <div class="form-group">
           <Label for="username" label="Username"/>
           <Input type="text" id="username" name="username" v-model="username"/>
         </div>
         <div class="form-group">
           <Label for="password" label="Password"/>
           <Input type="password" id="password" name="password" v-model="password"/>
         </div>
         <Button type="submit" class="btn-primary ml-auto mr-auto">Sign In</Button>
       </form>
      </CardBody>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/atoms/Card'
import CardBody from '@/components/atoms/CardBody'
import Label from '@/components/atoms/Label'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

import axios from 'axios'

export default {
  name: 'sign-in',
  components: {
    Card,
    CardBody,
    Label,
    Input,
    Button
  },
  data() {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    signIn() {
      const credentials = JSON.stringify({
        username: this.username,
        password: this.password
      })
      axios.post('/authenticate', credentials, {
        headers: { 'Content-type': 'application/json' }
      })
        .then(response => {
          this.error = null
          this.$store.dispatch('user', response.data.user)
          this.$store.dispatch('jwt', response.data.jwt)
          this.$router.push('/dashboard/')
        })
        .catch((error) => {
          this.error = error.response.data.message
        })
    }
  }
}
</script>
