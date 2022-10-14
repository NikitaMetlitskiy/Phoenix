<template>
  <div class="choose-card">
    <div class="choose-card__big-image block-wrapper">
      <ul class="swiper-wrapper">
        <li
          class="swiper-slide block-wrapper"
          v-for="(item, id) in gallery"
          :key="id"
        >
          <div class="img-wrapper"
            data-swiper-parallax-x='25%'
          >
            <img :src="`${getApiUrl()}${item?.attributes?.url}`" alt="imageSlide"/>
          </div>
        </li>
      </ul>

      <div class="swiper-pagination"></div>

      <button class="swiper-button swiper-button-prev">
        <img src="/icons/arrow-prev.svg" alt="arrow-prev"/>
        <span class="p1">{{$t('prev')}}</span>
      </button>
      
      <button class="swiper-button swiper-button-next">
        <span class="p1">{{$t('next')}}</span>
        <img src="/icons/arrow-next.svg" alt="arrow-next"/>
      </button>
    </div>

    <div class="choose-card__inner container">
      <h2 class="choose-card__title h3" ref="title">{{ title }}</h2>

      <p class="choose-card__id">{{ id }}</p>

      <p class="choose-card__text p1" ref="text">{{ text }}</p>

      <ul class="choose-card__list">
        <li
          class="choose-card__list-item"
          v-for="(el, index) in details"
          :key="index"
          ref="card"
        >
          <p class="choose-card__list-item-name p1">{{ el.Include_description }}</p>
          <p class="choose-card__list-item-value p1">{{ el.Include }}</p>
        </li>
      </ul>

      <div class="choose-card__btn" ref="btn">
        <p class="a1">{{ btnText }}</p>

        <div class="choose-card__btn-inner">
          <button class="choose-card__btn--plus p1" @click="removeCounter">-</button>
          <span class="choose-card__btn--counter p1" ref="counter">
            {{ counter >= 10 ? counter : `0${counter}` }}
          </span>
          <button class="choose-card__btn--minus p1" @click="addCounter">+</button>
        </div>
      </div>

      <p class="choose-card__price h4" ref="price">
        {{$t('from')}} <span>{{price}}</span>
      </p>
    </div>

    <CircleBtn 
      class="choose-card__circle-btn"
      :textBtn="circleBtnText"
      :linkBtn="circleBtnLink"
    />
  </div>
</template>

<script>
import CircleBtn from "~/components/common/CircleBtn.vue";
import { parallaxImage, animateJS } from "~/plugins/animations";
import Swiper, { Navigation, Pagination, Parallax } from 'swiper';
import "swiper/swiper-bundle.css";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default {
  components: { CircleBtn },
  props: {
    gallery: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      default: null,
    },
    text: {
      type: String,
      default: "",
    },
    btnText: {
      type: String,
      default: "",
    },
    details: {
      type: Array,
      default: () => [],
    },
    circleBtnText: {
      type: String,
      default: "",
    },
    circleBtnLink: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    counter: 1,
  }),
  methods: {
    initSwiper() { 
      this.swiperAbout = new Swiper(".choose-card__big-image", {
        slidesPerView: 1,
        speed: 1200,
        parallax: true,
        loop: true,
        modules: [Navigation, Pagination, Parallax],

        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }); 
    },
    addCounter() {
      this.counter++
    },
    removeCounter() {
      this.counter <= 1 ? this.counter = 1 : this.counter--;
    },
  },
  mounted() {
    this.initSwiper();
  },
};
</script>

<style lang="scss" scoped>

