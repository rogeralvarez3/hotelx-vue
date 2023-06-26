<template>
  <v-app>
    <v-navigation-drawer clipped app disable-resize-watcher v-model="drawer">
      <v-list>
        <v-list-item>
          <v-list-item-title>MENU</v-list-item-title>
          <v-btn fab small plain @click="drawer = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-list-item>
        <v-list-item v-for="mn in menu" :key="mn.value" :to="mn.text">
          <v-list-item-icon>
            <v-icon v-text="mn.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title
            v-text="mn.text[$store.state.lang]"
          ></v-list-item-title>
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
          plain
          v-for="mn in menu"
          :key="mn.value"
          v-text="mn.text[$store.state.lang]"
          @click="mn.action()"
          ><v-icon v-text="mn.icon"></v-icon
        ></v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <v-dialog width="400" v-model="$store.state.dlgLang">
      <v-card>
        <v-card-title v-text="menu[5].text[$store.state.lang]"></v-card-title>
        <v-divider></v-divider>
        <v-card-text></v-card-text>
        <v-btn
          v-for="(lang, i) in $store.state.lang.list"
          :key="i"
          v-text="lang"
        ></v-btn>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Vue from "vue";
import router from "./router/index.js";
import store from "./store/index.js";
export default {
  name: "App",

  data: () => ({
    //
    drawer: false,
    dlgLang: false,
    menu: [
      {
        value: 1,
        text: { es: "habitaciones", en: "rooms" },
        icon: "mdi-bed",
        action: () => {
          router.push("/rooms").catch(() => {});
        },
      },
      {
        value: 2,
        text: { es: "restaurante", en: "restaurant" },
        icon: "mdi-food-fork-drink",
        action: () => {
          router.push("/restaurant").catch(() => {});
        },
      },
      {
        value: 3,
        text: { es: "galería", en: "galery" },
        icon: "mdi-image",
        action: () => {
          router.push("/galery").catch(() => {});
        },
      },
      {
        value: 4,
        text: { es: "reservaciones", en: "reservations" },
        icon: "mdi-image",
        action: () => {
          router.push("/reservations").catch(() => {});
        },
      },
      {
        value: 5,
        text: { es: "ayuda", en: "help" },
        icon: "mdi-help",
        action: () => {
          router.push("/help").catch(() => {});
        },
      },
      {
        value: 6,
        text: { es: "idioma", en: "language" },
        icon: "mdi-translate",
        action: () => {
          Vue.set(store.state, "dlgLang", true);
        },
      },
    ],
  }),
  mounted: function () {
    const mv = this;
    let lang = navigator.language.substring(0, 2);
    mv.$set(mv.$store.state, "lang", lang);
  },
};
</script>
