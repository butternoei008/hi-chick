<template>
   <div class="grid-container h-100">
      <template v-if="this.fetchRank.ranks === undefined"> loading..... </template>
      <template v-else>
         <div class="grid-container justify-content-center align-items-center">
            <div class="rank-container text-center m-2">
               <div
                  class="card-img border-rounded img-wrap-rank wrap-gradient-purple mx-auto"
               >
                  <img
                     :src="fetchRank.ranks[1].avatar_path"
                     :alt="fetchRank.ranks[1].name"
                     class="img-rank border-rounded"
                  />
               </div>
               <div class="card" style="height: 250px">
                  <div class="card-body">
                     <h1>2</h1>
                     <h2 class="m-0">{{ fetchRank.ranks[1].name }}</h2>
                     <h2 class="m-0">{{ timeToMinute(fetchRank.ranks[1].time) }} min.</h2>
                  </div>
               </div>
            </div>
            <div
               class="rank-container text-center m-2"
               style="margin-top: -7rem"
            >
               <div
                  class="card-img border-rounded img-wrap-rank wrap-gradient-green mx-auto"
               >
                  <img
                     :src="fetchRank.ranks[0].avatar_path"
                     :alt="fetchRank.ranks[0].name"
                     class="img-rank border-rounded"
                  />
               </div>
               <div class="card" style="height: 250px">
                  <div class="card-body">
                     <h1>1</h1>
                     <h2 class="m-0">{{ fetchRank.ranks[0].name }}</h2>
                     <h2 class="m-0">{{ timeToMinute(fetchRank.ranks[0].time) }} min.</h2>
                  </div>
               </div>
            </div>
            <div class="rank-container text-center m-2">
               <div
                  class="card-img border-rounded img-wrap-rank wrap-gradient-purple mx-auto"
               >
                  <img
                     :src="fetchRank.ranks[2].avatar_path"
                     :alt="fetchRank.ranks[2].name"
                     class="img-rank border-rounded"
                  />
               </div>
               <div class="card" style="height: 250px">
                  <div class="card-body">
                     <h1>3</h1>
                     <h2 class="m-0">{{ fetchRank.ranks[2].name }}</h2>
                     <h2 class="m-0">{{ timeToMinute(fetchRank.ranks[2].time) }} min.</h2>
                  </div>
               </div>
            </div>
         </div>
         <div class="d-flex justify-content-center align-items-center">
            <div class="text-center">
               <img
                  :src="require('@/assets/chicken.svg')"
                  style="width: 100%; max-width: 200px"
                  alt=""
               />
               <h1 id="pass-key">Press key A to start game</h1>
            </div>
         </div>
         <div>
            <h2 class="text-center">Rank 4 - 10</h2>
            <ol start="4">
               <li
                  v-for="(rank, index) in fetchRank.ranks.slice(3)"
                  :key="index"
                  class="mb-1"
               >
                  <div class="card">
                     <div class="grid-less-rank">
                        <div class="img-less-rank">
                           <img :src="rank.avatar_path" :alt="rank.name" />
                        </div>
                        <div class="card-body d-flex">
                           <h4>{{ rank.name }}</h4>
                           <h4 style="margin-left: auto">
                              {{ timeToMinute(rank.time) }} min.
                           </h4>
                        </div>
                     </div>
                  </div>
               </li>
            </ol>
         </div>
      </template>
   </div>
</template>

<script>
import { mapGetters } from "vuex"
import { FETCH_RANK, CHANGE_SCREEN } from "@/store/actions.type"
import { timeToMinute } from "@/utility/helper"

export default {
   name: "Menu",
   computed: {
      ...mapGetters(["fetchRank"]),
   },
   mounted() {
      this.$store.dispatch(FETCH_RANK)

      document.addEventListener("keydown", (event) => {
         switch (event.code) {
            case "KeyA":
               this.$store.dispatch(CHANGE_SCREEN, 2)
               break
         }
      })
   },
   methods: {
      timeToMinute: timeToMinute,
   },
}
</script>

<style scoped>
#pass-key {
   background-color: #68BF66;
   padding: 1rem;
   border-radius: 2rem;
   color: #EEF828;
   border: 10px solid #78D376;
}

.grid-container {
   display: grid;
   grid-template-columns: 33.3333333333% 33.3333333333% 33.3333333333%;
   padding: 1rem;
}

.grid-less-rank {
   display: grid;
   grid-template-columns: 20% 80%;
   padding: 0.3rem;
}

.rank-container {
   position: relative;
}

.rank-container .card-img {
   position: absolute;
   left: 50%;
   transform: translate(-50%, -70%);
}

.img-less-rank {
   position: relative;
   overflow: hidden;
   padding-top: 80px;
   width: 100px;
}

.img-less-rank > img {
   top: 0;
   height: 100%;
   position: absolute;
}
</style>