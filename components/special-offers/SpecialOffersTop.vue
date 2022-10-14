<template>
  <div class="special-top container">
    <h1 v-if="title" class="special-top__title h2" ref="title">{{title}}</h1>
    <p v-if="text" class="special-top__text p1" ref="text">{{text}}</p>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';
gsap.registerPlugin(ScrollTrigger, SplitText);

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.$nextTick(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".special-top",
        }
      });
      const split = new SplitText(this.$refs.title, { type: 'lines', linesClass: 'wrapper-char' }).lines;

      tl.from(split, { duration: 2, x: -100, opacity: 0, stagger: 0.1, ease: "Power4.easeInOut" }, "first")
        .from(this.$refs.text, 
          { delay: 0.5, duration: 1.5, opacity: 0, yPercent: 70, stagger: 0.2, ease: "Power4.easeInOut" },
        "first");
    });
  }
};
</script>

<style lang="scss" scoped>
.special-top {
  margin-top: 64px;
  background-color: $white-color;
  text-align: center;

  @include min(tb) {
    margin-top: 85px;
  }
  @include min(xl) {
    margin-top: 94px;
  }
  @include min(bg) {
    margin-top: 125px;
  }
}
.special-top__title {
  @include pt-skyblue;
  margin-left: auto;
  margin-right: auto;
  // width: 50%;
  text-align: center;

  @include min(tb){
    width: 50%;
  }
  @include min(lg) {
    width: 35%;
  }
}
.special-top__text {
  @include mt-thistle;
  @include mb-cornflowerblue;
  margin-left: auto;
  margin-right: auto;

  @include min(tb) {
    width: 479px;
  }
  @include min(lg) {
    width: 521px;
  }
  @include min(bg) {
    width: 637px;
  }
}
</style>