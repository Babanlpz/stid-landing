<template>
  <div
    ref="intersecter"
    :class="
      'h-[2.25rem] desktop:h-[4.19rem] w-[1.5px] easeClip my-[1.06rem] ' +
      (isWhite ? 'bg-white' : 'bg-black') +
      (isIn ? ' clipOpen' : ' clipClose')
    "
  ></div>
</template>

<script>
import Scroll from "../../utils/scroll/Scroll.js";
export default {
  props: {
    isWhite: Boolean,
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
  transition: clip-path 500ms ease-in;
}
.clipOpen {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}
.clipClose {
  clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
}
</style>
