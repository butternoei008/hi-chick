import axios from "axios"
import { FETCH_RANK } from "./actions.type"

const state = {
   ranks: [],
}

const actions = {
   async [FETCH_RANK](context) {
      const res = await axios.get(`${process.env.VUE_APP_URL}/user/rank`)
      context.commit(FETCH_RANK, res.data)
   },
}

const getters = {
   fetchRank() {
      return state.ranks
   },
}

const mutations = {
   [FETCH_RANK](state, ranks) {
      state.ranks = ranks
   },
}

export default {
   state,
   actions,
   getters,
   mutations,
}
