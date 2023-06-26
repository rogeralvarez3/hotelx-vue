<template>
  <v-carousel>
    <v-carousel-item
      v-for="(img, i) in carouselImages"
      :key="i"
      :src="img"
      cover
      width="80%"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "rooms-view",
};
</script>
