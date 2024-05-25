<template>
  <div id="watchBody" class="relative mb-10 desktop:mb-[17.63rem] mt-10 desktop:mt-[9.38rem]">
    <!-- Background -->
    <div class="relative">
      <div class="absolute h-full w-full flex justify-center items-center" id="test">
        <div class="w-[12.5rem] h-[22rem] desktop:w-[24rem] desktop:h-[42rem] z-10 mobile:translate-y-[-5vh]">
          <nuxt-img loading="lazy" sizes="sm:100vw lg:1200px" src="/stid/sWatch2-centered.png" id="watch"></nuxt-img>
        </div>

        <Ellipses :hookID="'watch'" :height="'21rem'" :spread="0.7" :isMobile="isMobile" />
      </div>

      <!-- Content -->
      <div class="relative h-[70vh] flex justify-end items-center flex-col paraY z-10 mb-[7.38rem]">
        <Line :isWhite="true"/>
        <TitleAnim :textArray="textArray" class="text-center"/>
      </div>
    </div>

    <div class="w-full flex flex-col items-center">
      <div class="flex gap-[3.75rem] desktop:gap-[6.5rem] mobile:flex-col mobile:items-center">
        <p class="w-[78%] desktop:w-[25rem] textBoldParagraph">
          We are the first manufacturer certified by the ANSSI (CSPN) and considered the best partner for government organizations and defense departments in physical security identification issues. Our products are <span class="gradientText"> OSDP™-verified</span> and <span class="gradientText">SSCP-certified</span>, offering the highest levels of security.
        </p>
        <div ref="triggerLogo" class="w-[78%] desktop:w-[25rem] h-auto flex flex-col items-center justify-center">
          <img src="/artefacts/osdp.svg" style="aspect-ratio: 177/50;" alt="Logo OSDP" :class="'h-[3.13rem] mb-[3.75rem] opacityTransition z-10 ' + (displayLogo ? 'opacity-100' : 'opacity-0')">
          <img src="/artefacts/sscp.svg " style="aspect-ratio: 127/61;" alt="Logo SSCP" :class="'h-[3.13rem] opacityTransition z-10 ' + (displayLogo ? 'opacity-100' : 'opacity-0')">
        </div>
      </div>
      <div class="flex mt-[3.75rem] desktop:mt-[13rem] gap-[3.75rem] desktop:gap-[6.5rem] items-center mobile:flex-col-reverse mobile:items-center">
        <div ref="triggerGraph" class="w-[78%] desktop:w-[25rem] h-[11rem] desktop:h-[19rem] relative">
          <div :class="'absolute mobile:top-0 desktop:right-0 desktop:h-[17.5rem] desktop:w-[40rem] clipEase1 ' + (displayGraph ? 'clipOpen' : 'clipClose')">
            <img src="/artefacts/graph1.svg" style="aspect-ratio: 631/282;" alt="Grahs" class="h-full w-full object-contain">
          </div>
          <div :class="'absolute mobile:top-0 desktop:right-0 desktop:h-[17.5rem] desktop:w-[40rem] clipEase2 ' + (displayGraph ? 'clipOpen' : 'clipClose')">
            <img src="/artefacts/graph2.svg" style="aspect-ratio: 631/282;" alt="Grahs" class="h-full w-full object-contain">
          </div>
        </div>
        <p class="w-[78%] desktop:w-[25rem] textBoldParagraph">
          In addition, our award-winning range of access control readers withstand most environmental hazards (IK10 to resist shocks and impacts, IP65-level against bad weather, and further resistance to chemicals, detergent, oil, fuel, and more).
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from '../utils/scroll/Scroll.js'
import Ellipses from './sub/Ellipses.vue'
import Line from './sub/Line.vue'
import TitleAnim from './sub/TitleAnim.vue'

export default {
  components: { Line, Ellipses, TitleAnim },
  props: {
    isMobile: Boolean
  },
  data(){
    return {
      scroll: new Scroll(),
      textArray: [],
      displayLogo: false,
      displayGraph: false
    }
  },
  methods: {
    intersectLogo(isIn, value) {
      if (value > this.scroll.isMobile ? -0.4 : -0.2) {
        this.scroll.untrackAnimation(this.$refs.triggerLogo);
        this.displayLogo = true;
      }
    },
    intersectGraph(isIn, value) {
      if (value > this.scroll.isMobile ? -0.4 : -0.2) {
        this.scroll.untrackAnimation(this.$refs.triggerGraph);
        this.displayGraph = true;
      }
    },
  },
  mounted(){
    this.$nextTick(() => {
      this.scroll.animatedStack.push({
        htmlElement: this.$refs.triggerLogo,
        intersect: true,
        function: this.intersectLogo.bind(this),
      });
      this.scroll.animatedStack.push({
        htmlElement: this.$refs.triggerGraph,
        intersect: true,
        function: this.intersectGraph.bind(this),
      });
    })

    this.textArray = this.isMobile ?
    [
      {
        text: "and end-to-end security that",
        class: "textSubTitle",
        goRight: false
      },
      {
        text: "exceeds the",
        class: "textTitle",
        goRight: true
      },
      {
        text: "highest",
        class: "textTitle",
        goRight: false
      },
      {
        text: "standards",
        class: "textTitle",
        goRight: true
      },
    ] :
    [
      {
        text: "and end-to-end security that",
        class: "textSubTitle",
        goRight: false
      },
      {
        text: "exceeds the highest standards",
        class: "textTitle",
        goRight: true
      },
    ]
  }
}
</script>

<style scoped>
.opacityTransition
{
  transition: opacity 1000ms ease-out;
}
.clipEase1
{
  transition: clip-path 2000ms ease-in-out;
}
.clipEase2
{
  transition: clip-path 2000ms ease-in-out 500ms;
}
.clipOpen
{
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}
.clipClose
{
  clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
}
</style>