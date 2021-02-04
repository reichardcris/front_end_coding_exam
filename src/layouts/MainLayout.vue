<template>
  <q-layout view="lHh Lpr lff">
    <q-header class="bg-white text-primary" :elevated="($route.name !== 'users')">
      <q-toolbar>
        <q-btn
          v-if="$route.name !== 'users'"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-avatar>
          <img src="https://i.pinimg.com/originals/3e/e9/12/3ee912433ff51be233eb9117400da303.png" alt="">
        </q-avatar>
        <q-toolbar-title style="font-family: yusei-magic-regular">
          My Album Galerry
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="$route.name !== 'users'"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8 text-bold"
        >
          Add new {{ drawerLabel }}
        </q-item-label>

        <q-item v-if="$route.name == 'album'">
          <q-item-section>
            <q-input v-model="albumModelTitle" label="Album Title...">
              <template slot="append">
                <q-btn @click="addAlbum" color="primary" push round icon="add" />
              </template>
            </q-input>
          </q-item-section>
        </q-item>
        <q-item v-if="$route.name == 'photo'">
          <q-item-section>
            <q-input v-model="photoModel.title" label="Photo Title" />
            <q-input v-model="photoModel.url" label="Photo Url" />
            <q-btn @click="addAPhoto" color="primary" label="add new photo" push class="q-mt-md" icon="add" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view ref="childAppend" />
    </q-page-container>

    <q-footer class="bg-white">
    </q-footer>
  </q-layout>
</template>

<script>
import { cloneDeep } from 'lodash'

const PHOTO_SCHEMA = {
  title: null,
  url: null,
  thumbnailUrl: null
}

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      albumModelTitle: null,
      photoModel: cloneDeep(PHOTO_SCHEMA)
    }
  },
  computed: {
    drawerLabel () {
      return this.$route.name
    }
  },
  methods: {
    addAlbum () {
      if (this.albumModelTitle) {
        this.$refs.childAppend.appendAlbum(this.albumModelTitle)
        this.albumModelTitle = null
      }
    },
    addAPhoto () {
      this.$refs.childAppend.appendPhoto(this.photoModel)
    }
  }
}
</script>
