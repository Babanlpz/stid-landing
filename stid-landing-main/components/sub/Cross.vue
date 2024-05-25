<template>
  <img
    ref="intersecter"
    src="/artefacts/arrow.svg"
    alt=""
    :class="
      'h-4 w-4 -translate-x-full easeClip ' + (isIn ? 'clipOpen' : 'clipClose')
    "
  />
</template>

<script>
import Scroll from "../../utils/scroll/Scroll.js";

export default {
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
    this.scroll.animatedStack.push({
      htmlElement: this.$refs.intersecter,
      intersect: true,
      function: this.intersect.bind(this),
    });
  },
};
</script>

<style scoped>
.easeClip {
  transition: clip-path 750ms;
}
.clipOpen {
  clip-path: polygon(100% 100%, 100% 0%, 0 0, 0% 100%);
}
.clipClose {
  clip-path: polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%);
}
</style>
