<template>
  <q-page class="q-mt-md">
    <q-card flat>
      <q-card-section>
         <q-input label="Find Person..." icon="find">
           <template v-slot:prepend>
            <q-icon name="search" />
          </template>
         </q-input>
      </q-card-section>
    </q-card>
    <q-list separator>
      <q-item
        v-for="(list, key) in getAllUsers"
        :key="key" clickable
        v-ripple
        @click="$router.push({ name: 'profile', params: { userId: list.id } })"
      >
        <q-item-section avatar>
          <q-icon color="primary" size="50px" name="account_circle" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="_name text-primary">{{ list.name }}</q-item-label>
          <span class="text-grey"> <q-icon color="grey" name="business" /> - {{ list.company_name }}</span>
          <span class="text-grey"> <q-icon color="grey" name="contacts" /> - {{ list.phone }}</span>
          <span class="text-grey"> <q-icon color="grey" name="public" /> - <a :href="list.websites">{{ list.website }}</a></span>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  created () {
    this.requestUsersFromApi()
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.getAllUsers)
  },
  computed: {
    ...mapGetters('users', ['getAllUsers'])
  },
  methods: {
    ...mapActions('users', ['requestUsersFromApi'])
  }
}
</script>

<style lang="scss" scoped>
._name {
  font-size: 15px;
}
</style>
