<template>
  <div>
    <div class="text-center">
      <h1>{{ time.minute | pad }}:{{ time.second % 60 | pad }}</h1>
      <img alt="Vue logo" width="400" :src="eggCrack">
      <!-- <img alt="Vue logo" width="400" :src="'../assets/images/' + eggCrack"> -->
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
      time: {
        minute: 0,
        second: 1,
      },
      index: 0,
      numberOfKey: 3,
      step: 0,
      eggCrack: require('@/assets/images/0.svg'),
    };
  },
  mounted() {
    this.createChickCode();
    document.addEventListener("keydown", this.onKeyDown);

    setInterval(() => {
      this.time.second++;
      this.time.minute = parseInt(this.time.second / 60);
    }, 1000);
  },
  filters: {
    pad(number) {
      return number < 10 ? "0" + number : number;
    },
  },
  methods: {
    onKeyDown(event) {
      if (event.code === this.chickCode[this.index].key) {
        this.chickCode[this.index].active = true;
        this.index++;
      } else {
        this.index = 0;
        this.chickCode.map((code) => (code.active = false));
      }

      if (this.index === this.chickCode.length) {
        this.index = 0;
        this.step++;
        this.handleCheckpoint();
        this.eggCrack = require(`@/assets/images/${this.step}.svg`);

        setTimeout(() => {
          this.createChickCode();
        }, 200);
      }
    },
    createChickCode() {
      this.chickCode = [...Array(Math.floor(this.numberOfKey))].map(() => ({
        key: this.keyCode[Math.floor(Math.random() * this.keyCode.length)],
        active: false,
      }));
    },
    handleCheckpoint() {
      switch (this.step + 1) {
        case 5:
          this.numberOfKey = 4;
          break;
        case 10:
          this.numberOfKey = 5;
          break;
        case 17:
          this.numberOfKey = 6;
          break;
        case 25:
          this.numberOfKey = 7;
          break;
      }

      if (this.step >= 29) {
        console.log("End game");
      }
    },
  },
};
</script>