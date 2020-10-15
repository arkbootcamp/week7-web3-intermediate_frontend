export default {
  data() {
    return {
      msg: 'this message in mixins.js'
    }
  },
  created() {
    console.log(this.msg)
    console.log('Hello form mixins')
  },
  methods: {
    hideModal() {
      this.$refs['my-modal'].hide()
    }
  }
}
