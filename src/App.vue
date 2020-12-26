<template>
  <div id="app" class="h-100">
    <GamePlay />
  </div>
</template>

<script>
import "./assets/css/style.css";
import GamePlay from './pages/GamePlay'

export default {
  name: "App",
  components: {
    GamePlay
  }
};
</script>