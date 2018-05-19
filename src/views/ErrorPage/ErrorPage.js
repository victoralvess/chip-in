export default {
  data () {
    return {
      error: {
        code: '404',
        message: 'Page not found.'
      }
    }
  },
  created () {
    const { code, message } = this.$route.params
    if (code && message) {
      this.error.code = code
      this.error.message = message
    }
  }
}
