
<template>
  <div
    class="fixed top-0 left-0 z-40 flex justify-between w-full items-center px-[0.63rem] py-5 pointer-events-none"
  >
  <div class="top-gradient" :class="{
      'gradient': scrolled,
    }"></div>
    <div class="h-[1.63rem] pointerAll z-10">
      <img src="/stid.svg" alt="" class="h-full" />
    </div>
    <div class="flex items-center">
      <CtaButton
        :displayPoint="true"
        :text="'TALK TO AN EXPERT'"
        :isText="true"
        :isWhite="false"
        class="pointerAll"
        @click="onExpertClick"
      />
      <button @click="isBurgerOpen = !isBurgerOpen" class="pointerAll w-[1.13rem] h-[0.81rem] ml-[1.1rem] mr-[0.63rem] z-10">
        <img :src="isBurgerOpen ? 'https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/artefacts/burgerClose.svg' : 'https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/artefacts/burgerOpen.svg' " alt="" class="w-full h-full object-contain">
      </button>
    </div>

    <div :class="'absolute top-0 left-0 w-screen h-real-screen burgerGradiant burgerEase flex flex-col justify-between '  + (isBurgerOpen ? 'pointerAll clipOpen' : 'pointer-events-none clipClose')">

      <div class="w-full flex flex-col gap-10 mt-[8.75rem] ml-10">
        <button
          v-for="(link, index) of linkList"
          :class="
            'pointer flex flex-row items-center lineOpenTrigger relative pointerAll !text-[1.13rem] uppercase ' +
            (targetIndex === index ? 'montserratSemiBold ' : 'montserratLight ') + (isBurgerOpen ? ' translate-x-0 opacity-100' : ' translate-x-[25%] opacity-0')
          "
          @click="scrollTo(index), isBurgerOpen = false"
          :style="{transition: `opacity 500ms ease-out ${isBurgerOpen ? 100 * index : 0}ms, transform 500ms ease-out ${isBurgerOpen ? 100 * index : 0}ms`}"
        >
          <div
            :class="
              'bg-white pointEase lineOpen ' +
              (targetIndex === index
                ? 'w-[3px] h-[3px] rounded-full mr-4'
                : 'w-[0%] h-[1px] rounded-none mr-0')
            "
          ></div>
          {{ link.linkName }}
        </button>
      </div>
      <div
        :class="'w-full flex flex-col items-center ' + (isBurgerOpen ? ' opacity-100' : ' opacity-0')"
        :style="{transition: `opacity 500ms ease-out ${isBurgerOpen ? 500 : 0}ms`}"
      >
        <div class="flex gap-10">
          <a href="legal-notices.pdf" download class="text-[0.75rem] montserratMedium uppercase underline opacity-60 text-black">Legal notices</a>
          <!-- <a href="" class="text-[0.75rem] montserratMedium uppercase underline opacity-60 text-black">privacy policy</a> -->
        </div>
        <p class="mb-[1.88rem] mt-10 text-[0.75rem] montserratSemiBold opacity-50 text-black">
          © {{ new Date().getFullYear() }} STid.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useBus } from '../utils/bus.js';
import Scroll from "../utils/scroll/Scroll.js";
import CtaButton from "./sub/CtaButton.vue";
const bus = useBus()
export default {
  components: { CtaButton },
  data(){
    return {
      scroll: new Scroll(),
      scrolled: false,
      isBurgerOpen: false,
      linkList: [
        {
          linkName: "solutions",
          targetId: "futureBody",
        },
        {
          linkName: "what we do",
          targetId: "videoRecap",
        },
        {
          linkName: "about us",
          targetId: "stidShowcase",
        },
        {
          linkName: "compliance",
          targetId: "map",
        },
        {
          linkName: "downloads",
          targetId: "downloads",
        },
      ],
      halfHeight: 0,
      targetIndex: 0
    }
  },
  watch: {
    "scroll.scrollPosition": function () {
      const y = this.scroll.scrollPosition + this.halfHeight;
      this.scrolled = this.scroll.scrollPosition > 100;
      for (let i = this.linkList.length - 1; i >= 0; i--) {
        if (y > this.linkList[i].y) {
          this.targetIndex = i;
          return;
        }
      }
      this.targetIndex = -1;
    },
  },
  methods: {
    resize() {
      this.halfHeight = window.innerHeight / 2
      for (let link of this.linkList) {
        link.y =
          document.getElementById(link.targetId).getBoundingClientRect().top +
          this.scroll.scrollPosition
      }
    },
    scrollTo(index) {
      this.scroll.scrollTo(this.linkList[index].y)
    },
    onExpertClick() {
      bus.emit('openContact');
    },
  },
  mounted() {
    bus.on('resize', this.resize)
  },
}
</script>

<style scoped>
.top-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(5,13,20,1) 80%);
  opacity: 0;
  transform: translateY(-100px);
  transition: opacity 250ms ease-out, transform 250ms ease-out;
  pointer-events: none;
}
.gradient {
  opacity: 1;
  transform: translateY(-60px);
}
.burgerEase
{
  transition: clip-path 500ms ease-in-out;
}
.clipOpen
{
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}
.clipClose
{
  clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
}
.burgerGradiant
{
  background: linear-gradient(180deg, rgba(5,13,20,1) 0%, rgba(0,136,235,1) 50%, rgba(0,233,163,1) 100%);
}
.pointEase
{
  transition: width 300ms ease-out, height 300ms ease-out, border-radius 300ms ease-out, margin-right 300ms ease-out;
}
</style>