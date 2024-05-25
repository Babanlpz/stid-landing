<template>
  <div
      class="fixed top-0 left-0 z-40 flex justify-between items-center w-full px-16 py-9 pointer-events-none"
  >
    <div class="top-gradient" :class="{
      'gradient': scrolled,
    }"></div>
    <div
        :class="
        'h-8 easeTranslate pointerAll ' +
        (open ? 'translate-y-0' : '-translate-y-[4.5rem]')
      "
    >
      <img src="/stid.svg" alt="" class="h-full" />
    </div>
    <div class="flex gap-[1.88rem] items-center">
      <div
          :class="
          'flex gap-[1.88rem] items-center easeTranslate ' +
          (open ? 'translate-y-0' : '-translate-y-[4.5rem]')
        "
      >
        <button
            v-for="(link, index) of linkList"
            :class="
            'text-[0.63rem] pointer flex flex-col items-center lineOpenTrigger relative pointerAll uppercase ' +
            (targetIndex === index ? 'montserratSemiBold' : 'montserratLight')
          "
            @click="scrollTo(index)"
        >
          {{ link.linkName }}
          <div
              :class="
              'bg-white widthEase lineOpen absolute -bottom-1 ' +
              (targetIndex === index
                ? 'w-[3px] h-[3px] rounded-full'
                : 'w-[0%] h-[1px] rounded-none')
            "
          ></div>
        </button>
      </div>
      <div @click="onExpertClick">
        <CtaButton
            :displayPoint="true"
            :text="'TALK TO AN EXPERT'"
            :isText="true"
            :isWhite="false"
            class="pointerAll"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {useBus} from '../utils/bus.js';
import Scroll from "../utils/scroll/Scroll.js";
import CtaButton from "./sub/CtaButton.vue";

const bus = useBus()
export default {
  components: {CtaButton},
  data() {
    return {
      scroll: new Scroll(),
      scrolled: false,
      targetIndex: 0,
      halfHeight: 0,
      lastY: 0,
      open: true,
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
    };
  },
  watch: {
    "scroll.scrollPosition": function () {
      this.open = this.lastY > this.scroll.scrollPosition;
      this.lastY = this.scroll.scrollPosition;

      this.scrolled = this.scroll.scrollPosition > 100;

      const y = this.scroll.scrollPosition + this.halfHeight;
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
            this.scroll.scrollPosition;
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
};
</script>

<style scoped>
.top-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(250, 255, 255, 0) 0%, rgba(5, 13, 20, 0.9) 250%);
  opacity: 0;
  transform: translateY(-100px);
  transition: opacity 250ms ease-out, transform 250ms ease-out;
  pointer-events: none;
}

.gradient {
  opacity: 1;
  transform: translateY(0);
}

.widthEase {
  transition: width 300ms ease-out, height 300ms ease-out,
  borderRadius 300ms ease-out;
}

.easeTranslate {
  transition: transform 500ms ease-in-out;
}

.lineOpenTrigger:hover .lineOpen {
  width: 100% !important;
  height: 1px !important;
  border-radius: 0px !important;
}
</style>
