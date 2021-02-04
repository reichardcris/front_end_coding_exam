<template>
  <q-dialog v-model="model" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit {{ type }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input label="Title" dense v-model="payload.title" autofocus @keyup.enter="model = false" />
          <q-input v-if="type === 'photos'" label="Url" dense v-model="payload.url" autofocus @keyup.enter="model = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Set" @click="$emit('onClick', payload)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  props: {
    type: {
      type: String,
      default: () => 'album'
    },
    editPrompt: {
      type: Boolean,
      default: () => false
    },
    editItemModel: {
      type: Object,
      default: () => ({
        title: null
      })
    }
  },
  data () {
    return {
      payload: {},
      model: false
    }
  },
  watch: {
    editPrompt (val) {
      console.log(val, 'model')
      this.model = val
    },
    editItemModel (val) {
      this.payload = cloneDeep(val)
    },
    model (val) {
      console.log(val, 'promt')
      this.$emit('onChangeState', val)
    }
  }
}
</script>
