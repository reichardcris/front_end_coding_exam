<template>
  <q-card flat>
    <div class="text-h4 q-mb-md text-bold text-grey-6">About...</div>
    <q-card-section>
      <q-item class="full-width">
        <q-item-section avatar>
            <q-icon color="grey-8" size="50px" name="emoji_people" />
        </q-item-section>
        <q-item-section>
            <q-item-label class="user-name text-grey-6 text-bold">{{ info.name }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="full-width">
        <q-item-section avatar>
            <q-icon color="grey-8" size="50px" name="home" />
        </q-item-section>
        <q-item-section>
            <q-item-label class="user-name text-grey-6 text-bold">{{ info.address | filterAddress }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="full-width">
        <q-item-section avatar>
            <q-icon color="grey-8" size="50px" name="contacts" />
        </q-item-section>
        <q-item-section>
            <q-item-label class="user-name text-grey-6 text-bold">{{ info.phone }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="full-width">
        <q-item-section avatar>
            <q-icon color="grey-8" size="50px" name="email" />
        </q-item-section>
        <q-item-section>
            <q-item-label class="user-name text-grey-6 text-bold">{{ info.email }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="full-width">
        <q-item-section avatar>
            <q-icon color="grey-8" size="50px" name="business" />
        </q-item-section>
        <q-item-section>
            <q-item-label class="user-name text-grey-6 text-bold">{{ info.company.name }}</q-item-label>
            <q-item-label caption class="text-grey-6">{{ info.company.catchPhrase }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script>

export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  filters: {
    filterAddress: (val) => {
      if (!val) return 'No Address'
      return `${val.street}, ${val.city} - ${val.suite}`
    }
  }
}
</script>
