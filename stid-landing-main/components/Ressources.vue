<template>
  <div id="downloads" class="relative gradientBorder py-[1px]">
    <div class="h-full ressourcesGb py-20">
      <div class="flex flex-col justify-center items-center">
        <Line :isWhite="true" />
        <TitleAnim
          :textArray="textArray"
          class="text-center"
          @catch="showTextContent = true"
        />
        <p
          :class="
            'textContent text-center mobile:w-[74%] mt-6 mobile:mt-[0.81rem]' +
            (showTextContent ? 'opacity-100' : 'opacity-0')
          "
        >
          Discover all our product range.<br />One Supplier for your end to end
          security.
        </p>
      </div>

      <!-- Ressources -->
      <div
        class="embla gap-[0.63rem] mt-[3.75rem] cursor-pointer"
        ref="emblaNode"
      >
        <div class="embla__container flex">
          <div class="embla__slide" v-for="ressource of ressources">
            <Card
              :ressource="ressource"
              class="shrink-0"
              :link="ressource.link"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";
import Card from "./sub/Card.vue";
import Line from "./sub/Line.vue";
import TitleAnim from "./sub/TitleAnim.vue";

const props = defineProps<{
  isMobile: boolean;
}>();

const ressources = [
  {
    asset:
      "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/ressourcesLogo/architect.svg",
    name: "Architect®",
    text: "Discover our High security reader’s range. 100% Scalability, interoperability, customizable.",
    buttonText: "DOWNLOAD",
    link: "./ARCHI_WEB.pdf",
  },
  {
    asset:
      "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/ressourcesLogo/mobile.svg",
    name: "STid MOBILE ID®",
    text: "Digitalize your credential and enter in intuitive and interconnected world.",
    buttonText: "DOWNLOAD",
    link: "./STID_MOBILE_ID_WEB.pdf",
  },
  {
    asset:
      "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/ressourcesLogo/spectre.svg",
    name: "SPECTRE",
    text: "UHF scalable long-range reader. The power to secure and streamline your vehicle gates.",
    buttonText: "DOWNLOAD",
    link: "./Flyer_Spectre_US_2023.pdf",
  },
  {
    asset:
      "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/ressourcesLogo/spectre.svg",
    name: "SPECTRE nano",
    text: "Mixed vehicle & driver identification securing and eliminating vehicle access lines.",
    buttonText: "DOWNLOAD",
    link: "./Flyer_Spectre_NANO_US_2023.pdf",
  },
  {
    asset:
      "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/ressourcesLogo/system.svg",
    name: "ATEX & IECEx certified readers",
    text: "Long range readers, for all your applications in explosive environments.",
    buttonText: "DOWNLOAD",
    link: "./Flyer_ATEX--IECEx_US.pdf",
  },
  {
    asset:
      "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn/ressourcesLogo/architect.svg",
    name: "Quick Access",
    text: "Discover all ou products. One supplier for all your needs.",
    buttonText: "TECHNICAL SPECIFICATIONS",
    link: "./Flyer_quick_access_RFID-BT_v1.00_US_2023.pdf",
  },
];

const textArray = [
  {
    text: "Want to know more?",
    class: "textSubTitle",
    goRight: false,
  },
  {
    text: "DOWNLOAD center",
    class: "textTitle",
    goRight: true,
  },
];
const showTextContent = false;

function onClick(type, link) {
  if (type === "pdf") {
    window.open(link, "_blank");
  }
}

const [emblaNode, emblaApi] = emblaCarouselVue({
  align: 0,
  speed: 2,
});
</script>

<style scoped>
.ressourcesGb {
  background: linear-gradient(0deg, #03080d 0%, #08131f 100%);
}

.embla__container {
  margin-top: 28px;
  display: flex;
  flex-direction: row;
  height: auto;
  gap: 10px;
  margin-left: auto;
  margin-right: auto;
}

.embla {
  width: 100%;
  display: flex;
}
</style>
