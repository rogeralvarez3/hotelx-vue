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
    <v-flex class="align-content-md sx-6">
      <v-card class="ma-2">
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
      <v-card class="ma-2">
        <v-card-title class="pa-2 grey lighten-4">
          {{ $store.getters.getLang("reviews") | capital }} </v-card-title
        ><v-card-text>
          <div id="divReviews" data-trustmary-status="active"></div>
        </v-card-text>
      </v-card>
    </v-flex>
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
    const divReviews = document.getElementById("divReviews");
    const tmary =
      document.getElementsByClassName("go2402097865")[0].parentElement;
    divReviews.appendChild(tmary);
  },
};
</script>
<style>
.go3161678027,
.go4269172405 {
  display: none !important;
}
.go316439965 {
  padding: 0 !important;
}
</style>
