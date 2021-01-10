import { CURRENT_SCREEN, CHANGE_SCREEN } from "./actions.type"

const state = {
   screen: 1,
}

const actions = {
   [CURRENT_SCREEN](context) {
      context.commit(CURRENT_SCREEN)
   },
   [CHANGE_SCREEN](context, screen) {
      context.commit(CHANGE_SCREEN, screen)
   }
}

const getters = {
   currentScreen() {
      return state.screen
   },
}

const mutations = {
   [CHANGE_SCREEN](state, screen) {
      state.screen = screen
   }
}

export default {
   state,
   actions,
   getters,
   mutations,
}
