<template>
  <div
    id="map"
    ref="map"
    class="gradientBorder h-[50rem] desktop:h-[70rem] pt-[1px] relative overflow-hidden"
  >
    <div class="flex h-full justify-center items-center mapBackground">
      <div
        v-if="isMobile"
        class="absolute w-full h-full top-0 fadeBg z-10 pointer-events-none"
      ></div>
      <div
        class="absolute top-[3.75rem] desktop:top-[9.38rem] z-10 flex flex-col items-center"
      >
        <Line :isWhite="true" />
        <TitleAnim :textArray="textArray" class="text-center" />
      </div>
      <Indicator v-if="!isMobile" />
      <div
        ref="mapContainer"
        class="desktop:mt-[25rem] flex justify-center items-center desktop:w-screen mapTransition desktop:max-w-[1500px] mobile:w-[800vw] absolute"
        :style="{
          transform: `translate(${isMobile ? -mapPos[0] * 8 : 0}vw, ${
            isMobile ? -mapPos[1] * 8 : 0
          }vw)`,
        }"
      >
        <img
          src="https://res.cloudinary.com/df7vlavbp/image/upload/f_auto,w_1600/stid/glow.png"
          class="absolute w-full object-cover pointer-events-none"
        />
        <img
          src="/map/map.svg"
          class="absolute w-[98.5%] translate-y-[-0.5%] object-cover pointer-events-none"
        />

        <!-- Pings -->
        <MapPing
          v-for="(ping, index) of mapContent"
          :key="index"
          :class="'easeTransition ' + (index === target ? 'z-10' : '')"
          :style="{
            transform: `translate(${ping.pos[0] * mapWidth}px, ${
              ping.pos[1] * mapWidth
            }px) scale(${pop > index ? 1 : 0})`,
          }"
          :isFocus="index === target"
          @click="updatePopup(index)"
        />
      </div>

      <!-- Data -->
      <div
        class="embla absolute left-[0.63rem] bottom-0 gap-[0.63rem]"
        ref="emblaNode"
        v-if="isMobile"
      >
        <div class="embla__container flex">
          <div class="embla__slide" v-for="mapData of mapContent">
            <MapCard
              :key="mapData.country"
              :opacity="1"
              :mapData="mapData"
              :x="0"
              :ease="false"
            />
          </div>
        </div>
      </div>

      <MapCard
        v-if="!isMobile"
        :opacity="opacity"
        :mapData="mapContent[popUpTarget]"
        :x="x"
        :ease="ease"
        class="absolute right-16 bottom-8"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import {
  createInTimeline,
  createOutTimeline,
} from "~/assets/scripts/timelines/mapCard";
import { useBus } from "../utils/bus.js";
import Scroll from "../utils/scroll/Scroll.js";
import Indicator from "./sub/Indicator.vue";
import Line from "./sub/Line.vue";
import MapCard from "./sub/MapCard.vue";
import MapPing from "./sub/MapPing.vue";
import TitleAnim from "./sub/TitleAnim.vue";

const bus = useBus();

const props = defineProps({
  isMobile: {
    type: Boolean,
    required: true,
  },
});

const map = ref<HTMLElement>();
const mapContainer = ref<HTMLElement>();

let tl: GSAPTimeline;
let splittedText: Record<string, SplitText> = {};

const scroll = new Scroll();
const mapSize = ref([0, 0]);
const mapWidth = ref(0);
const mapPos = ref([0, 0]);
const target = ref(0);
const pop = ref(0);
const popUpTarget = ref(0);
const opacity = ref(0);
const x = ref(0);
const ease = ref();
const timeouts = ref();
const textArray = ref([
  {
    text: "partners first",
    class: "textTitle",
    goRight: false,
  },
  {
    text: "Wherever you are in the world, we are here to help",
    class: "textSubTitle",
    goRight: true,
  },
]);
const mapContent = ref([
  {
    pos: [-0.5, -11],
    country: "France",
    subCountry: "(headquarters)",
    adress: ["20 Parc d’activités des Pradeaux", "13850 Greasque", "France"],
    phone: "+33 (0)6 46 91 93 41",
    mail: "b.dupart@stid.com",
  },
  {
    pos: [-1.25, -12],
    country: "PARIS-IDF",
    subCountry: "",
    adress: ["Office 92290 Châtenay-Malabry", "France"],
    phone: " +33 (0)1 43 50 11 43",
    // mail: "b.dupart@stid.com",
  },
  {
    pos: [0.5, -14],
    country: "Benelux & DACH",
    subCountry: "",
    adress: [],
    phone: " +33 (0)7 86 66 27 46",
    mail: "f.gitz@stid.com",
  },
  {
    pos: [-2, -14],
    country: "STid UK Ltd.",
    subCountry: "",
    adress: ["Gallows Hill", "Warwick CV34 6UW", "UK"],
    phone: "+44 (0)7 741 564 931 ",
    mail: "g.mackay@stid.com",
  },
  {
    pos: [14, -5],
    country: "MIDDLE EAST",
    subCountry: "",
    adress: ["Office Dubai Digital Park", "Dubai", "UAE"],
    phone: "+971 521 863 656",
    mail: "b.castest@stid.com",
  },
  {
    pos: [2.4, -16],
    country: "Nordics and Eastern Europe",
    subCountry: "",
    adress: [],
    phone: "+46(0)735165034",
    mail: "r.jansson@stid.com",
  },
  {
    pos: [-29, -9],
    country: "NORTH AMERICA",
    subCountry: "",
    adress: ["Office Irving", "Texas 75063-2670", "USA"],
    phone: "+1 877 894 9135",
    mail: "d.taylor@stid.com",
  },
  {
    pos: [-30, -2.5],
    country: "LATINO AMERICA",
    subCountry: "",
    adress: ["0ffice Cuauhtémoc", "06600 CDMX", "México"],
    phone: "+52 (55) 5256 4706",
    mail: "s.gallegos@stid.com",
  },
  {
    pos: [6.14665, 9.91197], // Coordonnées approximatives pour l'Afrique du Sud
    country: "Afrique du Sud",
    subCountry: "",
    adress: [
      "686 Joseph Lister Street",
      "Constantia Kloof, Gauteng",
      "South Africa",
    ],
    phone: "+27 79 881 8230",
    mail: "jethro.lakin@stid.com",
  },
]);

