<template>
  <div class="gradientBorder p-[1px] rounded-[1.25rem] overflow-hidden mapCard">
    <div class="p-5 pb-16 w-80 h-72 bg-[#050C13] rounded-[1.25rem]">
      <div class="mapCardContent">
        <div class="overflow-hidden">
          <h3 class="uppercase montserratBold text-[1.38rem] mapCardCountry gradientText">
            {{ mapData.country }}
          </h3>
        </div>
        <p class="montserratMedium text-[0.88rem] mb-[0.63rem] mapCardSubCountry overflow-hidden">
          {{ mapData.subCountry }}
        </p>
        <p v-for="(line, index) of mapData.adress" class="montserratRegular text-[0.88rem] mapCardText overflow-hidden">
          {{ line }}
        </p>
        <p class="montserratRegular text-[0.88rem] my-4 mapCardPhone overflow-hidden">
          {{ mapData.phone }}
        </p>
        <div class="overflow-hidden">
          <a class="montserratRegular text-[0.88rem] underline cursor-pointer mapCardMail"
             target="_blank"
             :href="'mailto:' + mapData.mail">
            {{ mapData.mail }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    opacity: Number,
    x: Number,
    mapData: Object,
    ease: Boolean
  }
}
</script>

<style scoped>
.easeTransition {
  transition: transform 300ms cubic-bezier(0, 0, 0.56, 1.32);
}
</style>