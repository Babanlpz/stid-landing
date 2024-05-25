<template>
  <div ref="intersecter">
    <lottie-player ref="lottie" mode="normal" :src="'/lotties/' + lottie">
    </lottie-player>
  </div>
</template>

<script>
import Scroll from "../../utils/scroll/Scroll.js";

export default {
  props: {
    lottie: String,
  },
  data() {
    return {
      scroll: new Scroll(),
    };
  },
  methods: {
    intersect(isIn, value) {
      if (value > this.scroll.isMobile ? -0.4 : -0.2) {
        this.scroll.untrackAnimation(this.$refs.intersecter);
        this.$refs.lottie.play();
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

<style></style>
