<template>
  <div
    id="stidShowcase"
    class="w-full py-[9.38rem] flex items-center flex-col relative"
    ref="backgroundAnim"
  >
    <div class="h-[15rem] mobile:w-[90%] desktop:h-[53rem] z-10 absolute">
      <nuxt-img
        loading="eager"
        sizes="sm:100vw lg:1200px"
        src="/stid/boxTop.png"
        style="aspect-ratio: 950/777"
        class="h-full w-full object-contain"
      ></nuxt-img>
    </div>
    <div
      ref="titleShowcase"
      class="flex flex-col items-center z-10 mb-40"
      :style="{
        transform: `translateY(${titleTranslate * 50}%)`,
      }"
    >
      <h2
        class="textTitleLeadingPlus gradientText text-center w-[80%] desktop:w-[50rem] mt-20 desktop:mt-[20rem]"
        :style="{maskImage: `linear-gradient(180deg, rgba(0,0,0,0) ${1 - (titleTranslate * 10) * 100}%, rgba(255,255,255,1) ${1 - (titleTranslate * 10) * 100 + 100}%`}"
      >
        Fiercely independent for more than 25 years to reach and migrate the
        highest security level
      </h2>

      <Line :isWhite="true" />
    </div>

    <p
      class="mobile:w-[78%] desktop:w-[25rem] desktop:mr-[25rem] textBoldParagraph text-[#03080D] mt-[6.25rem] desktop:mt-44 z-10 paraY"
    >
      That independence gives us the freedom to answer your security challenges
      in a radically different way. It gives us the freedom to ask questions
      others can’t, free to bet on the future rather than always on immediate
      returns, free to respect the market, its codes and regulations but also
      look beyond them, to find a better way.
    </p>
    <p
      class="mobile:w-[78%] desktop:w-[25rem] desktop:ml-[25rem] textBoldParagraph text-[#03080D] mt-[3.75rem] desktop:mt-60 z-10 paraY"
    >
      We constantly invest in our human resources to guarantee you the best of
      innovation, but also all the support and services you need.
    </p>

    <Line :isWhite="false" class="mt-12 desktop:mt-32 z-10" />
    <div class="flex flex-col items-center justify-center">
      <TitleAnim
        :textArray="textArray"
        class="text-center z-10 text-[#03080D]"
      />
      <div
        class="absolute w-screen pointer-events-none backroundAnim transform-gpu h-full"
        :style="{ transform: `scaleY(${backgroundHeight*backgroundMaxHeight})` }"
      >
        <img
          src="https://res.cloudinary.com/df7vlavbp/image/upload/f_auto/stid/gradient-test.png"
          alt="gradient"
          class="h-full w-full object-fill transform-gpu"
          loading="eager"
        />
      </div>
      <LottieCross :isMobile="isMobile" />
    </div>
    <Line :isWhite="false" class="mb-20 desktop:mb-32 z-10" />

    <p
      class="mobile:w-[78%] desktop:w-[25rem] desktop:mr-[25rem] textBoldParagraph text-[#03080D] desktop:mb-32 mobile:mb-20 z-10 paraY"
    >
      Freedom to trust your instincts with our intuitive solutions. Freedom to
      evolve your systems according to your needs, not someone else. That’s the
      power of independence.
    </p>

    <Line :isWhite="false" class="z-10" />
    <h2 class="textTitle z-10 text-[#03080D] text-center mobile:w-[70%]">
      That’s the power of STid.
    </h2>
    <Line :isWhite="false" class="z-10" />

    <div
      ref="intersecter"
      class="desktop:flex desktop:gap-32 z-10 mt-[9.38rem]"
    >
      <div>
        <div class="mb-10 desktop:mb-[6.25rem]">
          <p
            class="gradientText text-[6.25rem] leading-[6.25rem] desktop:text-[9.38rem] desktop:leading-[7rem] w-[18rem] organettoThinUltra"
          >
            +{{ values[0] }}
          </p>
          <p class="textGray mt-5">
            company partners<br />and customers served
          </p>
        </div>
        <div class="mobile:mb-10">
          <p
            class="gradientText text-[6.25rem] leading-[6.25rem] desktop:text-[9.38rem] desktop:leading-[7rem] w-[18rem] organettoThinUltra"
          >
            +{{ values[1] }}
          </p>
          <p class="textGray mt-5">countries<br />on 5 continents</p>
        </div>
      </div>
      <div>
        <div class="mb-10 desktop:mb-[6.25rem]">
          <p
            class="gradientText text-[6.25rem] leading-[6.25rem] desktop:text-[9.38rem] desktop:leading-[7rem] w-[18rem] organettoThinUltra"
          >
            {{ values[2] }}
          </p>
          <p class="textGray mt-5">awards<br />and recognitions</p>
        </div>
        <div class="mobile:mb-10">
          <p
            class="gradientText text-[6.25rem] leading-[6.25rem] desktop:text-[9.38rem] desktop:leading-[7rem] w-[18rem] organettoThinUltra"
          >
            {{ values[3] }}%
          </p>
          <p class="textGray mt-5">growth over the<br />last 2 years</p>
        </div>
      </div>
    </div>

    <div class="h-[15rem] mobile:w-[90%] desktop:h-[53rem] z-10 relative">
      <nuxt-img
        loading="eager"
        sizes="sm:100vw lg:1200px"
        src="/stid/boxBottom.png"
        style="aspect-ratio: 950/777"
        class="h-full w-full object-contain"
      ></nuxt-img>
      <!-- Ellipses -->
      <div
        id="stidHook"
        class="w-[12.5rem] h-[12.5rem] mobile:absolute desktop:h-60 desktop:w-[35rem] absolute z-10 flex justify-center items-center -right-4 -bottom-14 desktop:right-0 desktop:bottom-0"
      >
        <Ellipses
          :hookID="'stidHook'"
          :height="isMobile ? '8rem' : '15rem'"
          :spread="0.3"
          :isMobile="isMobile"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from "../utils/scroll/Scroll.js";
