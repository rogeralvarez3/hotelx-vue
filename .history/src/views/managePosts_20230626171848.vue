<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="grey lighten-4 pa-2">{{
        $store.getters.getLang("posts") | capital
      }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-items
            v-for="section in $store.state.sections"
            :key="section.id"
          >
            <v-list-item-title>{{
              $store.getters.getLang(section.description)
            }}</v-list-item-title>
          </v-list-items>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-btn>{{ $store.getters.getLang("select image file") }}...</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
