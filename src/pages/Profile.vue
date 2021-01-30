<template>
  <q-page class="q-mt-md">
    <q-card flat>
      <q-card-section>
        <profile-info :name="name" />
      </q-card-section>

      <q-card-section>
        <h3>Albums</h3>
      </q-card-section>

      <q-card-section>
        <div class="q-col-gutter-md row items-start">
          <div
            v-for="(list, key) in albums.albums"
            :key="key"
            class="cursor-pointer col-md-3 col-xs-6 col-sm-6"
          >
            <q-img
              :src="getRandomImage"
              style="width: 100%"
              native-context-menu
            >

              <div class="absolute-bottom text-subtitle1 text-left">
                {{ list.title }}
              </div>

              <div class="absolute-top text-subtitle1 text-center">
                <q-btn size="10px" @click="__onHandleDelete(list)">
                  <q-icon name="delete" />
                </q-btn>
                <q-btn size="10px">
                  <q-icon name="edit" />
                </q-btn>
                <q-btn size="10px" @click="$router.push({ name: 'photo', params: { albumId: list.id } })">
                  <q-icon name="visibility" />
                </q-btn>
              </div>

            </q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import ProfileInfo from 'src/components/ProfileInfo.vue'
import { mapActions, mapState } from 'vuex'
import { get } from 'lodash'

export default {
  components: { ProfileInfo },
  name: 'PageIndex',
  created () {
    const id = this.$route.params.userId
    this.requestAlbumsFromApi(id)
  },
  data () {
    return {
      deleteDialogState: false
    }
  },
  computed: {
    ...mapState({
      albums (state, getters) {
        return getters['users/albums']
      }
    }),
    getRandomImage () {
      return 'https://source.unsplash.com/user/erondu/500x500'
    },
    getDialogState () {
      return this.deleteDialogState
    },
    name () {
      return get(this.albums, 'user.name', '')
    }
  },
  methods: {
    ...mapActions('users', ['requestAlbumsFromApi', 'requestDeleteAlbumsFromApi']),
    __onHandleDelete (item) {
      this.requestDeleteAlbumsFromApi({ userId: item.user_id, albumId: item.id })
    }
  }
}
</script>

<style lang="scss" scoped>
._name {
  font-size: 30px;
}

.album-frame {
  font-family: yusei-magic-regular;
  text-align: justify;
  font-size: 10px;
  border: 3px solid grey;
  margin: 10px;
  // padding: 10%;
}
</style>
