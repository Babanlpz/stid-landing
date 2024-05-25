<template>
  <div
    class="desktop:h-screen webgl relative"
    :style="{ height: `${elemMobileH}px` }"
  >
    <!-- Webgl -->
    <canvas class="canvas fadeMask" ref="canvas" />
    <a
      ref="phoneTarget"
      target="_blank"
      href="https://youtu.be/hyc2Y3K1mkA"
      :class="
        'absolute z-30 ' +
        (displayId === -1
          ? 'opacity-0 pointer-events-none opacityEase'
          : 'opacity-0 pointer-events-none opacityEaseDelay')
      "
    >
      <CtaButton :text="'Watch the video'" :isText="true" :isWhite="false" />
    </a>

    <Indicator
      :class="'easeBlock ' + (displayId === -1 ? 'opacity-100' : 'opacity-0')"
    />

    <div class="z-20 w-full h-full relative flex justify-center items-center">
      <!-- All -->
      <div
        ref="all"
        :class="
          'absolute easeBlock left-[2.5rem] desktop:left-[7.81rem] top-16 desktop:top-[8rem] w-[33rem] ' +
          (displayId === -1 ? 'opacity-100' : 'opacity-0 pointer-events-none')
        "
      >
        <Cross />
        <p class="title uppercase whitespace-wrap">
          <span
            v-for="line of globalVueTextArray"
            :class="line.class"
            v-html="line.text + '<br />'"
          >
          </span>
        </p>
      </div>

      <!-- Content -->
      <div
        v-for="(content, index) of contentArray"
        :style="{ transform: `translateX(${(index - displayId) * 15}%)` }"
        :class="
          'contentSlice absolute easeBlock left-[2.5rem] desktop:left-[7.81rem] top-[75vh] desktop:top-[9.38rem] w-[calc(100vw-5rem)] desktop:w-[27rem] ' +
          (displayId === index
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none')
        "
      >
        <Cross />
        <p class="uppercase whitespace-nowrap">
          <span v-for="line of content.textArray" :class="line.class">
            {{ line.text }}<br />
          </span>
        </p>
        <p class="text-[0.88rem] my-4 desktop:my-[1.94rem] opacity-50">
          <span v-html="content.paragraph"></span>
        </p>
        <div class="flex gap-[0.3rem] mobile:flex-col mobile:gap-5">
          <CtaButton
            v-for="button of content.buttons"
            :text="button.text"
            :isText="true"
            :isWhite="false"
            class="w-fit"
            @click="
              button.function ? button.function() : onClick('pdf', button.link)
            "
            style="padding-left: 1rem; padding-right: 1rem"
          />
        </div>
        <Cross
          class="absolute right-0 rotate-180"
          :class="{ 'right-[-30px]': displayId === 2 && !isMobile }"
        />
      </div>

      <!-- Nav -->
      <div
        :class="
          'absolute mobile:top-[65vh] desktop:bottom-10 flex gap-[0.70rem] easeBlock ' +
          (displayId === -1 ? 'opacity-0 pointer-events-none' : 'opacity-100')
        "
      >
        <CtaButton
          :logoName="'arrowleft.svg'"
          :isText="false"
          :isWhite="true"
          @click="prev()"
        />
        <CtaButton
          :logoName="'allPoints.svg'"
          :isText="false"
          :isWhite="true"
          @click="(displayId = -1), refreshHeight()"
        />
        <CtaButton
          :logoName="'arrowright.svg'"
          :isText="false"
          :isWhite="true"
          @click="next()"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import { Experience } from "../js/webgl"
import * as THREE from "three";
import { useBus } from "../utils/bus.js";
import Scroll from "../utils/scroll/Scroll.js";
import Cross from "./sub/Cross.vue";
import CtaButton from "./sub/CtaButton.vue";
import Indicator from "./sub/Indicator.vue";
import TitleAnim from "./sub/TitleAnim.vue";
const bus = useBus();

export default {
  components: { TitleAnim, Cross, CtaButton, Indicator },
  props: {
    isMobile: Boolean,
  },
  data() {
    return {
      scroll: new Scroll(),
      displayId: -1,
      globalVueTextArray: [
        {
          text: "EXPLORE OUR END TO END",
          class:
            "organettoLightUltraCnd text-[2.5rem] leading-[2.8rem] desktop:text-[3.75rem] desktop:leading-[3.75rem]",
        },
        {
          text: "SMARTER SECURITY: ",
          class:
            "organettoLightUltraCnd text-[2.5rem] leading-[2.8rem] desktop:text-[3.75rem] desktop:leading-[3.75rem]",
        },
        {
          text: "For Interoperability, scalability",
          class:
            "organettoLightUltraCnd text-[1.25rem] leading-[1.56rem] desktop:text-[1.88rem] desktop:leading-[2.19rem] mt-[0.38rem]",
        },
        {
          text: "and interconnectedness.",
          class:
            "organettoLightUltraCnd text-[1.25rem] leading-[1.56rem] desktop:text-[1.88rem] desktop:leading-[2.19rem]",
        },
      ],
      contentArray: [
        {
          textArray: [
            {
              text: "Architect Readers",
              class:
                "organettoLightUltraCnd text-[2.5rem] leading-[2.8rem] desktop:text-[3.75rem] desktop:leading-[3.75rem]",
            },
            {
              text: "The most awarded access control",
              class:
                "organettoLightUltraCnd text-[1.25rem] leading-[1.56rem] desktop:text-[1.88rem] desktop:leading-[2.19rem]",
            },
            {
              text: "reader series in the world",
              class:
                "organettoLightUltraCnd text-[1.25rem] leading-[1.56rem] desktop:text-[1.88rem] desktop:leading-[2.19rem]",
            },
          ],
          paragraph:
            "Architect® is at the forefront of the industry by fulfilling all security needs in terms of technology, aesthetics and desired setups. Intuitive and dynamic, Architect® is open by essence, ready to evolve and meet all your needs.",
          buttons: [
            {
              text: "CONTACT SALES",
              function: this.contactClick,
            },
            {
              text: "DOWLOAD THE BROCHURE",
              link: "./ARCHI_WEB.pdf",
            },
          ],
        },
        {
          textArray: [
            {
              text: "Spectre & Spectre Nano",
              class:
                "organettoLightUltraCnd text-[2.5rem] leading-[2.1rem] desktop:text-[3.75rem] desktop:leading-[3.75rem]",
            },
            {
              text: "Secure your parking access while",
              class:
                "organettoLightUltraCnd text-[1.25rem] leading-[1.56rem] desktop:text-[1.88rem] desktop:leading-[2.19rem]",
            },
            {
              text: "keeping traffic moving",
              class:
                "organettoLightUltraCnd text-[1.25rem] leading-[1.56rem] desktop:text-[1.88rem] desktop:leading-[2.19rem]",
            },
          ],
          paragraph:
            "<b>Spectre</b> Long range reader (15 m / 50 ft)<br>1 reader + 4 remote antennas to manage 4 access lanes in both directions = cost-effective and simplified access managementDetects all sizes of vehicles: from trucks to motorcycles.<br><br><b>Spectre Nano</b> UHF reader (6m / 20 ft)<br>Now you can identify the vehicle, driver, or both with this compact reader.Double identification: Vehicle (UHF) and/or driver (Bluetooth).",
          buttons: [
            {
              text: "CONTACT SALES",
              function: this.contactClick,
            },
            {
              text: "DOWLOAD THE BROCHURE",
              link: "./Gamme_Spectre_US_2023.pdf",
            },
          ],
        },
        {
          textArray: [
            {
              text: "Mobile ID",
              class:
                "organettoLightUltraCnd text-[2.5rem] leading-[2.8rem] desktop:text-[3.75rem] desktop:leading-[3.75rem]",
            },
            {
              text: "Digitize your badges",
              class:
                "organettoLightUltraCnd text-[1.25rem] leading-[1.56rem] desktop:text-[1.88rem] desktop:leading-[2.19rem]",
            },
            {
              text: "with STid Mobile ID",
              class:
                "organettoLightUltraCnd text-[1.25rem] leading-[1.56rem] desktop:text-[1.88rem] desktop:leading-[2.19rem]",
            },
          ],
          paragraph:
            "Remove the hassle from access cards by putting them onto your users’ smartphones. Manage your security with easy configurations. Issue or revoke your badges with one click. No subscription required, and you’ll save money on printing and customizing physical access cards.<br><br>Discover what intuitive security really means with our 6 user interaction modes (slide, tap tap, remote, hands-free, badge, voice command)Integrate our technology directly into your application with our SDK or connect STid Mobile ID to your other security systems with our API. Welcome to the smart security control system.",
          buttons: [
            {
              text: "CONTACT SALES",
              function: this.contactClick,
            },
            {
              text: "DOWLOAD THE BROCHURE",
              link: "./STID_MOBILE_ID_WEB.pdf",
            },
            {
              text: "Watch the video",
              link: "https://youtu.be/hyc2Y3K1mkA",
            },
          ],
        },
      ],
      elemMobileH: "",
      getScreenCoordinates: null,
    };
  },
  watch: {
    displayId() {
      let scene;

      const scrollTo = document.querySelector(".webgl").offsetTop;

      this.scroll.scrollTo(scrollTo);

      switch (this.displayId) {
        case -1:
          scene = "default";
          break;
        case 1:
          scene = "spectre";
          break;
        case 2:
          scene = "phone";
          break;
        case 0:
          scene = "architect";
          break;
        default:
          scene = "default";
          break;
      }

      if (this.displayId === 2) this.tick();
      this.experience?.focus(scene);
    },
  },
  methods: {
    next() {
      this.displayId += 1;
      if (this.displayId > this.contentArray.length - 1) this.displayId = 0;
      this.refreshHeight();
    },
    prev() {
      this.displayId -= 1;
      if (this.displayId < 0) this.displayId = this.contentArray.length - 1;
      this.refreshHeight();
    },
    refreshHeight() {
      if (this.isMobile) {
        this.elemMobileH =
          this.displayId === -1
            ? window.innerHeight * 0.95
            : window.innerHeight * 0.95 +
              Math.round(
                document
                  .getElementsByClassName("contentSlice")
                  [this.displayId].getBoundingClientRect().height
              );
        setTimeout(() => {
          bus.emit("resize");
        }, 250);
      }
    },
    contactClick() {
      bus.emit("openContact");
    },
    onClick(type, link) {
      if (type === "pdf") {
        window.open(link, "_blank");
      }
    },
    tick() {
      const position = this.getScreenCoordinates(
        new THREE.Vector3(18.18, 2.62, -0.267)
      );
      this.$refs.phoneTarget.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate3d(-50%, -50%, 0)`;

      if (this.displayId === 2) window.requestAnimationFrame(this.tick);
    },
  },
  mounted() {
    if (typeof window !== "undefined") {
      // lazy load Experience

      import("../js/webgl/experience").then(
        ({ Experience, ExperienceEvents }) => {
          this.experience = new Experience(this.$refs.canvas);
          ExperienceEvents.on("hint", (scene) => {
            switch (scene) {
              case "spectre":
                this.displayId = 1;
                break;
              case "phone":
                this.displayId = 2;
                break;
              case "architect":
                this.displayId = 0;
                break;

              default:
                this.displayId = -1;
                break;
            }
            this.refreshHeight();
          });
        }
      );

      const _this = this;
      import("../js/webgl/utils.js").then((module) => {
        _this.getScreenCoordinates = module.getScreenCoordinates;
      });
    }

    if (this.isMobile) this.refreshHeight();
  },
  onBeforeDestroy() {
    this.experience?.destroy();
  },
};
</script>

<style>
.webgl {
  position: relative;

  /* dev purpose */
  /* position: fixed !important;
  z-index: 100;
  inset: 0; */
}

.hint {
  height: 80px;
  width: 80px;

  z-index: 21;
  position: absolute;
}

@keyframes anim {
  0% {
    transform: scale(0, 0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    transform: scale(1, 1);
    opacity: 0;
  }
}

.hint > *:nth-child(1) {
  animation: anim 3s 0.1s infinite linear normal;
}

.hint > *:nth-child(2) {
  animation: anim 3s 1.1s infinite linear normal;
}

.hint > *:nth-child(3) {
  animation: anim 3s 2.1s infinite linear normal;
}

.hint > * {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #fff;
  border-radius: 100%;
  will-change: transform, opacity;
}

.canvas {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}
.easeBlock {
  transition: opacity 0.25s ease-out, transform 0.5s ease-out;
}
.opacityEase {
  transition: opacity 0.5s ease-out;
}
.opacityEaseDelay {
  transition: opacity 1s ease-out 2s;
}
@media (orientation: portrait) {
  .fadeMask {
    mask-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(255, 255, 255, 1) 50%
    );
  }
}
</style>
