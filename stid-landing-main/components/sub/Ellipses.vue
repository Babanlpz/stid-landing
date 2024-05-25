<template>
  <div class="absolute will-change-transform h-full w-full" :style="{ transform: `scale(${step1 * (isMobile ? 2 : 1)})` }">
    <img src="/artefacts/glow.png" alt="" class="w-full h-full object-fill" />
  </div>
  <img
    src="/artefacts/ellipsered.png"
    class="absolute will-change-transform"
    :style="{
      height: height,
      transform: `translateX(-${(step1 * 12 * spread) * spreadX}rem) scale(${step1 * spreadX})`,
    }"
  />
  <img
    src="/artefacts/ellipsegreen.png"
    class="absolute will-change-transform"
    :style="{
      height: height,
      transform: `translateX(-${(step2 * 16 * spread) * spreadX}rem) scale(${step2 * spreadX})`,
    }"
  />
  <img
    src="/artefacts/ellipseblue.png"
    class="absolute will-change-transform"
    :style="{
      height: height,
      transform: `translateX(-${(step3 * 20 * spread) * spreadX}rem) scale(${step3 * spreadX})`,
    }"
  />

  <img
    src="/artefacts/ellipsered.png"
    class="absolute will-change-transform"
    :style="{
      height: height,
      transform: `translateX(${
        step1 * 12 * spread * spreadX
      }rem) scale(${step1 * spreadX}) scaleX(-1)`,
    }"
  />
  <img
    src="/artefacts/ellipsegreen.png"
    class="absolute will-change-transform"
    :style="{
      height: height,
      transform: `translateX(${
        step2 * 16 * spread * spreadX
      }rem) scale(${step2 * spreadX}) scaleX(-1)`,
    }"
  />
  <img
    src="/artefacts/ellipseblue.png"
    class="absolute will-change-transform"
    :style="{
      height: height,
      transform: `translateX(${
        step3 * 20 * spread * spreadX
      }rem) scale(${step3 * spreadX}) scaleX(-1)`,
    }"
  />
</template>

<script>
import Scroll from "../../utils/scroll/Scroll.js";
export default {
  props: {
    hookID: String,
    height: String,
    spread: Number,
    isMobile: Boolean
  },
  data() {
    return {
      scroll: new Scroll(),
      step1: 0,
      step2: 0,
      step3: 0,
      spreadX: this.isMobile ? 0.5 : 1
    };
  },
  methods: {
    update(value) {
      if (value < 0.1) {
        const pos = 1 - (Math.abs(value - 0.1) / 6) * 10;
        this.step1 = pos;
        this.step2 = Math.min(pos * 1.2, 1);
        this.step3 = Math.min(pos * 1.5, 1);
      } else {
        this.step1 = 1;
        this.step2 = 1;
        this.step3 = 1;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll.animatedStack.push({
        htmlElement: document.getElementById(this.hookID),
        useFunction: true,
        function: this.update.bind(this),
        translateY: false,
      });
    })
  },
};
</script>

<style></style>
