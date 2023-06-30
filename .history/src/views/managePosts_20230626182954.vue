<template>
  <v-container fluid>
    <v-card width="600">
      <v-card-title class="grey lighten-4 pa-2"
        >{{ $store.getters.getLang("sections") | capital }}:
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text
        ><v-select :items="items"></v-select>
        <v-divider></v-divider>
        <v-img width="580" height="400"></v-img
      ></v-card-text>
      <v-card-actions>
        <v-btn>{{ $store.getters.getLang("select image file") }}...</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      selectedSectionId: null,
    };
  },
  computed: {
    items: function () {
      const mv = this;
      const myItems = mv.$store.state.sections.map((item) => {
        return {
          value: item.id,
          text: mv.$options.filters.capital(
            mv.$store.getters.getLang(item.description)
          ),
        };
      });
      return myItems;
    },
  },
};
</script>

<style>
.active {
  background: dodgerblue;
  color: white !important;
}
</style>
