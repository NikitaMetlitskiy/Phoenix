<template>
  <div class="accommodation-slider">
    <p v-if="title" class="accommodation-slider__title h2 container block-wrapper" ref="title">{{ title }}</p>

    <div v-if="featuresList" class="accommodation-slider__inner block-wrapper">
      <ul class="accommodation-slider__list swiper-wrapper">
        <li
          class="accommodation-slider__list-item swiper-slide block-wrapper"
          v-for="(item, id) in featuresList"
          :key="id"
        >
          <div class="img-wrapper" data-swiper-parallax-x='25%'>
            <img
              class="accommodation-slider__list-item-img"
              :src="item"
              alt="image"
            />
          </div>
        </li>
      </ul>

      <div class="swiper-pagination"></div>

      <button class="swiper-button swiper-button-prev">
        <img src="/icons/arrow-prev.svg" alt="arrow-prev" />
        <span class="p1">{{$t('prev')}}</span>
        <img class="swiper-button__hover-image" src="/icons/arrow-prev.svg" alt="arrow-prev"/>
      </button>

      <button class="swiper-button swiper-button-next">
        <img class="swiper-button__hover-image" src="/icons/arrow-next.svg" alt="arrow-next"/>
        <span class="p1">{{$t('next')}}</span>
        <img src="/icons/arrow-next.svg" alt="arrow-next" />
      </button>
    </div>
  </div>
</template>

<script>
import { animateJS } from "~/plugins/animations";
import Swiper, { Navigation, Pagination, Parallax } from "swiper";
import "swiper/swiper-bundle.css";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    featuresList: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    swiperAccommodation: null,
  }),
  methods: {
    initSwiper() {
      this.swiperAccommodation = new Swiper(".accommodation-slider__inner", {
        slidesPerView: 1,
        speed: 1200,
        loop: true,
        parallax: true,
        modules: [Navigation, Pagination, Parallax],

        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    },
  },
  mounted() {
    this.initSwiper();

    this.$nextTick(() => {
      animateJS('splitTitleLeft', this.$refs.title);
      animateJS('scaleFullImage', document.querySelector(".accommodation-slider__inner .swiper-slide[data-swiper-slide-index='0']"));
    });
  },
};
</script>

<style lang="scss" scoped>
.accommodation-slider {
  background-color: $grey-color;
}
.accommodation-slider__title {
  @include pt-thistle;
  @include pb-thistle;
  text-align: center;

  @include min(bg) {
    margin-left: auto;
    margin-right: auto;
    width: 75%;
  }
}
.accommodation-slider__inner {
  height: 300px;
  position: relative;

  @include min(sm) {
    height: 440px;
  }
  @include min(tb) {
    height: 656px;
  }
  @include min(md) {
    height: 696px;
  }
  @include min(xl) {
    height: 744px;
  }
  @include min(bg) {
    height: 991px;
  }
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
.swiper-horizontal > .swiper-pagination-progressbar::v-deep .swiper-pagination-progressbar-fill {
  background: rgba(#FFFFFF, 0.5) !important;
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

  overflow: hidden;

  &:after {
    display: none;
  }

  span {
    display: none;
    line-height: 1;
    transition: transform 0.3s ease 0.06s;

    @include min(tb) {
      display: unset;
    }
  }

  img {
    width: 14px;
    height: 14px;
    transition: transform 0.3s ease 0.09s;

    @include min(tb) {
      width: 	unset;
      height: auto;
    }
  }
}
.swiper-button__hover-image{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: transform 0.3s ease 0.03s;
  display: none;

  @include min(lg){
    display: block;
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

  & .swiper-button__hover-image{
    right: calc(100% + 10px);

    @include min(bg){
      right: calc(100% + 16px);
    }
  }

  &:hover{
    @include min(lg){
      img{
        transform: translateX(27px);
        transition: transform 0.3s ease 0.03s;
      }
      .swiper-button__hover-image{
        transform: translate(27px, -50%);
        transition: transform 0.3s ease 0.09s;
      }
      span{
        transform: translateX(27px);
      }
    }
    @include min(bg){
      img{
        transform: translateX(33px);
        transition: transform 0.3s ease 0.03s;
      }
      .swiper-button__hover-image{
        transform: translate(33px, -50%);
        transition: transform 0.3s ease 0.09s;
      }
      span{
        transform: translateX(33px);
      }
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

  & .swiper-button__hover-image{
    left: calc(100% + 10px);

    @include min(bg){
      left: calc(100% + 16px);
    }
  }

  &:hover{
    @include min(lg){
      img{
        transform: translateX(-27px);
        transition: transform 0.3s ease 0.03s;
      }
      .swiper-button__hover-image{
        transform: translate(-27px, -50%);
        transition: transform 0.3s ease 0.09s;
      }
      span{
        transform: translateX(-27px);
      }
    }
    @include min(bg){
      img{
        transform: translateX(-33px);
        transition: transform 0.3s ease 0.03s;
      }
      .swiper-button__hover-image{
        transform: translate(-33px, -50%);
        transition: transform 0.3s ease 0.09s;
      }
      span{
        transform: translateX(-33px);
      }
    }
  }
}
</style>