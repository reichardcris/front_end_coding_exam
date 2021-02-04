<template>
  <q-list>
    <q-item
      v-for="(list, key) in items"
      :key="key" clickable
      v-ripple
      @click="$router.push({ name: 'album', params: { userId: list.id } })"
      class="user-items full-width"
    >
      <q-item-section avatar>
          <q-icon color="primary" size="50px" name="account_circle" />
      </q-item-section>
      <q-item-section>
          <q-item-label class="user-name text-grey-6 text-bold">{{ list.name }}</q-item-label>
          <q-item-label class="text-grey-5" caption>{{ list.email }}</q-item-label>
          <q-item-label>
              <q-chip size="10px" color="blue-3" outline>
              <q-avatar color="blue-3" text-color="white" icon="public" />
                {{ list.website }}
              </q-chip>
              <q-chip size="10px" color="orange-4" outline>
              <q-avatar color="orange-4" text-color="white" icon="local_phone" />
                {{ list.phone }}
              </q-chip>
          </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'user-list-items',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.user-name {
  font-size: 20px;
}

.user-items {
  // border-left: 2px solid orange;
  box-shadow: 1px 5px 5px 1px #e6e3e3;
  margin-bottom: 20px;
}
</style>
