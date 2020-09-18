import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    base_url: "https://bqbots.herokuapp.com/",
    bots: [],
  },
  mutations: {
    SET_BOTS(state, payload) {
      state.bots = payload;
      console.log(state.bots);
    },
  },
  actions: {
    async FETCH_BOTS({ commit, state }) {
      axios
        .get(state.base_url)
        .then((response) => {
          let data = response.data;
          commit("SET_BOTS", data);
        })
        .catch((err) => console.log(err));
    },

    async START_BOT({ state }, id) {
      axios
        .get(state.base_url + "start/" + id)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    },
    async STOP_BOT({ state }, id) {
      axios
        .get(state.base_url + "stop/" + id)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    },

    async CREATE_BUYCONDITION({ state }, payload) {
      axios
        .post(state.base_url + "buyconditions", payload)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    },

    async CREATE_SELLCONDITION({ state }, payload) {
      axios
        .post(state.base_url + "sellconditions", payload)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    },

    async CREATE_BOT({ state }, payload) {
      console.log("payload" + payload);
      axios
        .post(state.base_url + "create", payload)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    },
    async DELETE_BOT({ state }, payload) {
      console.log("payload" + payload);
      axios
        .post(state.base_url + "delete", payload)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    },
  },
  modules: {},
  getters: {
    isRunning: (state) => (id) => {
      return state.bots.find((bot) => bot.id === id).running;
    },
    botByID: (state) => (id) => {
      return state.bots.find((bot) => bot.id === id);
    },
  },
});
