<template>
  <div class="offer-header container">
    <div v-if="offerBg" class="offer-header__bg block-wrapper">
      <img :src="offerBg" alt="HeaderImg" ref="imageBg" />
    </div>

    <div class="offer-header__link" ref="link">
      <NuxtLink class="hover-nonlinear-white p1" :to="localePath(`/special-offers`)">{{linkToAll}}</NuxtLink>
    </div>

    <div class="offer-header__inner block-wrapper">
      <h1 v-if="title" class="offer-header__title h3" ref="title">{{title}}</h1>
      <p v-if="date" class="offer-header__date p1" ref="date">{{date}}</p>
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
    date: {
      type: String,
      default: "",
    },
    offerBg: {
      type: String,
      default: "",
    },
    linkToAll: {
      type: String,
      default: "",
    },
  },
  methods: {
    mobileHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
  },
  mounted() {
    this.mobileHeight();

    this.$nextTick(() => {
      if (this.$refs.imageBg) {
        animateJS('scaleFullImage', this.$refs.imageBg);
      }

      if (this.$refs.title) {
        animateJS('splitTitleLeft', this.$refs.title);
      }

      if (this.$refs.date) {
        animateJS('splitText', this.$refs.date);
      }

      if (this.$refs.link) {
        animateJS('splitText', this.$refs.link);
      }
    });
  }
};
</script>

<style lang="scss" scoped>

.offer-header {
  @include pt-cornflowerblue;
  @include pb-cornflowerblue;
  max-width: 100% !important;
  width: 100% !important;
  height: 415px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #FFFFFF;
  position: relative;
  left: 0 !important;


  @include min(sm) {
    height: 490px;
  }
  @include min(tb) {
    height: calc((var(--vh, 1vh) * 100));
  }
}
.offer-header__bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  @include min(md) {
    width: 50%;
  }
}
.offer-header__link,
.offer-header__title,
.offer-header__date {
  position: relative;
  z-index: 2;
}
.offer-header__link {
  padding-left: 14px;
  margin-top: 64px;
  width: max-content;
  display: block;
  position: relative;

  @include min(tb) {
    margin-top: 85px;
  }
  @include min(xl) {
    margin-top: 94px;
    padding-left: 18px;
  }
  @include min(bg) {
    padding-left: 22px;
    margin-top: 125px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 0;
    width: 7px;
    height: 10px;
    background: transparent url('~/static/icons/icon-arrow-left.svg') no-repeat center center / cover;

    opacity: 0.5;

    @include min(xl) {
      top: 3px;
    }
    @include min(bg) {
      top: 5px;
      width: 9px;
      height: 12px;
    }
  }

  a {
    opacity: 0.5;
    transition: opacity 0.75s cubic-bezier(.37,.53,.38,1);
  }
}
.offer-header__inner {
  margin-top: auto;
  background-color: #f8f8f8;

  @include min(md) {
    margin-top: 0;
    margin-left: 50%;
    width: calc(50% - 96px);
    display: flex;
    flex-direction: column-reverse;
    color: $black-color;
    position: absolute;
    z-index: 98;
    top: 0;
    display: none;
  }
  @include min(xl) {
    width: calc(50% - 128px);
  }
  @include min(bg) {
    width: calc(50% - 160px);
  }
}
.offer-header__title {
  width: 339px;

  @include min(sm) {
    width: 490px;
  }
  @include min(tb) {
    width: 339px;
  }
  @include min(md) {
    @include mt-aquamarine;
    width: 100%;
  }
}
.offer-header__date {
  @include mt-antiquewhite;

  @include min(md) {
    @include mt-cornflowerblue;
    width: 100%;
  }
}

@media (hover: hover) {
  .offer-header__link a:hover {
    opacity: 1;
    transition: opacity 0.75s cubic-bezier(.37,.53,.38,1);
  }
  .offer-header__link:hover:before{
    opacity: 1;
    transition: opacity 0.75s cubic-bezier(.37,.53,.38,1);
  }
}
</style>