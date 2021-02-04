<template>
  <q-page class="bg-grey-2">
    <profile-info class="bg-white" :name="(getProfileInfo) ? getProfileInfo.name : ''" />
    <q-tabs
        v-model="tab"
        narrow-indicator
        align="left"
        class="text-primary bg-white"
      >
        <q-tab name="about" label="About" />
        <q-tab name="albums" label="Albums" />
      </q-tabs>
      <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
          class="q-mt-lg"
        >
          <q-tab-panel name="albums">
            <div class="text-h4 q-mb-md text-bold text-grey-6">Albums...</div>
            <div class="row q-col-gutter-md">
              <div
                class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12"
                v-for="(album, key) in filteredAlbums"
                :key="key"
              >
                <q-card>
                  <q-card-section class="row justify-end">
                    <q-btn-dropdown
                      split
                      color="primary"
                      flat
                      dense
                      dropdown-icon="more_vert"
                    >
                      <q-list dense>
                        <q-item clickable @click="deleteAlbum(album)" v-close-popup>
                          <q-item-section avatar>
                            <q-avatar size="sm" icon="delete" color="primary" text-color="white" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Delete album</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable @click="promtEditAlbum(album)" v-close-popup>
                          <q-item-section avatar>
                            <q-avatar size="sm" icon="mode_edit" color="primary" text-color="white" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Edit album</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>
                  </q-card-section>
                  <q-card-section
                    @click="$router.push({ name: 'photo', params: { albumId: album.id } })"
                    class="cursor-pointer"
                  >
                    <img width="85%" src="https://images.idgesg.net/images/article/2018/10/apple-photos-library-mac-icon-100778410-large.jpg"/>
                  </q-card-section>
                  <q-card-section class="overflow-hidden q-mr-md">
                    <p class="text-grey-7 text-capitalize text-no-wrap text-bold">{{ album.title }}</p>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-tab-panel>
      </q-tab-panels>

      <q-dialog v-model="editPrompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit Title</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="editItemModel.title" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Set" @click="editAlbum" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { QSpinner, uid } from 'quasar'
import ProfileInfo from 'src/components/ProfileInfo'
import { set, find, cloneDeep, filter } from 'lodash'

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
    const id = this.$route.params.userId
    await this.fetch(id)
    this.$q.loading.hide()
  },
  data () {
    return {
      tab: 'albums',
      editPrompt: false,
      editItemModel: {
        title: null
      }
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters('albums', ['getPayload']),
    ...mapGetters('users', {
      user: 'getPayload'
    }),
    getProfileInfo () {
      const id = this.$route.params.userId
      return find(this.user, { id: parseInt(id) })
    },
    filteredAlbums () {
      const id = parseInt(this.$route.params.userId)
      return filter(this.getPayload, items => {
        return items.userId === id
      })
    }
  },
  methods: {
    ...mapActions('albums', ['fetch', 'updateItem']),
    appendAlbum (title) {
      const id = parseInt(this.$route.params.userId)
      const payload = cloneDeep(this.getPayload)
      payload.push({ title, userId: id, id: uid() })
      this.updateItem(payload)
    },
    deleteAlbum ({ id }) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete this album?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        const payload = filter(this.getPayload, (item) => {
          return item.id !== id
        })
        this.updateItem(payload)
      })
    },
    promtEditAlbum (item) {
      this.editItemModel = item
      this.editPrompt = true
    },
    editAlbum () {
      const { id, title } = this.editItemModel
      set(find(this.getPayload, { id }), 'title', title)
      this.updateItem(this.getPayload)
    }
  },
  components: {
    ProfileInfo
  }
}
</script>