.choose-card {
  @include pb-thistle;
  position: relative;

  @include min(md) {
    padding-bottom: 0;
    display: flex;
    justify-content: space-between;
  }
}
.choose-card__big-image {
  height: 300px;
  position: relative;

  @include min(tb) {
    height: 525px;
  }
  @include min(md) {
    flex: 0 0 57%;
    height: 500px;
  }
  @include min(xl) {
    height: 545px;
  }
  @include min(bg) {
    height: 728px;
  }

  .swiper-wrapper {
    width: 100%;
  }
  .swiper-slide {
    height: 100%;
  }
  .img-wrapper {
    width: 100%;
    height: 100%;
  }
  .swiper-pagination {
    @include mb-crimson;
    margin-left: auto;
    margin-right: auto;
    width: 43%;
    height: 2px;
    top: unset;
    bottom: 0;
    right: 0;

    @include min(tb) {
      width: 33%;
    }
    @include min(lg) {
      width: 25%;
    }

    &-progressbar {
      background-color: rgba(#FFFFFF, 0.3);
    }
  }
  .swiper-button {
    padding: 0;
    width: auto;
    display: flex;
    align-items: center;
    border: none;
    background: transparent;
    color: #FFFFFF;
    position: absolute;
    z-index: 2;
    cursor: pointer;

    &:after {
      display: none;
    }

    span {
      display: none;
      line-height: 1;

      @include min(md) {
        display: unset;
      }
    }

    img {
      height: auto;
    }
  }
  .swiper-button-next {
    right: 18px;

    @include min(tb) {
      right: 40px;
    }
    @include min(md) {
      right: 48px;
    }
    @include min(xl) {
      right: 64px;
    }
    @include min(bg) {
      right: 80px;
    }

    img {
      margin-left: 10px;

      @include min(bg) {
        margin-left: 16px;
      }
    }
  }
  .swiper-button-prev {
    left: 18px;

    @include min(tb) {
      left: 40px;
    }  
    @include min(md) {
      left: 48px;
    }
    @include min(xl) {
      left: 64px;
    }
    @include min(bg) {
      left: 80px;
    }

    img {
      margin-right: 10px;

      @include min(bg) {
        margin-right: 16px;
      }
    }
  }
}
.swiper-horizontal > .swiper-pagination-progressbar::v-deep .swiper-pagination-progressbar-fill {
  background: rgba(#FFFFFF, 0.5) !important;
}
.choose-card__inner {
  position: relative;

  @include min(md) {
    flex: 0 0 43%;
  }
}
.choose-card__title {
  @include mt-cornflowerblue;
  @include mb-cornflowerblue;
  margin-left: 0;
  width: 248px;

  @include min(md) {
    width: 100%;
  }
  @include min(xl) {
    width: 319px;
  }
  @include min(bg) {
    width: 355px;
  }
}
.choose-card__id {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  z-index: -1;
}
.choose-card__text {
  width: 90%;

  @include min(tb) {
    width: 50%;
  }
  @include min(md) {
    width: 301px;
  }
  @include min(xl) {
    width: 319px;
  }
  @include min(bg) {
    width: 411px;
  }
}
.choose-card__list {
  @include mt-cornflowerblue;
}
.choose-card__list-item {
  display: flex;

  &:not(:last-child) {
    @include mb-olive;
  }
}
.choose-card__list-item-name {
  width: 150px;

  @include min(bg) {
    width: 181px;
  }
}
.choose-card__list-item-value {
  margin-left: 36px;

  @include min(bg) {
    margin-left: 45px;
  }
}
.choose-card__btn {
  @include mt-antiquewhite;
  display: flex;
  align-items: center;

  p {
    width: 150px;

    @include min(bg) {
      width: 181px;
    }
  }
}
.choose-card__btn-inner {
  margin-left: 14px;
  display: flex;

  @include min(bg) {
    margin-left: 29px;
  }
}
.choose-card__btn--plus,
.choose-card__btn--minus {
  min-width: 7px;
}
.choose-card__btn--counter {
  margin-left: 16px;
  margin-right: 16px;
  width: 18px;
}
.choose-card__price {
  @include mt-cornflowerblue;

  @include min(tb) {
    position: absolute;
    bottom: 0;
    right: 40px;
  }
  @include min(md) {
    position: static;
  }
}
.choose-card__circle-btn {
  overflow: visible;
  position: absolute;
  z-index: 3;
  right: 18px;
  top: 265px;

  @include min(tb) {
    right: 40px;
    top: 386px;
  }
  @include min(md) {
    bottom: -70px;
  }
  @include min(xl) {
    bottom: 30px;
  }
  @include min(bg) {
    bottom: 77px;
  }
}
.choose-card.left-side {
  background-color: rgba(217, 217, 217, 0.3);

  // &:last-child {
  //   @include mb-thistle;
  // }

  @include min(md) {
    .choose-card__circle-btn {
      right: 48px;
    }
  }
  @include min(xl) {
    .choose-card__circle-btn {
      right: 37px;
    }
  }
  @include min(bg) {
    .choose-card__circle-btn {
      right: 80px;
    }
  }
}
.choose-card.right-side {
  @include min(md) {
    @include pt-thistle;
    @include pb-thistle;
    flex-direction: row-reverse;

    .choose-card__circle-btn {
      top: 530px;
      left: 23%;
    }
  }
  @include min(xl) {
    .choose-card__circle-btn {
      top: 475px;
      left: calc(43% - 226px);
    }
  }
  @include min(bg) {
    .choose-card__circle-btn {
      top: 602px;
      left: calc(43% - 300px);
    }
  }
}
</style>