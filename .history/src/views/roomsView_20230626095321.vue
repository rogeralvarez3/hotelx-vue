<template>
  <v-container fluid>
    <v-row class="ma-2 pa-2 grey lighten-4 elevation-2">
      <h2>Comentarios</h2>
    </v-row>
    <div id="reviews"></div>
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
export default {
  name: "rooms-view",
  data: () => {
    return {
      comments: [],
    };
  },
  mounted: () => {
    const reviews = document.createElement("script");
    reviews.setAttribute("src", "https://widget.trustmary.com/4HvXGCt0Q");
    let parent = document.getElementById("reviews");
    parent.appendChild(reviews);
  },
};
</script>
<style>
.go4269172405 {
  display: none !important;
}
</style>
