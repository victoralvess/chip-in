<template>
  <div class="flex-1 d-flex flex-column justify-content-center align-items-center">
    <Card>
      <CardBody>
        <form method="post" action="/authenticate"  class="d-flex flex-column">
          <div class="form-group">
            <Label for="username" label="Username"/>
            <Input type="text" id="username" name="username"/>
          </div>
          <div class="form-group">
            <Label for="password" label="Password"/>
            <Input type="password" id="password" name="password"/>
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

export default {
  name: 'sign-in',
  components: {
    Card,
    CardBody,
    Label,
    Input,
    Button
  }  
}
</script>
