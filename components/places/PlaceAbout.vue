<template>
  <div
    class="place-about container"
    :class="{'two-lines': isTwoLines}"
  >
    <p v-if="subtext" class="place-about__subtext decor-text p1" ref="textTop">{{ subtext }}</p>
    <p v-if="title1" class="place-about__title h2 block-wrapper" ref="title">
      <span v-if="title1" class="place-about__title-word place-about__title-word--1" ref="title1">{{ title1 }}</span>
      <span v-if="title2" class="place-about__title-word place-about__title-word--2" ref="title2">{{ title2 }}</span>
      <span v-if="title3" class="place-about__title-word place-about__title-word--3" ref="title3">{{ title3 }}</span>
    </p>

    <div class="place-about__inner">
      <div class="place-about__info block-wrapper">
        <p v-if="infoText" class="place-about__info-text p1" ref="textBottom">{{ infoText }}</p>
        <p v-if="infoTitle" class="place-about__info-title h4" ref="titleAdditional">{{ infoTitle }}</p>
      </div>

      <div v-if="mainImage" class="place-about__image-main" ref="mainImageWrapper">
        <img :src="mainImage" alt="mainImage" ref="mainImage" />
      </div>
      <div v-if="smallImage" class="place-about__image-small" ref="smallImageWrapper">
        <img :src="smallImage" alt="smallImage" ref="smallImage"/>
      </div>
    </div>
  </div>
</template>

<script>
import { parallaxImage, animateJS } from "~/plugins/animations";

export default {
  props: {
    subtext: {
      type: String,
      default: "",
    },
    title1: {
      type: String,
      default: "",
    },
    title2: {
      type: String,
      default: "",
    },
    title3: {
      type: String,
      default: "",
    },
    infoTitle: {
      type: String,
      default: "",
    },
    infoText: {
      type: String,
      default: "",
    },
    mainImage: {
      type: String,
      default: "",
    },
    smallImage: {
      type: String,
      default: "",
    },
    isTwoLines: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.$nextTick(() => {
      animateJS('fadeImage', this.$refs.smallImage);
      animateJS('splitTitleLeft', this.$refs.title);
      animateJS('splitTitleLeft', this.$refs.titleAdditional);
      animateJS('splitText', this.$refs.textTop);
      animateJS('splitText', this.$refs.textBottom);
      parallaxImage(this.$refs.smallImage, this.$refs.smallImageWrapper, 40);
    });
  }
};
</script>

<style lang="scss" scoped>
.place-about {
  padding-top: 40px;
  @include pb-aquamarine;
  position: relative;

  @include min(tb) {
    padding-top: 80px;
  }
  @include min(md) {
    @include pt-cornflowerblue;
  }
}
.place-about__subtext {
  display: none;

  @include min(md) {
    width: 212px;
    display: block;
    text-indent: 6ch;
  }
  @include min(xl) {
    width: 312px;
  }
  @include min(bg) {
    width: 354px;
  }
}
.place-about__title {
  @include mt-aquamarine;
  text-align: center;
  position: relative;
  z-index: 5;
  line-height: 0.9;

  @include min(md) {
    text-align: left;
  }
}
.place-about__title-word {
  position: relative;

  @include min(md) {
    width: 100%;
    display: inline-block;
    text-align: left;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
  @include min(xl) {
    &:not(:last-child) {
      margin-bottom: 0;
    }
  }

  &--1 {
    text-indent: 3ch;

    @include min(bg) {
      text-indent: 4ch;
    }
  }
  &--2 {
    text-indent: 5ch;
    z-index: 3;

    @include min(xl) {
      text-indent: 7ch;
    }
    @include min(bg) {
      text-indent: 8ch;
    }
  }
  &--3 {
    z-index: 3; 
  }
}
.place-about__inner {
  @include mt-blueviolet;
  display: flex;
  flex-direction: column-reverse;
  position: relative;

  @include min(md) {
    margin-top: 96px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
  @include min(xl) {
    margin-top: 80px;
  }
  @include min(bg) {
    margin-top: 117px;
  }
}
.place-about__info {
  @include mt-cornflowerblue;
  // @include mb-cornflowerblue;

  @include min(tb){
    @include mb-cornflowerblue;
  }
  @include min(md) {
    margin: 0;
    width: 41%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  @include min(bg) {
    width: 39%;
  }
}
.place-about__info-text {
  width: 75%;
  @include min(md) {
    width: 270px;
  }
  @include min(xl) {
    width: 260px;
  }
  @include min(bg) {
    width: 315px;
  }
}
.place-about__info-title {
  @include mt-cornflowerblue;

  @include min(md) {
    @include mt-blueviolet;
    @include mb-crimson;
  }
}
.place-about__image-main {
  height: 201px;
  position: relative;
  z-index: 3;

  @include min(sm) {
    height: 406px;
  }
  @include min(md) {
    width: 57%;
    height: 340px;
  }
  @include min(xl) {
    height: 481px;
  }
  @include min(bg) {
    height: 641px;
  }
}
.place-about__image-small {
  display: none;

  @include min(md) {
    width: 190px;
    height: 221px;
    display: unset;
    position: absolute;
    z-index: 2;
    right: 48.6%;
    top: -158px;
  }
  @include min(xl) {
    width: 236px;
    height: 274px;
    top: -200px;
  }
  @include min(bg) {
    width: 320px;
    height: 367px;
    top: -270px;
  }

  & img{
    width: calc(100% - 2px);
    height: calc(100% - 2px);
  }
}

.place-about.two-lines {
  .place-about__image-small {
    @include min(md) {
      top: -138px;
    }
    @include min(xl) {
      top: -144px;
    }
    @include min(bg) {
      top: -194px;
    }
  }
}
</style>