import Ellipses from "./sub/Ellipses.vue";
import Line from "./sub/Line.vue";
import LottieCross from "./sub/LottieCross.vue";
import TitleAnim from "./sub/TitleAnim.vue";

export default {
  components: { Line, Ellipses, TitleAnim, LottieCross },
  props: {
    isMobile: Boolean,
  },
  data() {
    return {
      scroll: new Scroll(),
      dataTargets: [900, 60, 16, 120],
      values: [0, 0, 0, 0],
      titleTranslate: 0,

      backgroundMaxHeight: 0.8,
      backgroundHeight: 0,
      backgroundSpeed: 1.5,
      textArray: [],
    };
  },
  methods: {
    intersect(isIn, value) {
      if (value > this.scroll.isMobile ? -0.4 : -0.2) {
        this.scroll.untrackAnimation(this.$refs.intersecter);
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            this.tick(i);
          }, i * 200);
        }
      }
    },
    tick(index) {
      const increment = Math.round(
        this.dataTargets[index] * (Math.random() * 0.1)
      );
      if (this.values[index] + increment > this.dataTargets[index]) {
        this.values[index] = this.dataTargets[index];
      } else {
        this.values[index] += increment;
        setTimeout(() => {
          this.tick(index);
        }, Math.random() * 100);
      }
    },
    animBackground(value) {
      this.backgroundHeight = (1 - Math.abs(value) * 2) * this.backgroundSpeed;
    },
    animTitle(value) {
      this.titleTranslate = value + (this.isMobile ? 0.07 : 0)
    },
  },
  mounted() {
    this.textArray = this.isMobile ?
      [
        {
          text: "That freedom,",
          class: "textTitleLeadingPlus",
          goRight: false,
        },
        {
          text: "it is a force",
          class: "textTitleLeadingPlus",
          goRight: true,
        },
        {
          text: "multiplier for",
          class: "textTitleLeadingPlus",
          goRight: false,
        },
        {
          text: "your freedom",
          class: "textTitleLeadingPlus",
          goRight: true,
        },
      ] :
      [
        {
          text: "That freedom,",
          class: "textTitleLeadingPlus",
          goRight: false,
        },
        {
          text: "it is a force multiplier",
          class: "textTitleLeadingPlus",
          goRight: true,
        },
        {
          text: "for your freedom",
          class: "textTitleLeadingPlus",
          goRight: false,
        },
      ]

    this.$nextTick(() => {
      this.scroll.animatedStack.push({
        htmlElement: this.$refs.intersecter,
        intersect: true,
        function: this.intersect.bind(this),
      });

      this.scroll.animatedStack.push({
        htmlElement: this.$refs.backgroundAnim,
        useFunction: true,
        function: this.animBackground.bind(this),
      });

      this.scroll.animatedStack.push({
        htmlElement: this.$refs.titleShowcase,
        useFunction: true,
        function: this.animTitle.bind(this),
      });
    })
  },
};
</script>
