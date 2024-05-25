<script setup>
import { onMounted, ref } from 'vue';

const canvasRef = ref();
const ctxRef = ref();

function resizeCanvas() {
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
}

function drawNoise() {
  const imageData = ctxRef.value.createImageData(canvasRef.value.width, canvasRef.value.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const randomValue = Math.random() * 255;
    data[i] = randomValue;
    data[i + 1] = randomValue;
    data[i + 2] = randomValue;
    data[i + 3] = 255;
  }

  ctxRef.value.putImageData(imageData, 0, 0);
}

function animate() {
  drawNoise();
  requestAnimationFrame(animate);
}
onMounted(() => {
  ctxRef.value = canvasRef.value.getContext('2d');
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animate();
});
</script>
<template>
  <div class="grain">
    <canvas ref="canvasRef" id="canvasGrain"></canvas>
  </div>
</template>
<style scoped>
.grain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  overflow: hidden;
  opacity: 0.05;
  mix-blend-mode: screen;
  pointer-events: none;
}
.grain canvas {
    width: 100%;
    height: 100%;
  }
</style>