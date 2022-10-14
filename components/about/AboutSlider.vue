<template>
  <div v-if="data" class="about-slider">
    <div class="about-slider-container block-wrapper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide block-wrapper"
          v-for="(item, id) in data"
          :key="id"
        >
          <div class="img-wrapper"
            data-swiper-parallax-x='25%'
          >
            <img :src="`${getApiUrl()}${item?.attributes?.url}`" alt="imageSlide"/>
          </div>
        </div>
      </div>

      <button class="swiper-button swiper-button-prev">
        <img src="/icons/arrow-prev.svg" alt="arrow-prev"/>
        <span class="p1">{{$t('prev')}}</span>
        <img class="swiper-button__hover-image" src="/icons/arrow-prev.svg" alt="arrow-prev"/>
      </button>
      
      <button class="swiper-button swiper-button-next">
        <img class="swiper-button__hover-image" src="/icons/arrow-next.svg" alt="arrow-next"/>
        <span class="p1">{{$t('next')}}</span>
        <img src="/icons/arrow-next.svg" alt="arrow-next"/>
      </button>
    </div>
  </div>
</template>

<script>
import { animateJS } from "~/plugins/animations";
import Swiper, { Navigation, Parallax } from 'swiper';
import "swiper/swiper-bundle.css";

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    swiperAbout: null,
  }),
  methods: {
    initSwiper() { 
      this.swiperAbout = new Swiper(".about-slider-container", {
        slidesPerView: 1,
        speed: 1200,
        parallax: true,
        loop: true,
        modules: [Navigation, Parallax],
        
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }); 
    },
  },
  mounted() {
    this.initSwiper();

    this.$nextTick(() => {
      animateJS('scaleFullImage', document.querySelector(".about-slider-container .swiper-slide[data-swiper-slide-index='0']"));
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/utilities/indents";

.about-slider {
  height: 300px;

  @include min(sm) {
    height: 450px;
  }  
  @include min(tb) {
    height: 658px;
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
.about-slider-container {
  width: 100%;
  height: 100%;
  position: relative;

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
}
</style>