<template>
  <div
    id="app"
    ref="container"
    class="app text-content antialiased text-white w-screen overflow-x-hidden mobile:h-screen relative select-none"
  >
    <!-- Grid -->
    <div class="absolute h-app-screen w-screen top-0 opacity-5 z-10 pointer-events-none transform-gpu bgGrid">
    </div>

    <canvas class="noise"></canvas>


    <!-- <Grain /> -->

    <Nav v-if="!isMobile" />
    <client-only>
      <Burger v-if="isMobile" />
    </client-only>

    <client-only>
      <Contact />
    </client-only>

    <client-only>
      <OrientationBlocker />
    </client-only>

    <client-only>
      <VideoPlayer v-if="showVideo" @close="showVideo = false" />
    </client-only>

    <Loader ref="loader" />
    <Hero />
    <FutureProof :isMobile="isMobile" />
    <Products :isMobile="isMobile" />
    <VideoRecap class="z-20" :isMobile="isMobile" @open="showVideo = true" />
    <StidShowcase :isMobile="isMobile" />
    <Map :isMobile="isMobile" />
    <Watch :isMobile="isMobile" />
    <Partners />
    <Ressources class="z-20" :isMobile="isMobile" />
    <Footer id="footer" class="z-20" :isMobile="isMobile"/>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import Stats from 'stats.js';
import { useBus } from './utils/bus.js';
import Scroll from "./utils/scroll/Scroll.js";
import * as snif from "./utils/snif.js";
const bus = useBus()

export default {
  data() {
    return {
      isMobile: false,
      scroll: new Scroll(),
      stats: null,
      showVideo: false,
      fonts: [
        {
          name: "Organetto-LightUltraCnd",
          url: `url('fonts/Organetto-LightUltraCnd.woff2') format('woff2'), url('fonts/Organetto-LightUltraCnd.woff') format('woff')`,
        },
        {
          name: "Montserrat-Regular",
          url: `url('fonts/Montserrat-Regular.woff2') format('woff2'), url('fonts/Montserrat-Regular.woff') format('woff')`,
        },
        {
          name: "Montserrat-Light",
          url: `url('fonts/Montserrat-Light.woff2') format('woff2'), url('fonts/Montserrat-Light.woff') format('woff')`,
        },
        {
          name: "Montserrat-Bold",
          url: `url('fonts/Montserrat-Bold.woff2') format('woff2'), url('fonts/Montserrat-Bold.woff') format('woff')`,
        },
        {
          name: "Montserrat-SemiBold",
          url: `url('fonts/Montserrat-SemiBold.woff2') format('woff2'), url('fonts/Montserrat-SemiBold.woff') format('woff')`,
        },
        {
          name: "Organetto-ThinUltraCnd",
          url: `url('fonts/Organetto-ThinUltraCnd.woff2') format('woff2'), url('fonts/Organetto-ThinUltraCnd.woff') format('woff')`,
        },
        {
          name: "Montserrat-Medium",
          url: `url('fonts/Montserrat-Medium.woff2') format('woff2'), url('fonts/Montserrat-Medium.woff') format('woff')`,
        },
      ],
    };
  },
  methods: {
    resize() {
      this.scroll.resize({
        width: window.innerWidth,
        height: window.innerHeight,
        locoWidth: 0,
        isHorizontal: false,
      });

      const footerBox = document.getElementById('footer').getBoundingClientRect()
      document.documentElement.style.setProperty("--screen-height", `${window.innerHeight}px`);
      document.documentElement.style.setProperty("--app-height", `${footerBox.top + footerBox.height}px`);

      bus.emit('resize');
    },
    async loadFonts(fontData) {
      const font = new FontFace(fontData.name, fontData.url);
      await font.load();
      document.fonts.add(font);
      this.$refs.loader.end();
    },
    tickFps(){
	    this.stats.begin();
	    this.stats.end();

      window.requestAnimationFrame(this.tickFps)
    },
    tick(){
      this.scroll.scrollPosition = this.scroll.container.scrollTop != 0 ? this.scroll.container.scrollTop : window.scrollY
      this.scroll.animateElements()

      window.requestAnimationFrame(this.tick)
    }
  },
  beforeMount(){
    this.isMobile = window.innerWidth < window.innerHeight
  },
  mounted() {
    this.isMobile = window.innerWidth < window.innerHeight
    for (let font of this.fonts) {
      this.loadFonts(font);
    }

    const canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d')
    canvas.width = canvas.height = 128

    resize();
    window.onresize = resize;

    function resize() {
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }

    function noise(ctx) {

      const w = ctx.canvas.width,
          h = ctx.canvas.height,
          iData = ctx.createImageData(w, h),
          buffer32 = new Uint32Array(iData.data.buffer),
          len = buffer32.length
      let i = 0

      for(; i < len;i++)

        if (Math.random() < 0.75) buffer32[i] = 0xffffffff;
        else buffer32[i] = 0xff000000

      ctx.putImageData(iData, 0, 0);
    }

    noise(ctx);

    this.$nextTick(() => {
      // Debug fps
      if(window.location.hash === "#fps"){
        this.stats = new Stats()
        document.body.appendChild( this.stats.dom );
        this.tickFps()
      }

      this.scroll.setUp({
        cutMobileAnimation: false,
        container: this.$refs.container,
        lerp: 0.15,
        isHorizontal: false,
        isMobile: snif.default.isMobile
      });

      if(snif.default.isMobile){
        this.tick()
      }

      const paraY = document.getElementsByClassName("paraY");
      for (let child of paraY) {
        this.scroll.animatedStack.push({
          htmlElement: child,
          useFunction: false,
          property: "transform",
          propertyValue: "translateY($Vpx)",
          factor: this.isMobile ? 100 : 200,
          translateY: false,
          flip: true,
        });
      }
      const paraVideo = document.getElementsByClassName("paraVideo");
      for (let child of paraVideo) {
        this.scroll.animatedStack.push({
          htmlElement: child,
          useFunction: false,
          property: "transform",
          propertyValue: "translateY($Vpx)",
          factor: this.isMobile ? 100 : 200,
          translateY: false,
          flip: false,
        });
      }

      window.addEventListener("resize", this.resize);
      this.resize();
      // TO FIX //
      // VERY STRANGE BUG //
      setTimeout(() => {
        this.resize();
      }, 1000);
      // TO FIX //
    });
  },
  setup() {
    gsap.registerPlugin(SplitText)
  }
};
</script>

