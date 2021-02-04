import { mapActions, mapGetters } from 'vuex'
import { QSpinner } from 'quasar'

export default {
  data () {
    return {
      NAME_SPACE: null
    }
  },
  mounted () {
    console.log(this.getPayload)
  },
  computed: {
    ...mapGetters(this.NAME_SPACE, ['getPayload'])
  },
  methods: {
    ...mapActions(this.NAME_SPACE, ['fetch']),
    async __onHandleFetch () {
      this.$q.loading.show({
        spinner: QSpinner,
        spinnerColor: 'primary',
        spinnerSize: 140,
        backgroundColor: 'black',
        message: 'Loading Users...',
        messageColor: 'white'
      })
      await this.fetch()
      this.$q.loading.hide()
    }
  }
}
