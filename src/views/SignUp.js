import Card from '@/components/atoms/Card/Card.vue'
import CardBody from '@/components/atoms/Card/Body/Body.vue'
import Form from '@/components/atoms/Form/Form.vue'
import Label from '@/components/atoms/Label/Label.vue'
import Input from '@/components/atoms/Input/Input.vue'
import Button from '@/components/atoms/Button/Button.vue'

import axios from 'axios'

export default {
  name: 'sign-up',
  components: {
    Card,
    CardBody,
    Form,
    Label,
    Input,
    Button
  },
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      error: null
    }
  },
  methods: {
    async signUp() {

      if (this.password !== this.confirmPassword) {
        return this.error = "Passwords don't match"        
      }

      const credentials = {
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword
      }
      
      try {
        const response = await axios.post('/sign-up', credentials, {
          headers: { 'Content-type': 'application/json' }
        })
        
        this.error = null

        this.$router.push('/sign-in')
      } catch (error) {
        try {
          const { response: { data: { message } } } = error
          if (message) {
            this.error = error.response.data.message
          }
        } catch (e) {
          this.error = 'Something went wrong.'
        }
      }
    }
  }
}