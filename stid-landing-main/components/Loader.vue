<template>
  <div
    :class="
      'fixed top-0 h-screen w-screen z-40 opacityEase pointer-events-none bg-black ' +
      (displayBackground ? 'opacity-100' : 'opacity-0')
    "
  >
    <div
      class="h-[2px] gradientBorder widthEase"
      :style="{ width: `${Math.round((loadCount / toLoadCount) * 100)}%` }"
    ></div>
  </div>
</template>

<script>
import Scroll from "../utils/scroll/Scroll.js";
export default {
  data() {
    return {
      scroll: new Scroll(),
      displayBackground: true,
      scrollState: 0,
      loadCount: 0,
      toLoadCount: 7,
    };
  },
  methods: {
    end() {
      this.loadCount += 1;

      if (this.loadCount >= this.toLoadCount) {
        this.scroll.lock(false);
        this.displayBackground = false;
      }
    },
  },
};
</script>

<style scoped>
.opacityEase {
  transition: opacity 500ms ease-in-out;
}
.widthEase {
  transition: width 500ms ease-out;
}
</style>
