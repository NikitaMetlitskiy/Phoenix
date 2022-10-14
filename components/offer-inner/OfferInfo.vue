<template>
  <div class="offer-info block-wrapper container" :class="{'offer-info_not-first': notFirst}" ref="container">
    <p v-if="date" class="offer-info__date p1" ref="date">{{date}}</p>
    <h1 v-if="title" class="offer-info__title h3" ref="title">{{title}}</h1>
    <p v-if="text1" class="offer-info__text p3" v-html="text1" ref="text1"></p>

    <ul class="offer-info__list">
      <li v-if="listTitle" class="offer-info__list-title h4" ref="listTitle">{{ listTitle }}</li>
      <li
        class="offer-info__list-item p1"
        v-for="(el, id) in listReasons"
        :key="id"
        ref="listText"
      >
        <span class="offer-info__list-item-number">
          {{ id > 9 ? id + 1 : `0${id + 1}` }}
        </span>
        <span class="offer-info__list-item-value">
          {{ el }}
        </span>
      </li>
    </ul>

    <p v-if="text2" class="offer-info__text p3" v-html="text2" ref="text2"></p>

    <div v-if="listSlider.length > 0" class="offer-info__slider block-wrapper" ref="slider">
      <ul class="swiper-wrapper">
        <li
          class="swiper-slide block-wrapper"
          v-for="(photo, index) in listSlider"
          :key="index"
        >
          <div class="img-wrapper" data-swiper-parallax-x='25%'>
            <img :src="photo" alt="photo" />
          </div>
        </li>
      </ul>

      <button class="swiper-button swiper-button-prev" ref="sliderPrev">
        <img src="/icons/arrow-prev.svg" alt="arrow-prev" />
        <span class="p1">{{$t('prev')}}</span>
      </button>

      <button class="swiper-button swiper-button-next" ref="sliderNext">
        <span class="p1">{{$t('next')}}</span>
        <img src="/icons/arrow-next.svg" alt="arrow-next" />
      </button>
    </div>

    <p v-if="text3" class="offer-info__text p3" v-html="text3" ref="text3"></p>
  </div>
</template>

<script>
import Swiper, { Navigation, Parallax } from "swiper";
import "swiper/swiper-bundle.css";
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
    text1: {
      type: String,
      default: "",
    },
    listTitle: {
      type: String,
      default: "",
    },
    listReasons: {
      type: Array,
      default: () => [],
    },
    text2: {
      type: String,
      default: "",
    },
    listSlider: {
      type: Array,
      default: () => [],
    },
    text3: {
      type: String,
      default: "",
    },
    notFirst: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    swiperReasons: null,
  }),
  methods: {
    initSwiper() {
      this.swiperAbout = new Swiper(this.$refs.slider, {
        slidesPerView: 1,
        speed: 800,
        loop: true,
        parallax: true,
        modules: [Navigation, Parallax],

        navigation: {
          nextEl: this.$refs.sliderNext,
          prevEl: this.$refs.sliderPrev,
        },
      });
    },
  },
  mounted() {
    this.initSwiper();

    this.$nextTick(() => {
      animateJS('scaleFullImage', document.querySelector(".offer-info__slider .swiper-slide[data-swiper-slide-index='0']"));

      if (this.$refs.title) {
        animateJS('splitTitleLeft', this.$refs.title);
      }
      if (this.$refs.date) {
        animateJS('fadeUp', this.$refs.date);
      }
      if (this.$refs.text1) {
        animateJS('fade', this.$refs.text1);
      }
      if (this.$refs.text2) {
        animateJS('fade', this.$refs.text2);
      }
      if (this.$refs.text3) {
        animateJS('fade', this.$refs.text3);
      }

      if (this.$refs.listTitle) {
        animateJS('splitTitleLeft', this.$refs.listTitle);
      }

      if (this.$refs.listText) {
        animateJS('splitText', this.$refs.listText);
      }
    });
  },
};
</script>

<style lang="scss" scoped>

.offer-info {
  @include pt-blueviolet;
  @include pb-thistle;
  min-height: 50vh;

  @include min(md) {
    @include pt-cornflowerblue;
    margin-left: auto;
    margin-right: 0;
    width: 50%;
    margin-top: calc(-1 * (var(--vh, 1vh) * 100));
    min-height: calc((var(--vh, 1vh) * 105));
  }
}
.offer-info__title {
  display: none;

  @include min(md) {
    @include mt-aquamarine;
    @include mb-cornflowerblue;
    display: block;
  }
}
.offer-info__date {
  display: none;

  @include min(md) {
    margin-top: 85px;
    display: block;
  }
  @include min(xl) {
    margin-top: 94px;
  }
  @include min(bg) {
    margin-top: 125px;
  }
}
.offer-info__list {
  @include mt-cornflowerblue;
  @include mb-cornflowerblue;
}
.offer-info__list-title {
  @include mb-crimson;
  width: 243px;

  @include min(tb) {
    width: 100%;
  }
}
.offer-info__list-item {
  display: flex;

  &:not(:last-child) {
    @include mb-gold;
  }
}
.offer-info__list-item-number {
  margin-right: 16px;

  @include min(xl) {
    margin-right: 32px;
  }
  @include min(bg) {
    margin-right: 44px;
  }
}
.offer-info__slider {
  @include mt-cornflowerblue;
  @include mb-cornflowerblue;
  height: 230px;
  position: relative;

  @include min(sm) {
    height: 350px;
  }
  @include min(tb) {
    height: 448px;
  }
  @include min(md) {
    height: 246px;
  }
  @include min(xl) {
    height: 360px;
  }
  @include min(bg) {
    height: 493px;
  }
}
.img-wrapper {
  width: 100%;
  height: 100%;
}
.swiper-button {
  padding: 0;
  width: auto;
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  color: #ffffff;
  position: absolute;
  z-index: 2;
  cursor: pointer;

  &:after {
    display: none;
  }

  span {
    display: none;
    line-height: 1;

    @include min(tb) {
      display: unset;
    }
    @include min(md) {
      display: none;
    }
  }

  img {
    width: 16px;
    height: 16px;
  }
}
.swiper-button-next {
  right: 16px;

  @include min(tb) {
    right: 24px;
  }
  @include min(md) {
    right: 16px;
  }
  @include min(xl) {
    right: 32px;
  }

  img {
    margin-left: 10px;
  }
}
.swiper-button-prev {
  left: 16px;

  @include min(tb) {
    left: 24px;
  }
  @include min(md) {
    left: 16px;
  }
  @include min(xl) {
    left: 32px;
  }

  img {
    margin-right: 10px;
  }
}

.offer-info_not-first{
  .offer-info__date{
    margin-top: 0;
  }
}
</style>