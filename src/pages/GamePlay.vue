<template>
   <div>
      <div class="pos-relative">
         <h1 class="text-center">
            {{ time.minute | pad }}:{{ time.second % 60 | pad }}
         </h1>
         <div style="position: absolute; right: 2.5rem; top 0;">
            <ol>
               <li v-for="(rank, index) in fetchRank.ranks" :key="index">
                  {{ `${rank.name} ${rank.time}` }}
               </li>
            </ol>
         </div>
      </div>
      <div class="text-center">
         <img alt="Vue logo" width="400" :src="eggCrack" />
      </div>
      <div class="d-flex justify-content-center w-100">
         <div class="box pos-absolute">
            <CircleKey
               v-for="(value, index) in chickCode"
               :key="index"
               :color="color[value.key]"
               :active="value.active"
            />
         </div>
      </div>
   </div>
</template>

<script>
import CircleKey from "@/components/Keys/CircleKey"
import { mapGetters } from "vuex"
import { FETCH_RANK, CHANGE_SCREEN, SET_SCORE_TIME } from "@/store/actions.type"

export default {
   name: "GamePlay",
   components: {
      CircleKey,
   },
   data() {
      return {
         keyCode: ["KeyA", "KeyS", "KeyD", "KeyF"],
         chickCode: [],
         color: {
            KeyA: "red",
            KeyS: "green",
            KeyD: "blue",
            KeyF: "yellow",
         },
         time: {
            minute: 0,
            second: 1,
         },
         interval: null,
         index: 0,
         numberOfKey: 3,
         step: 27,
         eggCrack: require("@/assets/images/0.svg"),
      }
   },
   computed: {
      ...mapGetters(["fetchUser", "fetchRank"]),
   },
   mounted() {
      this.createChickCode()
      document.addEventListener("keydown", this.onKeyDown)

      this.interval = setInterval(() => {
         this.time.second++
         this.time.minute = parseInt(this.time.second / 60)
      }, 1000)
   },
   filters: {
      pad(number) {
         return number < 10 ? "0" + number : number
      },
   },
   methods: {
      onKeyDown(event) {
         if (event.code === this.chickCode[this.index].key) {
            this.chickCode[this.index].active = true
            this.index++
         } else {
            this.index = 0
            this.chickCode.map((code) => (code.active = false))
         }

         if (this.index === this.chickCode.length) {
            this.index = 0
            this.step++
            this.handleCheckpoint()
            this.eggCrack = require(`@/assets/images/${this.step}.svg`)

            setTimeout(() => {
               this.createChickCode()
            }, 200)
         }
      },
      createChickCode() {
         this.chickCode = [...Array(Math.floor(this.numberOfKey))].map(() => ({
            key: this.keyCode[Math.floor(Math.random() * this.keyCode.length)],
            active: false,
         }))
      },
      handleCheckpoint() {
         switch (this.step + 1) {
            case 5:
               this.numberOfKey = 4
               break
            case 10:
               this.numberOfKey = 5
               break
            case 17:
               this.numberOfKey = 6
               break
            case 25:
               this.numberOfKey = 7
               break
         }

         if (this.step >= 29) {
            clearInterval(this.interval)
            const ranks = this.fetchRank.ranks

            const inRank = ranks.length > 1 && ranks.length > 9 ? [ranks[0].time, ranks[ranks.length - 1].time].some(
               (r) => r > this.time.second
            ) : true

            document.removeEventListener("keydown", this.onKeyDown, false)

            if (inRank) {
               this.$store.dispatch(SET_SCORE_TIME, this.time.second)
               this.$store.dispatch(FETCH_RANK)

               setTimeout(() => {
                  this.$store.dispatch(CHANGE_SCREEN, 3)
               }, 1500)
            } else {
               setTimeout(() => {
                  this.$store.dispatch(CHANGE_SCREEN, 1)
               }, 1500)
            }
         }
      },
   },
}
</script>