<template>
  <v-container fluid>
    
    <v-flex v-for="(coment, i) in comments" :key="i">
      <v-row>
        <h2>Comentarios</h2>
        <v-divider></v-divider>
      </v-row>
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
