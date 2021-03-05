import axios from "axios"
import { CREATE_USER, CREATE_USER_ERROR } from "./actions.type"

const state = {
   user: [],
}

const request = async (method, url, data = {}) => {
   try {
      const res = await axios({
         method,
         url: process.env.VUE_APP_URL + url,
         data,
      })
      return res.data
   } catch (error) {
      console.log(error)
   }
}

const actions = {
   async [CREATE_USER](context, user) {
      try {
         const res = await request("POST", "/user", user)

         if (res.result === "success") {
            console.log(res)
         } else {
            console.log("!success!!!!!!!!!!")
         }

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
