<template>
  <v-app>
    <v-navigation-drawer clipped app disable-resize-watcher v-model="drawer">
      <v-list>
        <v-list-item>
          <v-list-item-title>{{
            $store.getters.getLang("menu") | uppercase
          }}</v-list-item-title>
          <v-btn fab small plain @click="drawer = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-list-item>
        <v-list-item
          v-for="mn in menu.filter((item) => {
            return !item.hideInMenu;
          })"
          :key="mn.value"
          @click="mn.action()"
        >
          <v-list-item-icon>
            <v-icon v-text="mn.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{
            $store.getters.getLang(mn.text) | capital
          }}</v-list-item-title>
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
          height="50"
        />
      </div>

      <v-spacer></v-spacer>
      <div class="hidden-md-and-down">
        <v-btn
          plain
          v-for="mn in menu.filter((item) => {
            return !item.hideInMenu;
          })"
          :key="mn.value"
          @click="mn.action()"
          ><v-icon class="mr-1">{{ mn.icon }}</v-icon>
          {{ mn.iconMode ? "" : $store.getters.getLang(mn.text) }}</v-btn
        >
      </div>
      <v-btn plain @click="$set($store.state, 'dlgLang', true)"
        ><img
          :src="`https://www.countryflagicons.com/FLAT/32/${
            $store.state.lang.default == 'en'
              ? 'US'
              : $store.state.lang.default.toString().toUpperCase()
          }.png`"
          alt=""
        />{{ $store.state.lang.default }}</v-btn
      >
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <v-dialog width="300" v-model="$store.state.dlgLang">
      <v-card>
        <v-card-title class="grey lighten-4 pa-2"
          ><v-icon class="mr-1">mdi-translate</v-icon
          >{{ $store.getters.getLang("language") | uppercase }}</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text>
          <v-list>
            <v-list-item
              v-for="(lang, i) in $store.state.lang.list"
              :key="i"
              @click="
                $set($store.state.lang, 'default', lang.id);
                $set($store.state, 'dlgLang', false);
              "
            >
              <v-list-item-icon>
                <img
                  :src="`https://www.countryflagicons.com/FLAT/32/${
                    lang.id == 'en' ? 'US' : lang.id.toString().toUpperCase()
                  }.png`"
                />
              </v-list-item-icon>
              <v-list-item-title>{{ lang.name | capital }} </v-list-item-title>
              <v-icon
                v-if="$store.state.lang.default == lang.id"
                color="primary"
                >mdi-check</v-icon
              >
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Vue from "vue";
import router from "./router/index.js";
import store from "./store/index.js";
import io from "socket.io-client";
export default {
  name: "App",

  data: () => ({
    //
    drawer: false,
    dlgLang: false,
    menu: [
      {
        value: 1,
        text: "rooms",
        icon: "mdi-bed",
        action: () => {
          router.push("/").catch(() => {});
        },
      },
      {
        value: 2,
        text: "restaurant",
        icon: "mdi-food-fork-drink",
        action: () => {
          router.push("/restaurant").catch(() => {});
        },
      },
      {
        value: 3,
        text: "gallery",
        icon: "mdi-image",
        action: () => {
          router.push("/gallery").catch(() => {});
        },
      },
      {
        value: 4,
        text: "reservations",
        icon: "mdi-bell",
        action: () => {
          router.push("/reservations").catch(() => {});
        },
      },
      {
        value: 5,
        text: "news",
        icon: "mdi-newspaper",
        action: () => {
          router.push("/news").catch(() => {});
        },
      },
      {
        value: 6,
        text: "store",
        icon: "mdi-cart",
        action: () => {
          router.push("/store").catch(() => {});
        },
      },
      {
        value: 7,
        text: "language",
        icon: "mdi-translate",
        iconMode: true,
        hideInMenu: true,
        action: () => {
          Vue.set(store.state, "dlgLang", true);
        },
      },
    ],
  }),
  methods: {},
  mounted: function () {
    const mv = this;
    let lang = navigator.language.substring(0, 2);
    let defaultLang = localStorage.getItem("defaultLang");
    if (!defaultLang) {
      localStorage.setItem("defaultLang", lang);
    }
    mv.$set(mv.$store.state.lang, "default", defaultLang);
    const socket = io(mv.$store.state.api);
    socket.on("update", (data) => {
      mv.$store.dispatch("getData", data.tabla);
    });
    mv.$set(mv.$store.state, "socket", socket);
    mv.$store.dispatch("getData");
  },
};
</script>
