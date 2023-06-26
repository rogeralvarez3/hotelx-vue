import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: "http://localhost:3000",
    users: [],
    posts: [],
    sections: [],
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
  mutations: {
    setData(state, payload) {
      Vue.set(state, payload.table, payload.data);
    },
  },
  actions: {
    getData({ state, commit }) {
      const tables = ["posts", "sections"];
      tables.forEach((table) => {
        fetch(`${state.api}?tabla=${table}`, {
          method: "get",
          headers: { "content-type": "application/json" },
        })
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            commit("setData", { tabla: table, data: json });
          });
      });
    },
  },
  modules: {},
});
