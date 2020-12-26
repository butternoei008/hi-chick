<template>
  <div class="d-flex justify-content-center w-100">
    <div class="box pos-absolute">
      <CircleKey
        v-for="(value, index) in chickCode"
        :key="index"
        :color="color[value.key]"
        :active="value.active"
      />
    </div>
    <button @click="createChickCode">Change</button>
  </div>
</template>

<script>
import CircleKey from "@/components/Keys/CircleKey";

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
      index: 0,
      step: 4,
    };
  },
  mounted() {
    this.createChickCode();
    document.addEventListener("keydown", this.onKeyDown);
  },
  methods: {
    createChickCode() {
      this.chickCode = [...Array(Math.floor(this.step))].map(
        () => ({
          key: this.keyCode[Math.floor(Math.random() * this.keyCode.length)],
          active: false
        })
      );
    },
    onKeyDown(event) {
      if (event.code === this.chickCode[this.index].key) {
        this.chickCode[this.index].active = true
        this.index++;
      } else {
        this.index = 0;
        this.chickCode.map(code => code.active = false)
      }

      if (this.index === this.chickCode.length) {
        this.index = 0;
        
        setTimeout(() => {
          this.createChickCode();
        }, 200)
      }
    },
  },
};
</script>