<template>
  <v-container fluid>
    <v-card width="600">
      <v-card-title class="grey lighten-4 pa-2">{{
        $store.getters.getLang("posts") | capital
      }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item
            color="primary"
            class="mx-auto"
            :active="section.id === selectedSectionId"
            v-for="section in $store.state.sections"
            :key="section.id"
            @click="selectedSectionId = section.id"
          >
            <v-list-item-title>{{
              $store.getters.getLang(section.description)
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
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
};
</script>

<style>
.activeItem {
  background-color: dodgerblue;
  color: white;
}
</style>