function updatePopup(index: number) {
  if (props.isMobile || index === target.value) return;
  target.value = index;

  timeouts.value = [];
  x.value = 2.5;
  opacity.value = 0;

  //splittedText.country = new SplitText(".mapCardCountry", { type: "lines" });
  splittedText.subCountry = new SplitText(".mapCardSubCountry", {
    type: "lines",
  });
  splittedText.text = new SplitText(".mapCardText", { type: "lines" });
  splittedText.phone = new SplitText(".mapCardPhone", { type: "lines" });
  splittedText.mail = new SplitText(".mapCardMail", { type: "lines" });

  const outl = createOutTimeline(splittedText);
  outl.play().then(() => {
    popUpTarget.value = target.value;
    gsap.set(".mapCardContent", { opacity: 0 });

    nextTick(() => {
      //splittedText.country = new SplitText(".mapCardCountry", { type: "lines" });
      splittedText.subCountry = new SplitText(".mapCardSubCountry", {
        type: "lines",
      });
      splittedText.text = new SplitText(".mapCardText", { type: "lines" });
      splittedText.phone = new SplitText(".mapCardPhone", { type: "lines" });
      splittedText.mail = new SplitText(".mapCardMail", { type: "lines" });

      gsap.set(".mapCardContent", { opacity: 1 });
      const intl = createInTimeline(splittedText);
      intl.play();
    });
  });
}

function intersect(isIn, value) {
  if (value > -0.1) {
    scroll.untrackAnimation(map.value);

    pop.value += 1;
    const tick = setInterval(() => {
      pop.value += 1;
      if (pop.value > mapContent.value.length) {
        clearInterval(tick);
      }
    }, 250);
  }
}

function resize() {
  mapWidth.value = props.isMobile
    ? (window.innerWidth / 100) * 8
    : mapContainer.value.getBoundingClientRect().width / 100;
}

const [emblaNode, emblaApi] = emblaCarouselVue({
  align: "center",
  speed: 2,
});

watchEffect(() => {
  if (emblaApi.value) {
    emblaApi.value.on("select", () => {
      target.value = emblaApi.value!.selectedScrollSnap();
      mapPos.value = [
        mapContent.value[emblaApi.value!.selectedScrollSnap()].pos[0],
        mapContent.value[emblaApi.value!.selectedScrollSnap()].pos[1],
      ];
    });
  }
});

onMounted(() => {
  nextTick(() => {
    scroll.animatedStack!.push({
      htmlElement: map.value,
      intersect: true,
      function: intersect.bind(this),
    });
  });

  updatePopup(0);

  target.value = 0;
  mapPos.value = [mapContent.value[0].pos[0], mapContent.value[0].pos[1]];

  bus.on("resize", resize);
});
</script>

<style scoped>
.mapBackground {
  background: linear-gradient(
    180deg,
    rgba(8, 20, 33, 1) 0%,
    rgba(5, 13, 20, 1) 100%
  );
}

.easeTransition {
  transition: transform 500ms cubic-bezier(0, 0, 0.56, 1.32);
}

.mapTransition {
  transition: transform 500ms ease-in-out;
}

@media (orientation: portrait) {
  .fadeBg {
    background: linear-gradient(
      180deg,
      rgba(11, 21, 30, 1) 0%,
      transparent 60%
    );
  }
}

.embla__container {
  margin-top: 28px;
  display: flex;
  flex-direction: row;
  height: auto;
  gap: 10px;
  width: 100%;
}

.embla {
  width: 100vw;
}
</style>
