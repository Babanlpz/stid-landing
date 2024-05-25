<template>
  <div ref="intersecter" class="absolute w-screen h-80 flex justify-between">
    <lottie-player
      v-if="isMobile"
      ref="lottie1"
      mode="normal"
      src="https://res.cloudinary.com/df7vlavbp/raw/upload/stid/cdn/lotties/mobile.json"
      class="w-6"
    >
    </lottie-player>
    <lottie-player
      v-if="isMobile"
      ref="lottie2"
      mode="normal"
      src="https://res.cloudinary.com/df7vlavbp/raw/upload/stid/cdn/lotties/mobile.json"
      class="w-6"
    >
    </lottie-player>

    <lottie-player
      v-if="!isMobile"
      ref="lottie1"
      mode="normal"
      src="https://res.cloudinary.com/df7vlavbp/raw/upload/stid/cdn/lotties/Gauche.json"
      class="w-72"
    >
    </lottie-player>
    <lottie-player
      v-if="!isMobile"
      ref="lottie2"
      mode="normal"
      src="https://res.cloudinary.com/df7vlavbp/raw/upload/stid/cdn/lotties/Droite.json"
      class="w-72"
    >
    </lottie-player>
  </div>
</template>

<script>
import Scroll from "../../utils/scroll/Scroll.js";

export default {
  props: {
    isMobile: Boolean
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
        this.$refs.lottie1.play();
        this.$refs.lottie2.play();
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

<style></style>
