// import { FETCH_CURRENT_USER } from './actions.type'
import axios from "axios"
import { CREATE_USER, CREATE_USER_ERROR } from "./actions.type"

const state = {
   user: [],
}

const actions = {
   async [CREATE_USER](context, user) {
      try {
         await axios.post("http://localhost:8085/user", user, {
            "Content-Type": "application/json",
         })

         context.commit(CREATE_USER, user)
      } catch (error) {
         context.commit(CREATE_USER_ERROR)
      }
   },
}

const getters = {
   fetchUser() {
      return state.user
   },
}

const mutations = {
   [CREATE_USER](state, user) {
      state.user.push({
         ...user,
      })
   },
   [CREATE_USER_ERROR]() {
      console.log("Create user error...")
   },
}

export default {
   state,
   actions,
   getters,
   mutations,
}
