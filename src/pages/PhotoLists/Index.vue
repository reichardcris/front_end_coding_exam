<template>
  <q-page class="bg-grey-2">
    <profile-info class="bg-white" :name="(getProfileInfo) ? getProfileInfo.name : ''" />
    <q-card flat class="bg-white">
      <q-card-section>
        <div class="text-h4 q-mb-md text-bold text-grey-6">Photos...</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-md" v-if="filteredPhotos.length > 0">
          <div
            class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12"
            v-for="(photo, key) in filteredPhotos"
            :key="key"
          >
            <q-card dense class="photo-card q-pa-md">
              <p class="text-center text-capitalize">{{ photo.title }}</p>
              <q-btn-dropdown
                class="absolute bg-white photo-dropdown"
                color="primary"
                flat
                dropdown-icon="mode_edit"
                no-icon-animation
              >
                <q-list>
                  <q-item clickable v-close-popup style="min-width: 200px" @click="promtEditPhoto(photo)">
                    <q-item-section avatar>
                      <q-avatar size="sm" icon="mode_edit" color="primary" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Edit</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup style="min-width: 200px" @click="deletePhoto(photo)">
                    <q-item-section avatar>
                      <q-avatar size="sm" icon="delete" color="red" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Delete</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
              <img
                width="100%"
                class="cursor-pointer"
                @click="__onHandleRedirectPhoto(photo.url)"
                :src="photo.thumbnailUrl"
                alt="No Image Found"
              />
            </q-card>
          </div>
        </div>
        <h6 v-else class="text-primary text-center">No Photos are available...</h6>
      </q-card-section>
    </q-card>

<!-- Edit Dialog -->
  <edit-dialog
    :editPrompt="editPrompt"
    :editItemModel="editItemModel"
    @onChangeState="_ => editPrompt = _"
    @onClick="_ => { editItemModel = _; editPhoto(); }"
    type="photos"
  />
  </q-page>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex'
import { QSpinner, openURL, uid } from 'quasar'
import ProfileInfo from 'src/components/ProfileInfo'
import { set, find, cloneDeep, filter } from 'lodash'
import EditDialog from 'src/components/EditDialog.vue'

export default {
  name: 'PageIndex',
  async created () {
    this.$q.loading.show({
      spinner: QSpinner,
      spinnerColor: 'primary',
      spinnerSize: 140,
      backgroundColor: 'black',
      message: 'Loading Albums...',
      messageColor: 'white'
    })
    const id = this.$route.params.albumId
    await this.fetch(id)
    this.$q.loading.hide()
  },
  data () {
    return {
      editPrompt: false,
      editItemModel: {
        title: null,
        url: null
      }
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters('photos', ['getPayload']),
    ...mapGetters('users', {
      user: 'getPayload'
    }),
    getProfileInfo () {
      const id = this.$route.params.albumId
      return find(this.user, { id: parseInt(id) })
    },
    filteredPhotos () {
      const id = parseInt(this.$route.params.albumId)
      return filter(this.getPayload, items => {
        return items.albumId === id
      })
    }
  },
  methods: {
    ...mapActions('photos', ['fetch', 'updateItem']),
    __onHandleRedirectPhoto (link) {
      openURL(link)
    },
    appendPhoto ({ title, url }) {
      const id = parseInt(this.$route.params.albumId)
      const payload = cloneDeep(this.getPayload)
      payload.push({
        title,
        albumId: id,
        url,
        thumbnailUrl: url,
        id: uid()
      })
      this.updateItem(payload)
    },
    deletePhoto ({ id }) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete this photo?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        const payload = filter(this.getPayload, (item) => {
          return item.id !== id
        })
        this.updateItem(payload)
      })
    },
    promtEditPhoto (item) {
      this.editItemModel = item
      this.editPrompt = true
    },
    editPhoto () {
      const { id, title, url } = this.editItemModel
      const payload = cloneDeep(this.getPayload)
      const photo = find(payload, { id })
      console.log(photo, 'photo')
      set(photo, 'title', title)
      set(photo, 'url', url)
      set(photo, 'thumbnailUrl', url)
      console.log(payload, 'payloadsss')
      this.updateItem(payload)
    }
  },
  components: {
    ProfileInfo,
    EditDialog
  }
}
</script>

<style lang="scss">
.photo-card {
    border-radius: 20px
}

.photo-dropdown {
  margin: 5px;
  border-radius: 100%;
  width: 40px;
  height: 40px;
}
</style>
