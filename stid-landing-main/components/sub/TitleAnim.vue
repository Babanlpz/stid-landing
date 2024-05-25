<template>
  <h2 ref="intersecter">
    <div
      v-for="word of textArray"
      class="easeTransition"
      :style="{
        transform: `translateX(${isIn ? 0 : word.goRight ? -1 : 1}rem)`,
      }"
    >
      <span
        v-for="letter of word.text"
        :class="word.class"
        :style="{
          opacity: isIn ? 1 : 0,
          transition: `opacity ${Math.random() * 1000 + 250}ms ease-in ${
            Math.random() * 200
          }ms`,
        }"
      >
        {{ letter }} </span
      ><br />
    </div>
  </h2>
</template>

<script>
import Scroll from "../../utils/scroll/Scroll.js";

export default {
  props: {
    textArray: Object,
  },
  data() {
    return {
      scroll: new Scroll(),
      isIn: false,
    };
  },
  methods: {
    intersect(isIn, value) {
      if (value > this.scroll.isMobile ? -0.4 : -0.2) {
        this.scroll.untrackAnimation(this.$refs.intersecter);
        this.isIn = true;
        this.$emit("catch");
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll.animatedStack.push({
        htmlElement: this.$refs.intersecter,
        intersect: true,
        function: this.intersect.bind(this),
      });
    })
  },
};
</script>

<style scoped>
.easeTransition {
  transition: transform 1000ms ease-out;
}
</style>
