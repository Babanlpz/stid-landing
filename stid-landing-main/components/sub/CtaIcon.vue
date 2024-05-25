<template>
  <div :class="'h-[2.19rem] flex justify-center items-center relative rounded-full buttonTrigger ' + (isText ? 'w-auto py-4 px-6' : 'w-[2.19rem]') ">

    <!-- Content -->
    <img v-if="!isText" :src="'https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/artefacts/' + logoName" alt="" class="z-10 w-3 h-3">

    <svg class="absolute w-full h-full">
      <rect shape-rendering="geometricPrecision" width="95%" height="95%" x="2.5%" y="2.5%" rx="20" fill="transparent" stroke-width="1px" :stroke="isWhite ? '#ffffff' : 'url(#paint0_linear_731_58)'" />
      <linearGradient id="paint0_linear_731_58" x1="-1.79811e-07" y1="18" x2="152" y2="18" gradientUnits="userSpaceOnUse">
        <stop stop-color="#0088EB"/>
        <stop offset="1" stop-color="#00E9A3"/>
      </linearGradient>
    </svg>

    <svg :class="'absolute sizeEase z-10 ' + (isText ? 'w-[calc(100%-4px)] h-[calc(100%-4px)]' : 'w-[calc(100%-4px)] h-[calc(100%-4px)]')">
      <rect shape-rendering="geometricPrecision" width="95%" height="95%" x="2.5%" y="2.5%" :rx="isText ? '18' : '20'" fill="transparent" stroke-width="0.5px" :stroke="isWhite ? '#ffffff' : '#0088EB'" />
    </svg>

    <svg :class="'absolute sizeEase z-10 ' + (isText ? 'w-[calc(100%-10px)] h-[calc(100%-8px)]' : 'w-[calc(100%-8px)] h-[calc(100%-8px)]')">
      <rect shape-rendering="geometricPrecision" width="95%" height="95%" x="2.5%" y="2.5%" :rx="isText ? '15' : '20'" fill="transparent" stroke-width="0.5px" :stroke="isWhite ? '#ffffff' : '#0088EB'" />
    </svg>

    <div :class="'absolute h-[95%] w-[95%] rounded-full gradientEase ' + (isWhite ? 'whiteGradient' : 'blueGradient')">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isText: Boolean,
    logoName: String,
    text: String,
    isWhite: Boolean
  },
  data(){
    return {
      height: 35
    }
  }
}
</script>

<style scoped>
.sizeEase
{
  transition: width 250ms ease-in-out, height 250ms ease-in-out, opacity 250ms ease-out;
}
.gradientEase
{
  opacity: 0.2;
  transition: opacity 250ms ease-in-out;
}
.whiteGradient
{
  background: radial-gradient(circle, rgba(8,20,33,0) 0%, rgba(255,255,255,0.5) 80%);
}
.blueGradient
{
  background: radial-gradient(72.04% 684.01% at 50% 51.43%, rgba(0, 136, 235, 0.7) 0%, rgba(0, 233, 163, 0.7) 100%);
}
</style>

<style>
/* Trigger */
.trigger:hover .buttonTrigger .gradientEase,
.buttonTrigger:hover .gradientEase
{
  opacity: 1;
}
.buttonTrigger:hover .sizeEase,
.trigger:hover .buttonTrigger .sizeEase
{
  height: 100%;
  width: 100%;
  opacity: 0;
}
</style>