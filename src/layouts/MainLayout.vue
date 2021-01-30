<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-primary" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title style="font-family: yusei-magic-regular">
          My Album
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer
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
        </q-item-label>

        <!-- <q-item>
          <q-item-section>
            <q-input label="Name" />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-input label="Email" />
          </q-item-section>
        </q-item> -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  // components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
