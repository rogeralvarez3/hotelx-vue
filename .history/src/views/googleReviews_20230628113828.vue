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
export default {
  mounted: function () {
    //const mv = this;
    /*let tmary = document.createElement("script");
    tmary.setAttribute("src", "@/getReviews.js");
    document.head.appendChild(tmary);*/
  },
};
import "@/getReviews";
</script>
<style></style>
