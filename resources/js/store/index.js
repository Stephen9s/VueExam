import Vue from 'vue'
import Vuex from 'vuex'
import exams from './modules/exams'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      exams
  }
});