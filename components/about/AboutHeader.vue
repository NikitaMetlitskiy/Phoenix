<template>
  <header class="about-header container">
    <div v-if="data?.Photo_about_cover?.data?.attributes?.url" class="about-header__img-bg block-wrapper">
      <img :src="`${getApiUrl()}${data?.Photo_about_cover?.data?.attributes?.url}`" alt="HeaderImg" ref="imageBg"/>
    </div>

    <div class="about-header__inner">
      <h1 v-if="data?.Title" class="about-header__title h1" ref="title">{{ data?.Title }}</h1>

      <div class="about-header__sub-title-wrapper">
        <div class="about-header__plus" ref="plus">
          <div class="about-header__plus-vr line-vr" ref="plusVr"></div>
          <div class="about-header__plus-hr line-hr" ref="plusHr"></div>
        </div>

        <p v-if="data?.Description" class="about-header__sap-title p1-light" ref="text">{{ data?.Description }}</p>
      </div>
    </div>

    <div v-if="data?.Photo_about_small_cover?.data?.attributes?.url" class="about-header__img-bottom" ref="imgBottomWrapper">
      <img :src="`${getApiUrl()}${data?.Photo_about_small_cover?.data?.attributes?.url}`" alt="HeaderImg" ref="imgBottom" />
    </div>
  </header>
</template>

<script>
import {animateJS, parallaxImage} from "~/plugins/animations";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    mobileHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    drawLines() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.plus,
        },
        delay: 0,
        duration: 1,
        transformOrigin: "50% 50%",
        ease: "Power4.easeInOut",
      });

      tl.from(this.$refs.plusVr, { scale: 0 }, "together")
        .from(this.$refs.plusHr, { scale: 0 }, "together");
    },
  },
  mounted() {
    this.mobileHeight();
    this.drawLines();

    this.$nextTick(() => {
      animateJS('scaleFullImage', this.$refs.imageBg);
      animateJS('splitTitleLeft', this.$refs.title);
      animateJS('splitText', this.$refs.text);
      parallaxImage(this.$refs.imgBottom, this.$refs.imgBottomWrapper, 40);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/utilities/indents";

.about-header {
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 135);
  height: calc(var(--vh, 1vh) * 135);
  display: flex;
  flex-direction: column;
  color: #ffffff;
  position: relative;

  @include min(tb) {
    min-height: calc(var(--vh, 1vh) * 122);
  height: calc(var(--vh, 1vh) * 122);
  }
  @include min(md) {
    height: calc(var(--vh, 1vh) * 135);
  }
}
.about-header__img-bg {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  will-change: transform;
  pointer-events: none;
  // transform: scale(1.1);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.about-header__inner {
  // padding-top: 27vh;
  padding-top: calc(var(--vh, 1vh) * 50 - 40px);
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  // @include min(460) {
  //   padding-top: 18vh;
  // }
  @include min(tb){
    padding-top: calc(var(--vh, 1vh) * 50 - 61px);
  }
  @include min(md) {
    padding-top: 22vh;
    padding-top: calc(var(--vh, 1vh) * 50 - 61px);
  }
  @include min(xl) {
    // padding-top: 28vh;
    padding-top: calc(var(--vh, 1vh) * 50 - 77px);
  }
  @include min(bg) {
    padding-top: 32vh;
    padding-top: calc(var(--vh, 1vh) * 50 - 97px);
  }
}
.about-header__title {
  margin-bottom: 19.5vh;
  text-align: center;
  color: #ffffff;

  @include min(460) {
    margin-bottom: 12vh;
  }
  @include min(md) {  
    margin-bottom: 16vh;
  }
  @include min(xl) {  
    margin-bottom: 14vh;
  }  
  @include min(bg) {  
    margin-bottom: 15.5vh;
  }
}
.about-header__plus {
  margin-bottom: 32px;
  margin-left: auto;
  margin-right: auto;
  width: 1px;
  width: 48px;
  height: 31px;
  position: relative;

  @include min(bg) {  
    margin-bottom: 48px;
  }

  &-hr.line-hr {
    background-color: #FFFFFF;
    bottom: calc(50% - 0.5px);
  }
  &-vr.line-vr {
    background-color: #FFFFFF;
    left: calc(50% - 0.5px);
  }
}
.about-header__sap-title {
  @include mb-antiquewhite;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  display: block;
  max-width: 521px;
  width: 100%;
  text-align: center;
  color: #FFFFFF;

  @include min(bg) {
    max-width: 675px;
  }
}
.about-header__img-bottom {
  margin-left: auto;
  margin-right: auto;
  max-width: 339px;
  width: 100%;
  height: 396px;
  position: absolute;
  z-index: 2;
  bottom: 62px;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(220px);

  @include min(tb) {
    margin-left: 0;
    height: 441px;
    bottom: 54px;
    bottom: 0;
    transform: translateY(calc(100% - 22vh));
  }  
  @include min(md) {
    max-width: 428px;
    height: 499px;
    bottom: 48px;
    bottom: 0;
    transform: translateY(calc(100% - 35vh));
  }  
  @include min(bg) {
    max-width: 732px;
    height: 853px;
    bottom: -37px;
    bottom: 0;
  }
}

</style>