<template>
  <div>
    <div class="ml-10 desktop:ml-[11.63rem]">
      <Cross />
      <h2 class="textSubTitle mobile:text-[1.88rem]">OUR recent partnerships</h2>
    </div>
    <div class="mt-14 desktop:mt-20 mb-[4.56rem] desktop:mb-36 sideFade w-screen">
      <div class="flex w-fit mb-[2.31rem] desktop:mb-[3.13rem]">
        <div class="flex markee markee-1 shrink-0">
          <img v-for="logo of logoLine1" :src="`${logo.name}.svg`" :style="`aspect-ratio:${logo.ratio}`" :alt="`${logo.name}`" class="h-[1.88rem] desktop:h-[3.75rem] mr-[10vw]">
        </div>
        <div class="flex markee markee-2 shrink-0">
          <img v-for="logo of logoLine1" :src="`${logo.name}.svg`" :style="`aspect-ratio:${logo.ratio}`" :alt="`${logo.name}`" class="h-[1.88rem] desktop:h-[3.75rem] mr-[10vw]">
        </div>
      </div>
      <div class="flex w-fit">
        <div class="flex markee2 markee-1 shrink-0">
          <img v-for="logo of logoLine2" :src="`${logo.name}.svg`" :style="`aspect-ratio:${logo.ratio}`" :alt="`${logo.name}`" class="h-[1.88rem] desktop:h-[3.75rem] mr-[10vw]">
        </div>
        <div class="flex markee2 markee-2 shrink-0">
          <img v-for="logo of logoLine2" :src="`${logo.name}.svg`" :style="`aspect-ratio:${logo.ratio}`" :alt="`${logo.name}`" class="h-[1.88rem] desktop:h-[3.75rem] mr-[10vw]">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cross from "./sub/Cross.vue";

export default {
  components: { Cross },
  data(){
    return {
      logoLine1: [{"name" : "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/partners/genetec", "ratio" : "225/60" },
                  { "name" : "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/partners/honeywell", "ratio" : "250/60" },
                  { "name" : "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/partners/siemens", "ratio" : "250/60" },
                  { "name" : "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/partners/motorola", "ratio" : "250/60" },
                  { "name" : "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/partners/imron", "ratio" : "225/60" }],
      logoLine2: [{"name" : "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/partners/swiftlane", "ratio" : "225/60" },
                  { "name" : "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/partners/galaxy", "ratio" : "95/60" },
                  { "name" : "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/partners/hqo", "ratio" : "160/60" },
                  { "name" : "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/partners/splan", "ratio" : "190/60" },
                  { "name" : "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/partners/genea", "ratio" : "250/60" },
                  { "name" : "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/partners/butterfly", "ratio" : "250/60" }],
    }
  }

}
</script>

<style scoped>
.markee {
  animation: markee-animation 15s linear infinite;
  will-change: transform;
}

.markee2 {
  animation: markee-animation 15s linear infinite reverse;
  will-change: transform;
}

@keyframes markee-animation {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-100%);
  }
}

.sideFade {
  mask-image: linear-gradient(90deg, rgba(3, 8, 13, 0) 0%, rgba(235, 1, 1, 1) 10%, rgba(255, 0, 0, 1) 90%, rgba(3, 8, 13, 0) 100%);
}
</style>