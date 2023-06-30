<template>
  <v-container fluid>
    <v-card width="600">
      <v-card-title class="grey lighten-4 pa-2">{{
        $store.getters.getLang("sections") | capital
      }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list class="mx-auto" nav>
          <v-list-item
            v-for="section in $store.state.sections"
            :key="section.id"
            @click="selectedSectionId = section.id"
            color="primary"
          >
            <v-list-item-title>{{
              $store.getters.getLang(section.description) | capital
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
