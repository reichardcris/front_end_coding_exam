<template>
  <q-page class="bg-grey-2">
    <q-card>
      <q-card-section>
        <div class="row justify-center">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input v-model="search" placeholder="Find Person..." icon="find">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-mt-lg" flat>
      <q-card-section>
        <div class="row justify-center">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <user-list-items :items="findPerson" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import UserListItems from 'src/components/UserListItems.vue'
import { mapActions, mapGetters } from 'vuex'
import { QSpinner } from 'quasar'
import { filter } from 'lodash'

export default {
  name: 'PageIndex',
  async created () {
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
  },
  data () {
    return {
      search: null
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters('users', ['getPayload']),
    findPerson () {
      return filter(this.getPayload, ({ name }) => {
        return this.search
          ? name.includes(this.search)
          : true
      })
    }
  },
  methods: {
    ...mapActions('users', ['fetch'])
  },
  components: {
    UserListItems
  }
}
</script>
