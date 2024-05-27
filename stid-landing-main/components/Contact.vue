<template>
  <Transition name="show">
    <div class="fixed contact top-0 left-0 w-full items-center" v-show="show">
      <div class="inner px-[60px] py-5">
        <header class="contact__header flex justify-end">
          <CtaIcon
            @click="close"
            :logoName="'close-contact.svg'"
            :isText="false"
            class="shrink-0 contact__close"
            :isWhite="true"
          />
        </header>
        <section class="mobile:my-[0px]">
          <Cross ref="cross" />
          <h4
            class="organettoLightUltra mobile:text-[50px] desktop:text-[80px] uppercase leading-normal"
          >
            Let’s talk
          </h4>
          <h5
            class="mb-[40px] mobile:my-[0px] mobile:mb-[30px] opacity-50 montserratRegular"
          >
            Let us know more about you and your<br />security needs.
          </h5>

          <form
            @submit.prevent="onSubmit"
            action="https://us22.list-manage.com/subscribe/post-json?u=debf8233b53615f787c8bbfad&id=748934c1cb4443d4281c30073cad3dd9&c=?"
            method="POST"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            class="validate"
            target="_blank"
          >
            <div class="flex gap-[10px] mobile:block">
              <div class="input w-1/2 mobile:w-full">
                <input
                  class="montserratRegular"
                  type="text"
                  required
                  pattern=".{2,}"
                  title="Minimum 2 characters"
                  placeholder="Your name"
                  v-model="name"
                  name="FNAME"
                />
              </div>
              <div class="input w-1/2 mobile:w-full mobile:mt-[20px]">
                <input
                  class="montserratRegular"
                  type="text"
                  required
                  pattern=".{2,}"
                  title="Minimum 2 characters"
                  v-model="company"
                  placeholder="Your company name"
                  name="LNAME"
                />
              </div>
            </div>
            <div class="flex mt-[20px]">
              <div class="input w-full">
                <input
                  class="montserratRegular"
                  type="email"
                  required
                  placeholder="Your email address"
                  v-model="email"
                  name="EMAIL"
                />
              </div>
            </div>
            <div class="flex mt-[20px]">
              <div class="input textarea w-full">
                <textarea
                  class="montserratRegular"
                  required
                  placeholder="Describe"
                  v-model="message"
                  name="MMERGE5"
                ></textarea>
              </div>
            </div>
            <div class="flex mt-[20px] mb-[20px]">
              <CtaButton
                @submit="onSubmit"
                type="submit"
                :isText="true"
                :isWhite="false"
                :text="'Send'"
                :displayPoint="true"
              />
            </div>
            <p v-if="success" class="mt-2 montserratRegular text-[12px]">
              Your message has been sent successfully. Thank you for reaching
              out. We'll get back to you shortly.
            </p>
            <p
              v-if="error"
              class="mt-2 text-red-500 montserratRegular text-[12px]"
            >
              Oops! It seems there was an error while sending your message.
              Please try again, and if the issue persists, reach out to our
              support team for assistance. Thank you for your patience.
            </p>
          </form>
        </section>
        <div class="contact__bg"></div>
      </div>
      <div class="contact__fullbg" @click="close"></div>
    </div>
  </Transition>
</template>

<script>
import { useBus } from "../utils/bus.js";
import Scroll from "../utils/scroll/Scroll.js";
import Cross from "./sub/Cross.vue";
import CtaButton from "./sub/CtaButton.vue";
import CtaIcon from "./sub/CtaIcon.vue";

const bus = useBus();

export default {
  components: { CtaButton, CtaIcon, Cross },
  data() {
    return {
      scroll: new Scroll(),
      name: undefined,
      company: undefined,
      email: undefined,
      message: undefined,
      success: false,
      error: false,
      show: false,
      currentHash: window.location.hash,
    };
  },
  methods: {
    close() {
      bus.emit("closeContact");
    },
    onSubmit() {
      this.success = true;
    },
    loadMailchimpScript() {
      const script = document.createElement("script");
      script.src =
        "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js";
      script.type = "text/javascript";
      script.onload = () => {
        (function ($) {
          window.fnames = new Array();
          window.ftypes = new Array();
          fnames[0] = "EMAIL";
          ftypes[0] = "email";
          fnames[1] = "FNAME";
          ftypes[1] = "text";
          fnames[2] = "LNAME";
          ftypes[2] = "text";
          fnames[3] = "ADDRESS";
          ftypes[3] = "address";
          fnames[4] = "PHONE";
          ftypes[4] = "phone";
          fnames[5] = "MMERGE5";
          ftypes[5] = "text";
        })(jQuery);
        window.$mcj = jQuery.noConflict(true);
      };
      document.head.appendChild(script);
    },
    openMailchimpForm() {
      window.open(
        "https://us22.list-manage.com/subscribe/post-json?u=debf8233b53615f787c8bbfad&id=748934c1cb4443d4281c30073cad3dd9&c=?",
        "_blank"
      );
    },
  },
  mounted() {
    this.$refs.cross.intersect(true, 0);
    bus.on("openContact", () => {
      this.scroll.lock(true);
      this.show = true;
    });
    bus.on("closeContact", () => {
      this.scroll.lock(false);
      this.show = false;
    });
    this.loadMailchimpScript();
  },
  beforeUnmount() {
    window.removeEventListener("hashchange", this.handleHashChange);
  },
};
</script>

<style scoped>
.contact {
  height: 100dvh;
  width: 100vw;
  right: 0;
  top: 0;
  left: inherit;
  z-index: 50;
}
.contact__close {
  cursor: pointer;
}
.contact .inner {
  width: 45vw;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  border-left: 1px solid #0088eb;
}

@media screen and (max-width: 640px) {
  .contact .inner {
    border-left: none;
  }
}

@media screen and (max-width: 640px) {
  .contact .inner {
    width: 100vw;
    padding-left: 40px;
    padding-right: 40px;
  }
}
.contact__bg {
  transform: matrix(1, 0, 0, -1, 0, 0);
  background: linear-gradient(180deg, #03080d 0%, #08131f 100%);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.contact__fullbg {
  background: rgba(5, 13, 20, 0.8);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.contact .input {
  box-sizing: border-box;
  height: 50px;
  background: #050c13;
  border-radius: 10px;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.15));
  position: relative;
}
.contact .input.textarea {
  height: 200px;
}

@media screen and (max-width: 640px) {
  .contact .input.textarea {
    height: 130px;
  }
}

.input input,
.input textarea {
  width: 100%;
  height: 100%;
  background: #050c13;
  border-radius: 10px;
  padding: 10px;
}
.input input:focus {
  filter: drop-shadow(0px 0px 10px rgba(0, 233, 163, 0.3));
  outline: 0;
}
.contact .input:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  z-index: -1;
  margin: -1px;
  border-radius: inherit;
  background: linear-gradient(
      90deg,
      rgba(0, 136, 235, 0.7) 0%,
      rgba(0, 233, 163, 0.7) 100%
    ),
    linear-gradient(0deg, #050c13, #050c13);
}

.show-enter-active,
.show-leave-active {
  transition-duration: 1s;
}

.show-enter-active .inner,
.show-leave-active .inner {
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform;
}

.show-enter-active .contact__fullbg,
.show-leave-active .contact__fullbg {
  transition: opacity 0.75s ease-out;
  will-change: opacity;
}

.show-enter-from .inner,
.show-leave-to .inner {
  transform: translateX(200px);
  opacity: 0;
}
.show-enter-from .contact__fullbg,
.show-leave-to .contact__fullbg {
  opacity: 0;
}
</style>
