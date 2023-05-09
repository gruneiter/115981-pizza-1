import Vue from "vue";
import Vuex from "vuex";

import Builder from "./Builder";
import Cart from "./Cart";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { Builder, Cart },
});
