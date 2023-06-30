<template>
  <v-card>
    <v-card-title>{{
      $store.getters.getLang("reviews") | capital
    }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div id="reviews"></div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {};
</script>
<style></style>
