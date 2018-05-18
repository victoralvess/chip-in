import Card from '@/components/atoms/Card/Card.vue'
import CardBody from '@/components/atoms/Card/Body/Body.vue'
import Form from '@/components/atoms/Form/Form.vue'
import Label from '@/components/atoms/Label/Label.vue'
import Input from '@/components/atoms/Input/Input.vue'
import Button from '@/components/atoms/Button/Button.vue'

import axios from 'axios'

export default {
  name: 'sign-in',
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
      error: null
    }
  },
  methods: {
    async signIn() {
      const credentials = {
        username: this.username,
        password: this.password
      }
      
      try {
        const response = await axios.post('/authenticate', credentials, {
          headers: { 'Content-type': 'application/json' }
        })
        
        this.error = null

        this.$store.dispatch('user', response.data.user)
        this.$store.dispatch('jwt', response.data.jwt)
        
        const  { next } = this.$route.query
        if (next) {
          return this.$router.push({ path: decodeURIComponent(next) })
        }

        this.$router.push('/dashboard')
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