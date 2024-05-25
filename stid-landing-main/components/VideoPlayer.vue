<template>
  <div class="fixed top-0 left-0 w-screen h-screen z-[100] flex justify-center items-center">
    <div class="absolute left-0 top-0 w-full h-full bgFaded"  @click="$emit('close')">
    </div>
    <video playsinline controls autoplay class="paraVideo desktop:max-w-[80%] desktop:max-h-[80%] max-w-[100%] max-h-[100%] z-10">
      <source src="https://res.cloudinary.com/df7vlavbp/video/upload/w_1920,q_auto:good/stid/STID_V14_Logo_2.mp4" media="(min-width:1024px)">
      <source src="https://res.cloudinary.com/df7vlavbp/video/upload/w_1080,f_auto,q_auto:good/stid/STID_V14_Logo_2.mp4" media="(min-width:768px)">
      <source src="https://res.cloudinary.com/df7vlavbp/video/upload/w_720,f_auto,q_auto:good/stid/STID_V14_Logo_2.mp4">
    </video>
  </div>
</template>

<script>
import Scroll from '../utils/scroll/Scroll.js'
export default {
  data(){
    return {
      scroll: new Scroll()
    }
  },
  mounted(){
    this.scroll.lock(true)
  },
  beforeUnmount() {
    this.scroll.lock(false)
  }
}
</script>

<style scoped>
.bgFaded
{
  background: rgba(5, 13, 20, 0.8);
}
</style>