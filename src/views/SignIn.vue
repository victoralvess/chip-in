<template>
  <div class="flex-1 d-flex flex-column justify-content-center align-items-center">
    <Card>
      <CardBody>
        <form action="">
          <div class="form-group">
            <Label for="username" label="Username"/>
            <Input type="text" id="username" name="username"/>
          </div>
          <div class="form-group">
            <Label for="password" label="Password"/>
            <Input type="password" id="password" name="password"/>
          </div>
          <Button type="submit" class="btn-primary">Sign In</Button>
        </form>
      </CardBody>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import CardBody from '@/components/CardBody'
import Label from '@/components/Label'
import Input from '@/components/Input'
import Button from '@/components/Button'

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
