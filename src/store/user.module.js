// import { FETCH_CURRENT_USER } from './actions.type'
import { CREATE_USER } from './actions.type'

const state = {
   user: []
}

const actions = {
   [CREATE_USER](context, user) {
      context.commit(CREATE_USER ,user)
   }
}

const getters = {
   fetchUser() {
      return state.user
   }
}

const mutations = {
   [CREATE_USER](state, user) {
      state.user.push({
         ...user
      })
   }
}

export default {
   state,
   actions,
   getters,
   mutations,
}