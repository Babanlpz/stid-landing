<template>
  <button
    class="absolute"
  >
    <div class="hoverScale flex justify-center items-center h-8 w-8">
      <!-- Center -->
      <div :class="'absolute w-3 h-3 rounded-full ease3 ' + (isFocus ? 'lightGradient scale-100' : 'gradientBorder scale-50')">
      </div>

      <svg :class="'absolute w-full h-full ease2 ' + (isFocus ? 'scale-100' : 'scale-50')">
        <rect shape-rendering="geometricPrecision" width="90%" height="90%" x="5%" y="5%" rx="30" fill="transparent" stroke-width="2px" :stroke="isFocus ? '#ffffff' : 'url(#paint0_linear_731_58)'" />
        <linearGradient id="paint0_linear_731_58" x1="-1.79811e-07" y1="18" x2="152" y2="18" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0088EB"/>
          <stop offset="1" stop-color="#00E9A3"/>
        </linearGradient>
      </svg>

      <svg :class="'absolute sizeEase z-10 w-[calc(100%-8px)] h-[calc(100%-8px)] ease2 ' + (isFocus ? 'scale-100' : 'scale-50')">
        <rect shape-rendering="geometricPrecision" width="95%" height="95%" x="2.5%" y="2.5%" rx="30" fill="transparent" stroke-width="1px" stroke="#0088EB" />
      </svg>

      <svg :class="'absolute sizeEase z-10 w-[calc(100%-12px)] h-[calc(100%-12px)] opacity-50 ease2 ' + (isFocus ? 'scale-100' : 'scale-50')">
        <rect shape-rendering="geometricPrecision" width="95%" height="95%" x="2.5%" y="2.5%" rx="30" fill="transparent" stroke-width="0.5px" stroke="#0088EB" />
      </svg>

      <!-- Glow -->
      <div :class="'absolute h-[12rem] w-[12rem] ease1 -z-10 pointer-events-none ' + (isFocus ? 'scale-100' : 'scale-0')">
        <img src="/artefacts/pingGlow.svg" alt="" class="w-full h-full object-contain">
      </div>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    isFocus: Boolean
  }
}
</script>

<style scoped>
.hoverScale
{
  transition: transform 250ms ease-out;
}
.lightGradient
{
  background: linear-gradient(209.55deg, #FCFCFC 22.51%, #E9E9E9 32.14%, #F5F5F5 43.61%, #EBE6E8 52.86%, #F4C7CC 61.74%, #E8F39E 75.06%, #C4BFBC 83.94%, #E1DCDC 91.71%);
}
.ease1
{
  transition: transform 500ms ease-out;
}
.ease2
{
  transition: transform 500ms ease-out 150ms;
}
.ease3
{
  transition: transform 500ms ease-out 300ms;
}
@media (orientation: landscape) {
  .hoverScale:hover
  {
    transform: scale(1.2);
  }
}
</style>