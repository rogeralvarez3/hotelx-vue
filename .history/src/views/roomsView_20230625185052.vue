<template>
  <v-container fluid>
    <v-row class="ma-2 pa-4 grey lighten-4 elevation-2">
      <h2>Comentarios</h2>
    </v-row>
    <v-divider></v-divider>
    <v-flex v-for="(coment, i) in comments" :key="i">
      <v-row>
        <v-col>
          <v-img :src="coment.image"></v-img>
          <span>{{ coment.user }}</span>
        </v-col>
        <v-col>
          <span>{{ coment.text }}</span>
        </v-col>
      </v-row>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: "rooms-view",
  data: () => {
    return {
      comments: [],
    };
  },
};
</script>
