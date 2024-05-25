<template>
  <div class="card w-[14.38rem] h-[22.81rem] p-[1px] gradientBorder rounded-[20px] relative" ref="card" @click="onClick('pdf', link)">
    <div
        class="w-full h-full bg-[#03080D] p-5 pb-5 py-[1.88rem] flex flex-col justify-between rounded-[20px] overflow-hidden relative"
        @mousemove="move" @mouseleave="offset = 0">
      <div>
        <div class="h-[3.13rem] w-fit mb-4 pointer-events-none">
          <img :src="`${ressource.asset}`" alt="ressource" class="h-full w-full object-contain">
        </div>
        <p class="montserratMedium">
          <span class="gradientText montserratBold">
            {{ ressource.name }}
          </span>
          {{ ressource.text }}
        </p>
      </div>
      <a class="textMin flex items-center whitespace-nowrap trigger" @click="onClick('pdf', link)">
        <CtaIcon :logoName="'download.svg'" :isText="false" class="mr-[0.63rem] shrink-0" :isWhite="false" />
        {{ ressource.buttonText }}
      </a>
      <div class="glow" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CtaIcon from './CtaIcon.vue'

const props = defineProps<{
  ressource: {
    asset: string;
    name: string;
    text: string;
    buttonText: string;
    link: string;
  };
  link: string;
}>();

const card = ref<HTMLElement>()
const offset = ref(0)
const canTick = ref(true)

function move(event: MouseEvent) {
  if (canTick.value) {
    canTick.value = false
    offset.value = (event.offsetX + event.offsetY) * 0.5

    window.requestAnimationFrame(() => {
      canTick.value = true
    })
  }
}

function onClick(type: string, link: string) {
  if (type === "pdf") {
    window.open(link, "_blank");
  }
}

let bounds = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};

function rotateToMouse(e: MouseEvent) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const leftX = mouseX - bounds.x;
  const topY = mouseY - bounds.y;
  const center = {
    x: leftX - bounds.width / 2,
    y: topY - bounds.height / 2
  }

  card.value!.children[0].style.backgroundImage = `
    radial-gradient(
      circle at
      ${center.x * 2 + bounds.width / 2}px
      ${center.y * 2 + bounds.height / 2}px,
      rgba(218, 213, 213, 0.18),
      rgba(3, 8, 13, 0)
    )
  `;
}

onMounted(() => {
  card.value!.addEventListener('mouseenter', () => {
    bounds = card.value!.getBoundingClientRect();
    document.addEventListener('mousemove', rotateToMouse);
  });

  card.value!.addEventListener('mouseleave', () => {
    document.removeEventListener('mousemove', rotateToMouse);
    card.value!.style.transform = '';
    card.value!.style.background = '';
  });
})
</script>

<style scoped>
.highlight {
  transition: transform 100ms ease-out;
  background: linear-gradient(129deg, rgba(3, 8, 13, 0.29) 0%, rgba(218, 213, 213, 0.18) 60%, rgba(3, 8, 13, 0) 90%);
}

.card {
  font-weight: bold;
  text-align: right;

  box-shadow: 0 1px 5px #00000099;



  transition-duration: 300ms;
  transition-property: transform, box-shadow;
  transition-timing-function: ease-out;
  transform: rotate3d(0);
}

.card:hover {
  transition-duration: 150ms;
  box-shadow: 0 5px 20px 5px #00000044;
}

.card .glow {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  background-image: radial-gradient(circle at 20% -20%,rgba(218, 213, 213, 0.18),  rgba(3, 8, 13, 0));
}

</style>