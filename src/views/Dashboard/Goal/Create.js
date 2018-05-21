import Card from '@/components/atoms/Card/Card.vue'
import CardBody from '@/components/atoms/Card/Body/Body.vue'
import Form from '@/components/atoms/Form/Form.vue'
import Label from '@/components/atoms/Label/Label.vue'
import Input from '@/components/atoms/Input/Input.vue'
import Button from '@/components/atoms/Button/Button.vue'
import ListGroup from '@/components/atoms/ListGroup/ListGroup.vue'
import ListGroupItem from '@/components/atoms/ListGroup/Item/Item.vue'

import axios from 'axios'

import { handleErrorRedirect } from '@/views/utils'

const defaultForm = {
  title: ' ',
  description: ' ',
  goal: 100,
  due: new Date().toISOString().substr(0,10)
}

import { mapState, mapActions } from 'vuex'

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
  computed: {
    form: {
      get () {
        return this.$store.getters['createGoal/form']
      }
    },
  },
  data() {
    return {
      errors: [],
      feedback: null
    }
  },
  methods: {
    async createGoal() {
      const store = this.$store

      store.commit('createGoal/saveForm', this.form)
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
        store.commit('createGoal/resetForm')
      } catch(error) {
        try {
          const { status, data } = error.response       
          if (status === 401 || status === 403) return this.$router.push({ name: 'sign-in', query: { next: this.$route.path } })
          if (status === 400) {
            if (data && data.length)
              return this.errors = data
            else
              return this.$router.push(await handleErrorRedirect(status, 'Sorry. The Request Was Invalid.'))
          }
          return this.$router.push(await handleErrorRedirect(status, message, (status === 404)))
        } catch (e) {
          return this.$router.push(await handleErrorRedirect())
        }
      }
    },
    clean() {
      this.feedback = null;
      this.errors = [];
      this.$store.commit('createGoal/resetForm')
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('createGoal/saveForm', this.form)
    next()
  }
}
