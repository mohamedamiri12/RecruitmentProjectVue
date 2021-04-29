import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// import Vuex Store Methods
import getters from './store/getters.js'
import actions from './store/actions.js'
import mutations from './store/mutations.js'
import state from './store/state.js'



export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})