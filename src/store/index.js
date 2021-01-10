import Vue from 'vue'
import Vuex from 'vuex'
import game from './game.module'
import user from './user.module'
import rank from './rank.module'

Vue.use(Vuex)

export default new Vuex.Store({
   modules: {
      game,
      user,
      rank
   }
})