import Placeholder from '@/components/atoms/Placeholder/Placeholder.vue'

export default {
  components: {
    Placeholder
  },
  props: {
    times: {
      type: Number,
      default: 1
    }
  }
}