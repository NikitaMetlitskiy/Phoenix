<template>
  <div class="place-article container">
    <h2 v-if="title" class="place-article__title h2" ref="title">{{ title }}</h2>

    <div class="place-article__inner">
      <p v-if="subtitle" class="place-article__subtitle p1" ref="text">{{ subtitle }}</p>

      <div v-if="bigImage" class="place-article__image place-article__image--big" ref="bigImageWrapper">
        <img :src="bigImage" alt="bigImage" ref="bigImage"/>
      </div>

      <div v-if="textRight" class="place-article__text-right p1" v-html="textRight" ref="textRight"></div>

      <div v-if="smallImage" class="place-article__image place-article__image--small" ref="smallImageWrapper">
        <img :src="smallImage" alt="smallImage" ref="smallImage" />
      </div>

      <div v-if="bottomImage" class="place-article__image place-article__image--bottom" ref="bottomImageWrapper">
        <img :src="bottomImage" alt="bottomImage" ref="bottomImage" />
      </div>

      <div v-if="textLeft" class="place-article__text-left p1" v-html="textLeft" ref="textLeft"></div>

      <p v-if="textMain" class="place-article__text-main h4" v-html="textMain" ref="textMain"></p>
    </div>
  </div>
</template>

<script>
import { animateJS } from "~/plugins/animations";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    textMain: {
      type: String,
      default: "",
    },
    textRight: {
      type: String,
      default: "",
    },
    textLeft: {
      type: String,
      default: "",
    },
    bigImage: {
      type: String,
      default: "",
    },
    smallImage: {
      type: String,
      default: "",
    },
    bottomImage: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.$nextTick(() => {
      const images = [this.$refs.bigImage, this.$refs.smallImage, this.$refs.bottomImage]
      // animateJS('fadeImage', this.$refs.bigImage);
      // animateJS('fadeImage', this.$refs.bottomImage);
      // animateJS('fadeImage', this.$refs.smallImage);
      animateJS('fadeImage', images);
      animateJS('splitTitleLeft', this.$refs.title);
      animateJS('splitTitleLeft', this.$refs.textMain);
      animateJS('splitText', this.$refs.text);
      animateJS('splitText', this.$refs.textRight);
      animateJS('splitText', this.$refs.textLeft);
    });
  }
};
</script>

<style lang="scss" scoped>

.place-article {
  @include pt-aquamarine;
  @include pb-aquamarine;
}
.place-article__inner {
  @include mt-antiquewhite;

  @include min(md) {
    height: 648px;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  @include min(lg) {
    height: 744px;
  }
  @include min(bg) {
    height: 997px;
  }
}
.place-article__subtitle {
  @include mb-antiquewhite;
  text-indent: 5ch;
  position: relative;

  &::before {
    content: "/*";
    position: absolute;
    left: 0;
    text-indent: 0ch;
  }

  @include min(md) {
    margin-bottom: 46px;
  }
  @include min(lg) {
    margin-bottom: 90px;
  }
  @include min(bg) {
    margin-bottom: 116px;
  }
}
.place-article__image--big {
  height: 200px;

  @include min(sm) {
    height: 300px;
  }
  @include min(tb) {
    height: 406px;
  }
  @include min(md) {
    width: 54%;
    height: 295px;
  }
  @include min(lg) {
    width: 49.5%;
    height: 384px;
  }
  @include min(bg) {
    height: 516px;
  }
}
.place-article__image--small {
  display: none;

  @include min(md) {
    width: 32.5%;
    height: 221px;
    display: block;
    position: absolute;
    top: 0;
    left: 33.7%;
  }
  @include min(lg) {
    width: 37%;
    height: 287px;
    left: 31.6%;
  }
  @include min(bg) {
    height: 381px;
  }
}
.place-article__image--bottom {
  @include mt-thistle;
  height: 394px;

  @include min(sm) {
    height: 530px;
  }
  @include min(tb) {
    height: 798px;
  }
  @include min(md) {
    width: 29.2%;
    height: 315px;
    position: absolute;
    bottom: 0;
    right: -48px;
  }
  @include min(lg) {
    width: 22.9%;
    height: 349px;
    right: -64px;
  }
  @include min(bg) {
    height: 468px;
    right: -80px;
  }
}
.place-article__text-right {
  @include mt-skyblue;

  @include min(md) {
    position: absolute;
    // top: 113px;
    bottom: 440px;
    left: 70.2%;
  }
  @include min(lg) {
    // top: 185px;
    bottom: 460px;
    // left: 75.7%;
  }
  @include min(bg) {
    // top: 263px;
    bottom: 630px;
  }
}
.place-article__text-left {
  margin-top: 32px;
  width: 78%;

  @include min(tb) {
    @include mt-skyblue;
    width: 100%;
  }
  @include min(md) {
    width: 17%;
  }
  @include min(lg) {
    width: 18%;
  }
}
.place-article__text-main {
  margin-top: 40px;

  @include min(md) {
    margin-top: 0;
    width: 41%;
    position: absolute;
    left: 25.3%;
    top: 447px;
  }
  @include min(lg) {
    // width: 30%;
    left: 31.6%;
    top: 588px;
  }
  @include min(bg) {
    width: 31%;
    top: 786px;
  }
}
</style>