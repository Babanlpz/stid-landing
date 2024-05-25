<template>
  <div id="videoRecap" class="relative h-[37rem] py-[2px] w-screen gradientBorder">
    <!-- Content -->
    <div class="h-full w-full flex flex-col justify-center items-center relative pointerAll">
      <Line :isWhite="true" class="z-10" />
      <TitleAnim :textArray="textArray" class="text-center z-10"/>
      <CtaButton @click="$emit('open')" :text="'Watch now'" :isText="true" :isWhite="false" class="mt-[1.88rem] desktop:mt-12 z-10"/>

      <!-- Background Video -->
      <div class="absolute w-full bg-black left-0 h-full overflow-hidden" >
        <div class="absolute top-[-6.5rem] h-[50rem] w-full">
          <video playsinline autoplay loop muted class="object-cover h-full w-full ratioVideo" :src="videoSrc"  loading="loading" fetchPriority="high"></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CtaButton from './sub/CtaButton.vue'
import Line from './sub/Line.vue'
import TitleAnim from './sub/TitleAnim.vue'

export default {
  components: { Line, CtaButton, TitleAnim },
  props: {
    isMobile: Boolean
  },
  data(){
    return {
      textArray: [],
      mobileVideoSource: 'https://res.cloudinary.com/df7vlavbp/video/upload/v1679669941/stid/Boucle-cta-mobile.mp4',
      desktopVideoSource : 'https://res.cloudinary.com/df7vlavbp/video/upload/v1679672493/stid/Boucle-cta-color_1.mp4',
      videoSrc : 'https://res.cloudinary.com/df7vlavbp/video/upload/v1679672493/stid/Boucle-cta-color_1.mp4',

    }
  },
  mounted(){

    if(window.innerWidth > 768){
      this.videoSrc = this.desktopVideoSource
    } else {
      this.videoSrc = this.mobileVideoSource
    }

    this.textArray = this.isMobile ? [
        {
          text: "We summed it all up in 90 seconds",
          class: "textSubTitle",
          goRight: false
        },
        {
          text: "wanna see ?",
          class: "textTitle",
          goRight: false
        },
      ] :
      [
        {
          text: "We summed it all up in 90 seconds",
          class: "textSubTitle",
          goRight: false
        },
        {
          text: "wanna see ?",
          class: "textTitle",
          goRight: true
        },
      ]
  }
}
</script>

<style scoped>
.ratioVideo {
  aspect-ratio: 16/9;
}
@media screen and (max-width: 768px) {
  .ratioVideo {
    aspect-ratio: 9/16;
  }
}
</style>