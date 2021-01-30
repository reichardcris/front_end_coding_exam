<template>
  <div class="full-width">
    <q-parallax :height="200" :speed="0.5">
      <template v-slot:media>
          <img src="https://cdn.quasar.dev/img/parallax1.jpg">
      </template>
      <h1 class="text-white _name">{{ name }}</h1>
    </q-parallax>
    <div class="row">
      <div class="col flex justify-center" style="margin-top: -50px;">
          <q-icon color="primary" style="border:1px solid #FF5100" class="bg-white" name="account_circle" size="100px" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name']
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
