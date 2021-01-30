<template>
  <q-page class="q-mt-md">
    <q-card flat>
      <q-card-section class="">
        <!-- <profile-info :name="" /> -->
      </q-card-section>

      <q-card-section>
        <h3>Photos ({{ photos.length }}) </h3>
      </q-card-section>

      <q-card-section>
        <div class="q-col-gutter-md row items-start">
          <div
            v-for="(list, key) in photos"
            :key="key"
            class="cursor-pointer col-md-3 col-xs-6 col-sm-6"
          >
            <q-img
              :src="list.url"
              style="width: 100%"
              native-context-menu
            >
              <div class="absolute-bottom text-subtitle1 text-left">
                {{ list.title }}
              </div>
              <div
                class="absolute-top text-subtitle1 text-center"
                >
                <q-btn size="10px">
                  <q-icon name="delete" />
                </q-btn>
                <q-btn size="10px">
                  <q-icon name="edit" />
                </q-btn>
                <q-btn size="10px" @click="__onHandleRedirectPhoto(list.url)">
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
// import ProfileInfo from 'src/components/ProfileInfo.vue'
import { mapActions, mapState } from 'vuex'
import { openURL } from 'quasar'

export default {
  // components: { ProfileInfo },
  name: 'PageIndex',
  created () {
    const id = this.$route.params.albumId
    this.requestPhotoFromApi(id)
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.phptos)
  },
  computed: {
    ...mapState({
      photos (state, getters) {
        return getters['users/photos']
      }
    }),
    getRandomImage () {
      return 'https://source.unsplash.com/user/erondu/500x500'
    }
  },
  methods: {
    ...mapActions('users', ['requestPhotoFromApi']),
    __onHandleRedirectPhoto (link) {
      openURL(link)
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
