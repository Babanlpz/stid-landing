<template>
  <div class="relative pt-[6.25rem] desktop:pt-48 px-[11%] desktop:px-16 pb-10 bg-[#010407]">
    <lottie-player
      v-if="isMobile"
      ref="lottieFooter"
      mode="normal"
      src="https://res.cloudinary.com/df7vlavbp/raw/upload/stid/cdn/lotties/footer_mobile.json"
      class="absolute top-2 h-[4.75rem] left-0 w-screen"
    >
    </lottie-player>
    <lottie-player
      v-if="!isMobile"
      ref="lottieFooter"
      mode="normal"
      src="https://res.cloudinary.com/df7vlavbp/raw/upload/v1680186622/stid/cdn/lotties/footer_2.json"
      class="absolute top-5 h-fit left-0 w-screen"
    >
    </lottie-player>

    <div class="grid gridTemplate">
      <div class="col-start-1 row-start-1" >
        <Cross />
        <TitleAnim :textArray="textArray" @catch="$refs.lottieFooter.play()"/>
      </div>
      <div class="desktop:col-start-2 desktop:row-start-1 col-start-1 row-start-2 h-fit">
        <p class="textBoldParagraph">
          Subscribe to our newsletter
        </p>
        <form @submit="onSubmit" action="#subscribe" class="relative">
          <input v-model="email" type="email" placeholder="Enter your email adress" class="py-5 right-0 top-4 w-full borderBottom bg-transparent opacity-50 mt-12">
          <CtaButton @click="onSubmit" :isText="true" :isWhite="false" :text="'Ok'" style="position: absolute !important; top: 25px; right: 0;" class="mt-10 absolute top right" />
        </form>
        <p v-if="success" class="mt-2 gradientText montserratRegular text-[12px]">Thank you for subscribing!<br/><small>We truly appreciate your support and look forward to providing you with valuable content and updates.</small></p>
        <p v-if="alreadySubscribed" class="mt-2 text-red-500 montserratRegular text-[12px]">You're already subscribed!<br/><small>Thanks for your support. If you have any questions, please contact our support team.</small></p>
        <p v-if="error" class="mt-2 text-red-500 montserratRegular text-[12px]">We're sorry, but there was an error processing your subscription. Please try again later, and if the issue persists, don't hesitate to reach out to our support team for assistance.</p>
      </div>
    </div>

    <div class="grid gridTemplate desktop:mt-20 mt-10">
      <div class="col-start-1 row-start-1">
        <a href="mailto:contact@stid.com" target="_blank" class="link underline desktop:mt-20">contact@stid.com</a>
        <div class="flex mt-10 mobile:mb-10 gap-4">
          <a href="https://www.linkedin.com/company/stid/mycompany/?viewAsMember=true" target="_blank">
            <CtaButton :isText="false" :isWhite="false" :text="'Ln'" />
          </a>
          <a href="https://www.youtube.com/channel/UC7-aIxWrbZN4GPMbLEJq5qA/videos" target="_blank">
            <CtaButton :isText="false" :isWhite="false" :text="'Yt'" />
          </a>
          <a href="https://twitter.com/StidOfficiel" target="_blank">
            <CtaButton :isText="false" :isWhite="false" :text="'Tw'" />
          </a>
        </div>
      </div>
      <div class="desktop:col-start-2 desktop:row-start-1 col-start-1 row-start-2 h-fit montserratRegular desktop:flex">
        <p class="mr-[4.5rem]">
          20 Parc d'activités des Pradeaux<br>13850, Greasque<br>France<br><br>+33 (0)4 42 12 60 60
        </p>
        <p class="mobile:mt-10">
          6012 W. Campus Circle Drive<br>Suite 210 Irving, Texas 75063<br>United States<br><br>+ 1 877 894 9135
        </p>
      </div>
    </div>

    <div class="grid gridTemplate mt-[3.75rem] desktop:mt-[6.25rem]">
      <p class="montserratRegular opacity-50 col-start-1 row-start-1" v-if="!isMobile">
        © {{ new Date().getFullYear() }} STid.
      </p>

      <div class="flex justify-between desktop:col-start-2 desktop:row-start-1 col-start-1 row-start-2 mobile:flex-col">
        <div class="flex">
          <a href="legal-notices.pdf" download target="_blank" class="montserratRegular opacity-50 uppercase underline mr-[4.5rem] text-[0.88rem]">Legal notices</a>
          <!-- <a href="" class="montserratRegular opacity-50 uppercase underline text-[0.88rem]">privacy policy</a> -->
        </div>
        <img v-if="!isMobile" src="/stid.svg" alt="" class="opacity-50 mobile:h-5">
        <div v-else class="flex w-full justify-between mt-[3.75rem]">
          <p class="montserratRegular opacity-50 col-start-1 row-start-1">
            © {{ new Date().getFullYear() }} STid.
          </p>
          <img src="/stid.svg" alt="" class="opacity-50 mobile:h-5">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cross from './sub/Cross.vue';
import CtaButton from './sub/CtaButton.vue';
import TitleAnim from './sub/TitleAnim.vue';

export default {
  components: { TitleAnim, CtaButton, Cross },
  props: {
    isMobile: Boolean
  },
  data(){
    return {
      email: undefined,
      success: false,
      error : false,
      alreadySubscribed: false,
      textArray: [
        {
          text: "WE SHAPE innovation",
          class: "textSubTitle",
          goRight: false
        },
        {
          text: "THROUGH",
          class: "textTitle",
          goRight: true
        },
        {
          text: "COLLABORATION",
          class: "textTitle",
          goRight: false
        },
      ]
    }
  },
  methods: {
    onSubmit(e){
      e.preventDefault();
      console.log("submit", this.email);
      this.postEmail(this.email);
    },
    async postEmail(email) {
      try {
        const response = await fetch('https://stid.neuviemepage.com/api/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if(data.ContactID){
          this.success = true;
        } else {
          if(data.message === 400) {
            this.alreadySubscribed = true;
          } else {
            this.error = true;
          }
        }
      } catch (error) {
        this.error = true;
      }
    }
  }
}
</script>

<style scoped>
.borderBottom{
  border-bottom: 1px solid  #D9D9D9;
}
@media (orientation: landscape) {
  .gridTemplate
  {
    grid-template-columns: 45vw auto;
  }
}
</style>