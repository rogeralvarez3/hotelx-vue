<template>
  <v-app>
    <v-navigation-drawer clipped app v-model="drawer">
      <v-list>
        <v-list-item></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark clipped-left>
      <v-app-bar-nav-icon class="hidden-lg-and-up"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-img
          alt="App Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/logo.png')"
          transition="scale-transition"
          height="60"
        />
      </div>

      <v-spacer></v-spacer>
      <div class="hidden-md-and-down">
        <v-btn text v-for="mn in menu" :key="mn.value" v-text="mn.text"></v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
    drawer: false,
    menu: [{ value: 1, text: "habitaciones" }],
  }),
};
</script>
