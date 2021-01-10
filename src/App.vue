<template>
   <div id="app" class="h-100">
      <Menu v-if="currentScreen === 1" />
      <GamePlay v-else-if="currentScreen === 2" />
      <CreateUser v-else-if="currentScreen === 3" />
   </div>
</template>

<script>
import "./assets/css/style.css"
import Menu from "./pages/Menu"
import GamePlay from "./pages/GamePlay"
import CreateUser from "./pages/CreateUser"
import { mapGetters } from "vuex"
import { CHANGE_SCREEN } from "@/store/actions.type"

export default {
   name: "App",
   components: {
      Menu,
      GamePlay,
      CreateUser,
   },
   data() {
      return {
         screen: 1,
      }
   },
   computed: {
      ...mapGetters(["currentScreen"])
   },
   mounted() {
      document.addEventListener("keydown", (event) => {
         switch (event.code) {
            case "KeyA":
               this.$store.dispatch(CHANGE_SCREEN, 2)
               break
         }
      })
   },
}
</script>