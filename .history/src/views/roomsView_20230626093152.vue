<template>
  <v-container fluid>
    <v-row class="ma-2 pa-2 grey lighten-4 elevation-2">
      <h2>Comentarios</h2>
    </v-row>
    <v-flex v-for="(coment, i) in comments" :key="i">
      <v-row>
        <v-col>
          <v-img :src="coment.image"></v-img>
          <span>{{ coment.user }}</span>
          <span>{{ coment.date }}</span>
        </v-col>
        <v-col>
          <span>{{ coment.text }}</span>
        </v-col>
      </v-row>
    </v-flex>
  </v-container>
</template>

<script>
import "https://widget.trustmary.com/4HvXGCt0Q";
export default {
  name: "rooms-view",
  data: () => {
    return {
      comments: [],
    };
  },
};
</script>
