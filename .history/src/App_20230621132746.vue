<template>
  <v-app>
    <v-navigation-drawer clipped app disable-resize-watcher v-model="drawer">
      <v-list>
        <v-list-item>
          <v-list-item-title></v-list-item-title>
        </v-list-item>
        <v-list-item v-for="mn in menu" :key="mn.value" :to="mn.text">
          <v-list-item-icon>
            <v-icon v-text="mn.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="mn.text[lang]"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark clipped-left>
      <v-app-bar-nav-icon
        class="hidden-lg-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
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
        <v-btn
          text
          v-for="mn in menu"
          :key="mn.value"
          v-text="mn.text[lang]"
          @click="mn.action()"
        ></v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import router from "./router/index.js";
export default {
  name: "App",

  data: () => ({
    //
    lang: "es",
    drawer: false,
    menu: [
      {
        value: 1,
        text: { es: "habitaciones", en: "rooms" },
        icon: "mdi-bed",
        action: () => {
          router.push("/habitaciones");
        },
      },
      {
        value: 2,
        text: { es: "restaurante", en: "restaurant" },
        icon: "mdi-food-fork-drink",
        action: () => {
          alert("hola");
        },
      },
      { value: 3, text: { es: "galería", en: "galery" }, icon: "mdi-image" },
      { value: 4, text: { es: "ayuda", en: "help" }, icon: "mdi-help" },
      {
        value: 5,
        text: { es: "idioma", en: "language" },
        icon: "mdi-translate",
      },
    ],
  }),
  mounted: function () {
    const mv = this;
    mv.lang = navigator.language.substring(0, 2);
  },
};
</script>
