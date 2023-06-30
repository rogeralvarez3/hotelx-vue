<template>
  <v-card>
    <v-card-title>{{
      $store.getters.getLang("reviews") | capital
    }}</v-card-title>
    <v-divider></v-divider>
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
      /*const clientId =
        "278654699782-4g9dblv6no1m5odaq3dba1itsaq1a0md.apps.googleusercontent.com";
      const locationId = "ChIJmS-AJKQLag0R7XRQffte9Ug";*/
      fetch(
        `GET
https://mybusiness.googleapis.com/v4/accounts/278654699782-4g9dblv6no1m5odaq3dba1itsaq1a0md.apps.googleusercontent.com/locations/ChIJmS-AJKQLag0R7XRQffte9Ug/reviews`,
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
