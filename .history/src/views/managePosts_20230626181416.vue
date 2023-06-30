<template>
  <v-container fluid>
    <v-card width="600">
      <v-card-title class="grey lighten-4 pa-2">{{
        $store.getters.getLang("sections") | capital
      }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-navigation-drawer clipped>
          <v-list class="mx-auto" nav>
            <v-list-item
              v-for="section in $store.state.sections"
              :key="section.id"
              @click="selectedSectionId = section.id"
              :class="{ active: selectedSectionId === section.id }"
            >
              <v-list-item-title>{{
                $store.getters.getLang(section.description) | capital
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
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
.active > .v-list-item__title {
  background: dodgerblue;
  color: white;
}
</style>
