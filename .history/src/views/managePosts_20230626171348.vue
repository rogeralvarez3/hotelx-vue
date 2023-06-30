<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="grey lighten-4 pa-2">{{
        $store.getters.getLang("posts") | capital
      }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text> </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
