import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: "http://localhost:3000",
    users: [],
    lang: {
      default: "en",
      list: [
        { id: "en", name: "english", flag: "mdi-flag-spain" },
        { id: "es", name: "español", flag: "mdi-flag-usa" },
      ],
    },
    sections: [
      { id: 1, text: "rooms" },
      { id: 2, text: "restaurant" },
      { id: 3, text: "gallery" },
      { id: 4, text: "news" },
      { id: 5, text: "store" },
    ],
    socket: null,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
