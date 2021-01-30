<template>
  <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this {{ name }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" @click="okay" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  props: ['name', 'value', 'payload', 'type'],
  data () {
    return {
      confirm: false
    }
  },
  methods: {
    // okay () {
    //   const { id: albumId } = this.payload
    //   this.requestDeleteAlbumsFromApi(albumId)
    // },
    // ...mapActions('users', ['requestDeleteAlbumsFromApi'])
  },
  watch: {
    value (val) {
      if (val) {
        this.confirm = val
      }
    }
  }
}
</script>
