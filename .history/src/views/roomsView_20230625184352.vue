<template>
  <v-container fluid>
    <v-carousel>
      <v-carousel-item
        v-for="(img, i) in carouselImages"
        :key="i"
        :src="img"
        cover
      ></v-carousel-item>
    </v-carousel>
    <v-flex v-for="(coment, i) in comments" :key="i">
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
};
</script>
