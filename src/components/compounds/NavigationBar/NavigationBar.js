import Button from '@/components/atoms/Button/Button.vue'
import NavBar from '@/components/atoms/NavBar/NavBar.vue'
import NavBarNav from '@/components/atoms/NavBar/Nav/Nav.vue'

import { verifyLoggedIn } from '@/utils'
import { removeSession } from '@/views/utils'

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
        await removeSession()
        this.isLoggedIn = false;
      } catch (error) {}

      this.$router.push('/')
    }
  }
}
