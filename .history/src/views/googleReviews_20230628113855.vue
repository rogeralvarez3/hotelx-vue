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
    let tmary = document.createElement("script");
    tmary.setAttribute("src", "https://widget.trustmary.com/4HvXGCt0Q");
    document.head.appendChild(tmary);
  },
};
</script>
<style></style>
