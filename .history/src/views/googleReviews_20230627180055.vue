<template>
  <v-card>
    <v-card-title>{{
      $store.getters.getLang("reviews") | capital
    }}</v-card-title>
    <v-card-divider></v-card-divider>
    <v-card-text>
      <v-card v-for="rev in reviews" :key="rev.id">
        <v-card-title>{{ rev.id }}</v-card-title>
        <v-card-text></v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => {
    return {
      reviews: [],
    };
  },
  methods: {
    getReviews: function () {
      const mv = this;
      const apiKey = "AIzaSyDNwYFEmzKmbuVFD9dhkz1plV0aRiWG-tQ";
      const locationId = "ChIJmS-AJKQLag0R7XRQffte9Ug";
      fetch(
        `https://mybusiness.googleapis.com/v4/accounts/${apiKey}/locations/${locationId}/reviews`,
        { method: "get", headers: { "content-type": "application/json" } }
      )
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          mv.reviews = json;
        });
    },
  },
  mounted: function () {
    const mv = this;
    mv.getReviews();
  },
};
</script>

<style></style>
