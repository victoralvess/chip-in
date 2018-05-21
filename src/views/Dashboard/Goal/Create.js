import Card from '@/components/atoms/Card/Card.vue'
import CardBody from '@/components/atoms/Card/Body/Body.vue'
import Form from '@/components/atoms/Form/Form.vue'
import Label from '@/components/atoms/Label/Label.vue'
import Input from '@/components/atoms/Input/Input.vue'
import Button from '@/components/atoms/Button/Button.vue'
import ListGroup from '@/components/atoms/ListGroup/ListGroup.vue'
import ListGroupItem from '@/components/atoms/ListGroup/Item/Item.vue'

import axios from 'axios'

const defaultForm = {
  title: ' ',
  description: ' ',
  goal: 100,
  due: new Date().toISOString().substr(0,10)
}

export default {
  name: 'create',
  components: {
    Card,
    CardBody,
    Form,
    Label,
    Input,
    Button,
    ListGroup,
    ListGroupItem
  },
  data() {
    return {
      form: { ...defaultForm },
      errors: [],
      feedback: null
    }
  },
  created() {
    this.form = {
      ...defaultForm,
      ...this.$store.getters.createGoalForm
    }
  },
  methods: {
    async createGoal() {
      const store = this.$store

      store.dispatch('saveCreateGoalForm', this.form)
      try {
        const response = await axios.post('/v1/goals/add', JSON.stringify(this.form), {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${store.getters.jwt}`
          }
        })

        this.feedback = 'Goal created.'
        this.errors = []
        setTimeout(_ => this.feedback = null, 5000)
        this.form = { ...defaultForm }
        store.dispatch('cleanCreateGoalForm')
      } catch(error) {
        try {
          const { status, data } = error.response
          if (status === 401 || status === 403) return this.$router.push({ name: 'sign-in', query: this.$route.path })
          if (status === 404) {
            const { dispatch } = this.$store
            dispatch('user', null)
            dispatch('jwt', null)
            return this.$router.push({ name: 'error', params: { code: status, message: data.message } })
          }
          this.errors = data
        } catch (e) {
          this.errors = [{ message: 'Something went wrong.' }]
        }
      }
    },
    clean() {
      this.form = { ...defaultForm }
      this.feedback = null;
      this.errors = [];
      this.$store.dispatch('cleanCreateGoalForm')
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('saveCreateGoalForm', this.form)
    next()
  }
}
