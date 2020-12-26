<template>
  <span :class="classList">{{ text || "" }}</span>
</template>

<script>
export default {
  name: "CircleKey",
  props: {
    color: String,
    active: Boolean,
    text: String,
  },
  watch: {
    color(newVal) {
      this.color = newVal;
      this.setClass();
    },
    active(newVal) {
      this.active = newVal;
      this.setClass();
    },
  },
  data() {
    return {
      classList: `key ${this.color} ${
        this.active ? `active-${this.color}` : ""
      }`.trim(),
    };
  },
  methods: {
    setClass() {
      this.classList = `key ${this.color} ${
        this.active ? `active-${this.color}` : ""
      }`.trim();
    },
  },
};
</script>

<style scoped>
.red {
  border-color: #ff1515;
}
.active-red {
  background-color: #ff4040;
}
.green {
  border-color: #03a72c;
}
.active-green {
  background-color: #05c735;
}
.blue {
  border-color: #2747ff;
}
.active-blue {
  background-color: #405cff;
}
.yellow {
  border-color: #ffee00;
}
.active-yellow {
  background-color: #fff344;
}
</style>