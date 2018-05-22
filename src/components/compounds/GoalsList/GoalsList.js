import LinePlaceholder from '@/components/atoms/Placeholder/Line/Line.vue'
import ListGroup from '@/components/atoms/ListGroup/ListGroup.vue'
import ListGroupItem from '@/components/atoms/ListGroup/Item/Item.vue'
import ProgressBar from '@/components/atoms/ProgressBar/ProgressBar.vue'

export default {
  components: {
    LinePlaceholder,
    ListGroup,
    ListGroupItem,
    ProgressBar
  },
  props: {
    goals: {
      type: Array || Object || null
    },
    placeholders: {
      type: Number,
      default: 1
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
