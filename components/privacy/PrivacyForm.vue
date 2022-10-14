<template>
  <div class="privacy-form container block-wrapper" ref="container">
    <div v-if="bgImage" class="privacy-form__bg">
      <img :src="bgImage" alt="" ref="bgImage">
    </div>

    <div class="privacy-form__inner">
      <div v-if="title" class="privacy-form__title h2" ref="title">{{title}}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { animateJS } from "~/plugins/animations";
import {gsap} from "gsap";
import { SplitText } from 'gsap/dist/SplitText';
gsap.registerPlugin(SplitText);

export default {
  props: {
    bgImage: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  methods: {
    scrollForm(){
      const form = document.querySelector(".question-form");
      const container = this.$refs.container;

      gsap.set(form, {
        y: '100vh',
        rotate: '-17deg'
      });

      gsap.to(form, {
        scrollTrigger: {
          trigger: container,
          start: '20% top',
          // end: "bottom bottom",
          // scrub: 1
        },
        y: 0,
        rotate: '0deg'
      })

      const title = this.$refs.title;
      const split = new SplitText(title, { type: 'lines' }).lines;

      gsap.from(
        split, {
          scrollTrigger: {
            trigger: container,
            start: 'top 100px',
          },
          duration: 2,
          x: 100,
          opacity: 0,
          stagger: 0.1,
          ease: "Power4.easeInOut",
        }
      );
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollForm();

      animateJS('scaleFullImage', this.$refs.bgImage);
      // animateJS('splitTitleRight', this.$refs.title);
    });
  }
};
</script>

<style lang="scss" scoped>
.privacy-form {
  @include pb-aquamarine;
  position: relative;

  height: 200vh;

  @include min(tb) {
    padding-bottom: 162px;
  }
  @include min(md) {
    padding-bottom: 208px;
  }
  @include min(xl) {
    padding-bottom: 244px;
  }
  @include min(bg) {
    padding-bottom: 320px;
  }
}
.privacy-form__bg {
  width: 100%;
  height: 100%;
  // position: absolute;
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
}
.privacy-form__inner {
  @include pt-blueviolet;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding-left: 18px;
  padding-right: 18px;

  position: fixed;
  top: 77px;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;

  @include min(tb) {
    padding-top: 162px;
    width: 480px;
    top: 85px;
    padding-left: 0px;
    padding-right: 0px;
  }
  @include min(md) {
    width: 627px;
  }
  @include min(lg) {
    width: 816px;
    top: 0px;
  }
  @include min(xl) {
    padding-top: 172px;
    // top: 100px;
  }
  @include min(bg) {
    padding-top: 230px;
    width: 1116px;
    // top: 125px;
  }
}
.privacy-form__title {
  margin-bottom: 21px;
  color: #FFFFFF;
  position: relative;
  z-index: 2;

  @include min(tb) {
    margin-right: -10%;
    margin-left: auto;
    margin-bottom: -6px;
    width: 354px;
    text-align: right;
  }
  @include min(md) {
    width: 496px;
  }
  @include min(lg) {
    width: 580px;
  }
  @include min(xl) {
    margin-bottom: -12px;
  }
  @include min(bg) {
    width: 790px;
  }
}
</style>
