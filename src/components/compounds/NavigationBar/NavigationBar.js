import Button from '@/components/atoms/Button/Button.vue'
import NavBar from '@/components/atoms/NavBar/NavBar.vue'
import NavBarNav from '@/components/atoms/NavBar/Nav/Nav.vue'

import { verifyLoggedIn } from '@/utils'

import axios from 'axios'

export default {
  name: 'NavigationBar',
  components: {
    Button,
    NavBar,
    NavBarNav
  },
  data() {
    return {
      isLoggedIn: verifyLoggedIn()
    }
  },
  methods: {
    async signOut () {
      try {
        await axios.get('/sign-out')
        const { dispatch } = this.$store
        dispatch('user', null)
        dispatch('jwt', null)
      } catch (error) {}

      this.$router.push('/')
    }
  }
}
