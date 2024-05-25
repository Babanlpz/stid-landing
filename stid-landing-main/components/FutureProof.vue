<template>
  <div id="futureBody" class="relative pt-10 desktop:py-48 mobile:mb-10 flex justify-center items-center">
    <!-- Background -->
    <div class="absolute h-full w-full flex justify-center items-center">
      <div class="h-[21.31rem] desktop:h-[40rem] z-10 mt-40 desktop:mt-60">
        <nuxt-img loading="lazy" sizes="sm:100vw lg:1200px" src="/stid/Architect.png" style="aspect-ratio: 1464/1304;" class="h-full w-full object-contain"></nuxt-img>
      </div>

      <Ellipses :hookID="'futureBody'" :height="'33rem'" :spread="1" :isMobile="isMobile" />
    </div>

    <!-- Content -->
    <div class="relative h-full flex justify-center items-center flex-col paraY z-10 pt-60 desktop:pt-60">
      <TitleAnim :textArray="textArray" class="text-center" @catch="showTextContent = true"/>
      <p :class="'textContent text-center w-[70%] desktop:w-[25rem] mt-6 mobile:mt-[0.81rem] ' + (showTextContent ? 'opacity-100' : 'opacity-0')">
        Discover the largest range readers OSDP™ verifed and our complete offer to reach the highest level of security. With Smarter business Models.
      </p>
    </div>
  </div>
</template>

<script>
import Ellipses from './sub/Ellipses.vue'
import Line from './sub/Line.vue'
import TitleAnim from './sub/TitleAnim.vue'

export default {
  props: {
    isMobile: Boolean
  },
  components: { Line, Ellipses, TitleAnim },
  data(){
    return {
      textArray: [
        {
          text: "Discover the largest",
          class: "textSubTitle",
          goRight: false
        },
        {
          text: "OSDP™ verified reader range",
          class: "textTitle",
          goRight: true
        },
      ],
      showTextContent: false
    }
  }
}
</script>

<style>

</style>