<template>
  <v-container fluid>
    <v-carousel show-arrows-on-hover>
      <v-carousel-item
        v-for="item in items"
        :key="item.id"
        :src="`/images/${item.id}.jpg`"
        cover
      >
      </v-carousel-item>
    </v-carousel>
    <v-row align-content-md>
      <v-col class="pa-2 ma-5 mt-2 mb-0 grey lighten-4 elevation-2">
        <v-card>
          <v-card-title>
            {{ $store.getters.getLang("location") | capital }}
          </v-card-title>
          <v-card-text>
            <googleMaps
              :latitude="39.85688219208184"
              :longitude="-4.023184968173371"
              title="Hospedería Casa de Cisneros"
            ></googleMaps>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="pa-2 ma-5 mt-2 mb-0 grey lighten-4 elevation-2">
        <h2>{{ $store.getters.getLang("reviews") | capital }}</h2>
        <div id="reviews"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import googleMaps from "@/components/googleMaps.vue";
export default {
  name: "rooms-view",
  components: { googleMaps },
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
