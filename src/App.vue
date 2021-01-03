<template>
   <div id="app" class="h-100">
      <CreateUser v-if="screen === 1" />
      <Menu v-else-if="screen === 2" />
      <GamePlay v-else-if="screen === 3" />
   </div>
</template>

<script>
import "./assets/css/style.css"
import Menu from "./pages/Menu"
import GamePlay from "./pages/GamePlay"
import CreateUser from "./pages/CreateUser"

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
   mounted() {
      document.addEventListener("keydown", (event) => {
         switch (event.code) {
            // case "KeyA":
            case "asidjflka;sixcvviozuxcpovu8w4eiumcvmvbkjbibmaeoifgj-s8fug":
               this.screen = 2
               break
         }
      })
   },
}
</script>