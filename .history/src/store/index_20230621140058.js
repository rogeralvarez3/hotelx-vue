import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: {
      default: "en",
      list: ["en", "es"],
    },
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
