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
      { id: 1, text: "rooms", posts: [] },
      { id: 2, text: "restaurant", posts: [] },
      { id: 3, text: "gallery", posts: [] },
      { id: 4, text: "news", posts: [] },
      { id: 5, text: "store", posts: [] },
    ],
    socket: null,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
