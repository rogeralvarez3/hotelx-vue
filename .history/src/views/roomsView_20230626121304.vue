<template>
  <v-container fluid>
    <v-carousel show-arrows-on-hover>
      <v-carousel-item
        v-for="item in items"
        :key="item.id"
        :src="`${item.id}.jpg`"
      >
      </v-carousel-item>
    </v-carousel>
    <v-row class="pa-2 ma-5 mt-2 grey lighten-4 elevation-2">
      <h2>{{ $store.state.lang.default == "es" ? "Reseñas" : "Reviews" }}</h2>
    </v-row>
    <div id="reviews"></div>
  </v-container>
</template>

<script>
export default {
  name: "rooms-view",
  data: () => {
    return {};
  },
  computed: {
    items: function () {
      const mv = this;
      return mv.$store.state.posts.filter((item) => {
        item.section == 1;
      });
    },
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
.go932389133,
.go3161678027 {
  display: none !important;
}
.go316439965 {
  padding: 0 !important;
}
</style>
