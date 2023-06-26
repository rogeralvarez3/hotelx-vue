import Vue from "vue";
import Vuex from "vuex";
import io from "socket.io-client";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: {
      default: "en",
      list: [
        { id: "en", name: "english", flag: "mdi-flag-spain" },
        { id: "es", name: "español", flag: "mdi-flag-usa" },
      ],
    },
    socket: null,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
