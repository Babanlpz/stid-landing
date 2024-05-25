<template>
    <div class="mobileOrientationBlocker">
        <img src="/rotate.svg" alt="rotate" />
    </div>
</template>

<style>
.mobileOrientationBlocker {
  display: flex;
  width: 100vw;
  height: 100dvh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 80;
  background: linear-gradient(180deg, #03080D 0%, #08131F 100%);
}
@media screen and (orientation: landscape) and (max-width: 767px) {
  .mobileOrientationBlocker {
    visibility: visible;
  }
}
.mobileOrientationBlocker p {
  margin: 0;
  line-height: 1em;
  font-family: 'HelveticaNeue';
  color: #000;
}
.mobileOrientationBlocker p:first-child {
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: 700;
  font-family: 'HelveticaNeueBold';
}
.mobileOrientationBlocker p:last-child {
  font-size: 14px;
}
.is-focused .mobileOrientationBlocker {
  display: none;
}
</style>