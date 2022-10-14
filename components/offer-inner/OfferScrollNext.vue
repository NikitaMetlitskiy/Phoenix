<template>
  <div class="offer-scroll container">
    <div v-if="offerBg" class="offer-scroll__bg block-wrapper">
      <img :src="offerBg" alt="HeaderImg" ref="imageBg" />
    </div>

    <div class="offer-scroll__text" ref="text">
      <nuxt-link
        v-if="linkText"
        class="hover-nonlinear-white p1"
        :to="localePath(`/special-offers/${linkValue}`)"
      >{{linkText}}</nuxt-link>
    </div>

    <div class="offer-scroll__inner block-wrapper">
      <h2 v-if="title" class="offer-scroll__title h3" ref="title">{{title}}</h2>
      <p v-if="date" class="offer-scroll__date p1" ref="date">{{date}}</p>
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
    linkText: {
      type: String,
      default: "",
    },
    linkValue: {
      type: String,
      default: "",
    },
  },
  mounted() {
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

      if (this.$refs.text) {
        animateJS('splitText', this.$refs.text);
      }
    });
  }
};
</script>

<style lang="scss" scoped>

.offer-scroll {
  @include pt-cornflowerblue;
  @include pb-cornflowerblue;
  margin-top: 64px;
  height: 339px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #FFFFFF;
  position: relative;

  @include min(sm) {
    height: 490px;
  }
  @include min(tb) {
    margin-top: 85px;
    height: 692px;
  }
  @include min(xl) {
    margin-top: 94px;
    height: 650px;
  }
  @include min(bg) {
    margin-top: 125px;
    height: 947px;
  }
}
.offer-scroll__bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  @include min(md) {
    width: 50%;
  }
}
.offer-scroll__text,
.offer-scroll__title,
.offer-scroll__date {
  position: relative;
  z-index: 2;
}
.offer-scroll__inner {
  margin-top: auto;

  @include min(md) {
    margin-top: 0;
    margin-left: 50%;
    width: calc(50% - 96px);
    display: flex;
    flex-direction: column-reverse;
    color: $black-color;
    position: absolute;
    top: 0;
  }
  @include min(xl) {
    width: calc(50% - 128px);
  }
  @include min(bg) {
    width: calc(50% - 160px);
  }
}
.offer-scroll__title {
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
.offer-scroll__date {
  @include mt-antiquewhite;

  @include min(md) {
    @include mt-cornflowerblue;
    width: 100%;
  }
}
.offer-scroll__text {
  a {
    opacity: 0.5;
    transition: opacity 0.75s cubic-bezier(.37,.53,.38,1);
  }
}

@media (hover: hover) {
  .offer-scroll__text a:hover {
    opacity: 1;
    transition: opacity 0.75s cubic-bezier(.37,.53,.38,1);
  }
}
</style>