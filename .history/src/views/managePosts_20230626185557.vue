<template>
  <v-container fluid>
    <v-card width="600">
      <v-card-title class="grey lighten-4 pa-2"
        ><v-select
          :items="items"
          :label="$options.filters.capital($store.getters.getLang('sections'))"
        ></v-select>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-text-field
          type="text"
          :label="$options.filters.capital($store.getters.getLang('title'))"
          dense
        ></v-text-field>
        <v-text-field
          multiline
          type="text"
          :label="$store.getters.getLang('text')"
          dense
          height="60"
        ></v-text-field
        ><v-img width="580" height="300" class="elevation-1" cover></v-img>
      </v-card-text>
      <v-card-actions>
        <v-btn>{{ $store.getters.getLang("click to select file") }}...</v-btn>
        <v-spacer></v-spacer>
        <v-btn primary>{{ $store.getters.getLang("save") }}</v-btn>
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