<style>
@import url("./utils/scroll/scroll.css");
@tailwind base;
@tailwind components;
@tailwind utilities;

html{
  font-size: 16px;
}
.textGray {
  color: #666666;
  font-family: "Montserrat-Regular";
}
.link {
  font-family: "Montserrat-Regular";
}
.textMin {
  font-family: "Montserrat-Light";
  text-transform: uppercase;
}
.textContent {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  font-family: "Montserrat-Regular";
  transition: opacity 1000ms ease-in;
}
.textBoldParagraph {
  font-family: "Montserrat-SemiBold";
}
.textSubTitle {
  text-transform: uppercase;
  font-family: "Organetto-LightUltraCnd";
}
.organettoLightUltraCnd,
.textTitleLeadingPlus,
.textTitle {
  text-transform: uppercase;
  font-family: "Organetto-LightUltraCnd";
}
.organettoThinUltra {
  font-family: "Organetto-ThinUltraCnd";
}
.organettoLightUltra {
  font-family: "Organetto-LightUltraCnd";
}
.montserratMedium {
  font-family: "Montserrat-Medium";
}
.montserratBold {
  font-family: "Montserrat-Bold";
}
.montserratRegular {
  font-family: "Montserrat-Regular";
}
.montserratSemiBold {
  font-family: "Montserrat-SemiBold";
}
.montserratLight{
  font-family: "Montserrat-Light";
}
.gradientBorder {
  background: linear-gradient(
    90deg,
    rgba(0, 136, 235, 0.7) 0%,
    rgba(0, 233, 163, 0.7) 100%
  );
}
.gradientText {
  background: linear-gradient(
      180deg,
      rgba(0, 136, 235, 0.7) -11.87%,
      rgba(0, 233, 163, 0.7) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.pointerAll {
  pointer-events: all !important;
}
.dragEase {
  transition: transform 250ms ease-out;
}
@media (orientation: landscape) {
  .bgGrid
  {
    background-size: contain;
    background-image:
      repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%),
      repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%);
    background-size: 125px 125px;
  }
  .monsteratBold {
    font-size: 0.63rem;
  }
  .textGray {
    font-size: 1.36rem;
  }
  .link {
    font-size: 1.25rem;
  }
  .textMin {
    font-size: 0.63rem;
  }
  .textContent {
    font-size: 0.95rem;
  }
  .textBoldParagraph {
    font-size: 1.38rem;
    line-height: 2.06rem;
  }
  .textSubTitle {
    font-size: 2.5rem;
    line-height: 3.25rem;
  }
  .textTitle {
    font-size: 5rem;
    line-height: 5rem;
  }
  .textTitleLeadingPlus {
    font-size: 5rem;
    line-height: 6.25rem;
  }
}
@media (orientation: portrait) {
  .bgGrid
  {
    background-size: contain;
    background-image:
      repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%),
      repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%);
    background-size: 75px 75px;
  }
  .monsteratBold {
    font-size: 0.63rem;
  }
  .textGray {
    font-size: 1.13rem;
  }
  .link {
    font-size: 1.25rem;
  }
  .textMin {
    font-size: 0.63rem;
  }
  .textContent {
    font-size: 0.88rem;
  }
  .textBoldParagraph {
    font-size: 1.13rem;
    line-height: 1.695rem;
  }
  .textSubTitle {
    font-size: 1.25rem;
    line-height: 1.88rem;
  }
  .textTitle {
    font-size: 3.13rem;
    line-height: 3.44rem;
  }
  .textTitleLeadingPlus {
    font-size: 3.13rem;
    line-height: 3.88rem;
  }
}
</style>

<style scoped>
.app {
  background-color: #050d14;
}

canvas {
  position: fixed;
  opacity: 0.1;
  z-index: 9;
  pointer-events: none;
  user-select: none;
  mix-blend-mode: overlay;
}
</style>
