<template>
   <div>
      <h1>Menu</h1>
      <h2>Press key A to start game</h2>
		<ol>
			<li v-for="(rank, index) in fetchRank.ranks" :key="index">{{ `${rank.name} ${rank.time}` }}</li>
		</ol>
   </div>
</template>

<script>
import { mapGetters } from "vuex"
import { FETCH_RANK } from '@/store/actions.type'

export default {
   name: "Menu",
   computed: {
      ...mapGetters(["fetchRank"]),
	},
	mounted() {
		this.$store.dispatch(FETCH_RANK)
	}
}
</script>