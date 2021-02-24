import { CURRENT_SCREEN, CHANGE_SCREEN, SET_SCORE_TIME } from "./actions.type"

const state = {
   screen: 1,
   time: 0
}

const actions = {
   [CURRENT_SCREEN](context) {
      context.commit(CURRENT_SCREEN)
   },
   [CHANGE_SCREEN](context, screen) {
      context.commit(CHANGE_SCREEN, screen)
   },
   [SET_SCORE_TIME](context, time) {
      context.commit(SET_SCORE_TIME, time)
   }
}

const getters = {
   currentScreen() {
      return state.screen
   },
   scoreTime() {
      return state.time
   }
}

const mutations = {
   [CHANGE_SCREEN](state, screen) {
      state.screen = screen
   },
   [SET_SCORE_TIME](state, time) {
      state.time = time
   }
}

export default {
   state,
   actions,
   getters,
   mutations,
}
