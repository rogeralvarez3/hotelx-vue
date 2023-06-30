import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: "http://localhost:3000",
    users: [],
    posts: [],
    sections: [],
    reviews: [],
    languages: [],
    lang: {
      default: "en",
      list: [
        { id: "en", name: "english", flag: "mdi-flag-spain" },
        { id: "es", name: "español", flag: "mdi-flag-usa" },
      ],
    },
    socket: null,
  },
  getters: {
    getLang: (state) => (payload) => {
      return state.language.filter((item) => {
        return item.eng === payload;
      })[0][state.lang.default];
    },
  },
  mutations: {
    setData(state, payload) {
      Vue.set(state, payload.table, payload.data);
    },
  },
  actions: {
    getData({ state, commit }, payload) {
      let tables = ["posts", "sections", "languages"];
      if (payload) {
        tables = [payload];
      }

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
