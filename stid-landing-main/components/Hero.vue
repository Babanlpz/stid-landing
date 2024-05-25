<template>
  <div class="relative h-real-screen pb-6 desktop:pb-12">
    <!-- Background Video -->
    <div class="absolute top-0 left-0 maskFade h-full w-full">
      <video playsinline autoplay loop muted class="object-cover h-full w-full ratioVideo" :src="videoSrc" loading="eager" fetchPriority="high"></video>
    </div>

    <!-- Content -->
    <div class="ml-[1.38rem] desktop:ml-[3.31rem] relative h-full flex flex-col justify-end z-20">
      <Cross ref="cross" />
      <TitleAnim ref="titleAnim" :textArray="textArray" @catch="showTextContent = true" />
      <p :class="'textContent mt-[0.63rem] desktop:mt-[1.44rem] w-[70%] desktop:w-[25rem] ' + (showTextContent ? 'opacity-100' : 'opacity-0')">
        “What !f?” is the start of everything we do. Welcome to a world of smarter security answers.
      </p>
      <button class="textMin mt-[1.88rem] desktop:mt-10 w-min whitespace-nowrap flex items-center trigger" @click="scrollWebsite">
        Explore
        <CtaIcon :logoName="'arrowdown.svg'" :isText="false" class="ml-[0.63rem]" :isWhite="false" />
      </button>
    </div>
  </div>
</template>

<script>
import Scroll from '../utils/scroll/Scroll.js'
import Cross from "./sub/Cross.vue"
import CtaIcon from './sub/CtaIcon.vue'
import TitleAnim from './sub/TitleAnim.vue'

export default {
  components: { Cross, CtaIcon, TitleAnim },
  data(){
    return {
      mobileVideoSource: 'https://res.cloudinary.com/df7vlavbp/video/upload/v1679654458/stid/Boucle-site-9p-V2.mp4',
      desktopVideoSource : 'https://res.cloudinary.com/df7vlavbp/video/upload/w_1920,f_auto,q_auto:good/stid/Boucle-site-9p-V2.mp4',
      videoSrc : 'https://res.cloudinary.com/df7vlavbp/video/upload/w_1080,f_auto,q_auto:good/stid/boucle-intro-mobile.mp4',
      scroll: new Scroll(),
      textArray: [
        {
          text: "Discover what our open technologies",
          class: "textSubTitle",
          goRight: false
        },
        {
          text: "can offer",
          class: "textTitle",
          goRight: true
        },
      ],
      showTextContent: false
    }
  },
  methods:{
    scrollWebsite(){
      this.scroll.scrollTo(window.innerHeight)
    }
  },
  mounted(){
    // Load End
    this.$refs.titleAnim.intersect(false, 0)
    this.$refs.cross.intersect(false, 0)

    if(window.innerWidth > 768){
      this.videoSrc = this.desktopVideoSource
    } else {
      this.videoSrc = this.mobileVideoSource
    }
  }
}
</script>

<style scoped>
.maskFade{
  mask-image: linear-gradient(0deg, transparent 0%, rgba(255,0,0,1) 70%);
}
.ratioVideo {
  aspect-ratio: 16/9;
}
@media screen and (max-width: 768px) {
  .ratioVideo {
    aspect-ratio: 9/16;
  }
}
</style>