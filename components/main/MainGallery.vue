<template>
  <div class="main-gallery block-wrapper">
    <div class="main-gallery__title-wrapper">
      <p class="main-gallery__title h2 container" ref="title">{{title}}</p>
    </div>
    
    <div class="main-gallery__slideshow-wrap" ref="slideshowWrapper">
      <div class="main-gallery__slideshow-header">
        <div class="main-gallery__slideshow-header-gradient"></div>
        <div class="main-gallery__btn-wrap">
          <button 
            class="main-gallery__btn main-gallery__btn-left p1"
            :class="{'active': show === 'rooms'}"
            @click="changeView('rooms')"
            ref="btnLeft"
          >
            {{titleRooms}}
            <span class="main-gallery__btn-line main-gallery__btn-line_left"></span>
            <span class="main-gallery__btn-line main-gallery__btn-line_right"></span>
          </button>

          <button 
            class="main-gallery__btn main-gallery__btn-right p1"
            :class="{'active': show === 'chalets'}"
            @click="changeView('chalets')"
            ref="btnRight"
          >
            {{titleChalets}}
            <span class="main-gallery__btn-line main-gallery__btn-line_left"></span>
            <span class="main-gallery__btn-line main-gallery__btn-line_right"></span>
          </button>
        </div>
      </div>

      <div class="my-swiper" ref="mySwiper">
        <div class="main-gallery__slideshow-img swiper-wrapper">
          <div
            v-for="(item, index) in sliderListData"
            :key="index"
            class="swiper-slide block-wrapper"
          >
            <div class="img-wrapper" data-swiper-parallax-x='25%'>
              <img :src="`${getApiUrl()}${item?.attributes?.Main_room?.Room_cover_background?.data?.attributes?.url}`" alt="imageSlide"/>
            </div>
          </div>
        </div>
      </div>

      <div class="main-gallery__info-wrapper" ref="infoWrapper">
        <div class="main-gallery__info block-wrapper" ref="infoBlock">
          <div class="swiper-wrapper">
            <div
              v-for="(item, index) in sliderListData"
              :key="index"
              class="swiper-slide"
            >
              <div class="main-gallery__info-header-wrapper" ref="infoHeaderWrapper">
                <div class="main-gallery__info-header">
                  <div class="main-gallery__info-header-top">
                    <div class="main-gallery__info-title h4">{{item?.attributes?.Main_room?.Title_room}}</div>

                    <div class="main-gallery__info-header-bottom main-gallery__info-header-bottom--desktop">
                      <div
                        v-for="(el, id) in item?.attributes?.Main_room?.Includes"
                        :key="id"
                        class="main-gallery__info-text-wrap"
                      >
                        <div class="main-gallery__info-text p1">{{el?.Include}}</div>
                      </div>
                      <div class="main-gallery__info-text main-gallery__info-text-price p1">
                        {{$t('from')}} {{item?.attributes?.Main_room?.Price}} / {{$t('night')}}
                      </div>
                    </div>

                    <div class="main-gallery__info-title-right">
                      <NuxtLink class="a1 hover-linear-dark" :to="localePath(`/accommodations/${item?.attributes?.Slug}`)">{{$t('book now')}}</NuxtLink>
                    </div>
                  </div>

                  <div class="main-gallery__info-header-bottom main-gallery__info-header-bottom--mobile">
                    <div
                      v-for="(el, id) in item?.attributes?.Main_room?.Includes"
                      :key="id"
                      class="main-gallery__info-text-wrap"
                    >
                      <div class="main-gallery__info-text p1">{{el?.Include}}</div>
                    </div>
                    <div class="main-gallery__info-text main-gallery__info-text-price p1">
                      {{$t('from')}} {{item?.attributes?.Main_room?.Price}} / {{$t('night')}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="main-gallery__info-body"></div>
        </div>

        <div class="swiper-buttons">
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

      <div class="main-gallery__view-all-btn" ref="btn">
        <NuxtLink class="a1 hover-linear-white" :to="localePath(`/accommodations?part=rooms`)">
          {{$t('view all')}}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { animateJS } from "~/plugins/animations";
import Swiper, { Navigation, EffectFade, Controller, Parallax } from 'swiper';
import "swiper/swiper-bundle.css";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    titleRooms: {
      type: String,
      default: "",
    },
    titleChalets: {
      type: String,
      default: "",
    },
    dataRooms: {
      type: Array,
      default: () => [],
    },
    dataChalets: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    show: 'rooms',
    sliderListData: null,
    swiperImages: null,
    swiperData: null,
  }),
  methods: {
    mobileHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    changeView(value) {
      this.show = value;
      this.fadeChangeCategories();

      if(this.show === 'rooms') {
        this.swiperImages.destroy();
        this.swiperData.destroy();
        this.sliderListData = this.dataRooms;
        setTimeout(this.initSwiper, 600);
        animateJS('fade', this.$refs.mySwiper);
      } else {
        this.swiperImages.destroy();
        this.swiperData.destroy();
        this.sliderListData = this.dataChalets;
        setTimeout(this.initSwiper, 600);
        animateJS('fade', this.$refs.mySwiper);
      }
    },
    initSwiper() { 
      this.swiperImages = new Swiper(".my-swiper", {
        slidesPerView: 1,
        speed: 1200,
        parallax: true,
        loop: true,
        controller: true,
        modules: [Navigation, Controller, Parallax],
        
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

      this.swiperData = new Swiper(".main-gallery__info", {
        slidesPerView: 1,
        speed: 1200,
        loop: true,
        allowTouchMove: false,
        controller: true,
        effect: 'fade',
        modules: [Controller, EffectFade],
      });

      this.swiperImages.controller.control = this.swiperData;

      this.swiperImages.on('slideChange', function () {
        document.querySelectorAll(".my-swiper .swiper-slide:not(.swiper-slide-active) img").forEach(el => {
          el.removeAttribute('style');
        });
      });
    },
    fadeChangeCategories(){
      const {slideshowWrapper, infoBlock, infoWrapper, mySwiper} = this.$refs;
      const currentImage = mySwiper.querySelector(".swiper-slide-active").querySelector("img");

      const tempImage = document.createElement("div");
      tempImage.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('${currentImage.src}');
        background-size: cover;
        background-position: center;
        opacity: 1;
        transition: opacity 1s linear;
      `;

      slideshowWrapper.insertBefore(tempImage, infoWrapper);

      const header = infoWrapper.querySelector(".swiper-slide-active");
      const headerRect = header.getBoundingClientRect();
      const tempHeader = header.cloneNode(true);

      tempHeader.style.cssText = `
        position: absolute;
        top: ${infoBlock.offsetTop}px;
        left: ${headerRect.left}px;
        height: ${headerRect.height}px;
        width: ${headerRect.width}px;
        opacity: 1;
        z-index: 20;
        transition: opacity 1s linear;
      `;

      slideshowWrapper.insertBefore(tempHeader, infoWrapper);

      setTimeout(() => {
        tempImage.style.opacity = 0;
        tempHeader.style.opacity = 0;
      }, 700);
      setTimeout(() => {
        tempImage.remove();
        tempHeader.remove();
      }, 1700);
    }
  }, 
  mounted() {
    this.mobileHeight();

    if(this.show === 'rooms') {
      this.sliderListData = this.dataRooms;
    } else {
      this.sliderListData = this.dataChalets;
    }

    setTimeout(() => {
      this.initSwiper();
      document.querySelectorAll(".my-swiper .swiper-slide:not(.swiper-slide-active) img").forEach(el => el.style.transform = 'scale(1)');

      animateJS('scaleFullImage', document.querySelector(".my-swiper .swiper-slide[data-swiper-slide-index='0']"));
    }, 300);

    this.$nextTick(() => {
      const btns = [this.$refs.btnLeft, this.$refs.btnRight];

      if (btns) {
        animateJS('fadeUp', btns);
      }

      if (this.$refs.title) {
        animateJS('splitTitleLeft', this.$refs.title);
      }

      if (this.$refs.btn) {
        animateJS('fadeUp', this.$refs.btn);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/utilities/indents";

.main-gallery__title-wrapper {
  @include pt-aquamarine;
  @include pb-aquamarine;
  background: $grey-color;
  text-align: center;
}
.main-gallery__title {
  width: 100%;
  text-align: center;

  @include min(md) {
    width: 83%;
  }
  @include min(xl) {
    width: 87%;
  }
}
.main-gallery__slideshow-wrap {
  @include pb-cornflowerblue;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}
.main-gallery__slideshow-header {
  display: flex;
  // border-bottom: 1px solid rgba(255, 255, 255, .3);
  position: relative;
  z-index: 10;
}
.main-gallery__slideshow-header::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  width: 1px;
  height: 100%;
  background: rgba(255, 255, 255, .3);
}
.main-gallery__slideshow-header-gradient{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 29.57%);
  z-index: -1;
}
.main-gallery__btn-wrap {
  @include pt-darkgreen;
  @include pb-darkgreen;
  width: 50%;
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.main-gallery__btn {
  position: relative;
  text-align: center;
  border: none;
  padding: 0;
  background: transparent;
  color: #FFFFFF;
}
.main-gallery__btn.active::before {
  content: '';
  width: 100%;
  height: 1px;
  position: absolute;
  bottom: 0;
  background-color: #FFFFFF;
  transition: width .3s ease-in;
}
.main-gallery__btn.active:after {
  content: '';
  position: absolute;
  z-index: 5;
  left: 50%;
  bottom: -27px;
  transform: rotate(45deg) translateX(-50%);
  width: 6.5px;
  height: 6.5px;
  border-bottom: 1px solid #FFF;
  border-right: 1px solid #FFF;
  background-color: transparent;

  @include min(xl) {
    bottom: -30px;
  }
  @include min(bg) {
    bottom: -39px;
  }
}
.main-gallery__btn.active .main-gallery__btn-line{
  position: absolute;
  height: 1px;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.3);
  bottom: -21px;

  &_left{
    right: calc(50% + 5px);
  }
  &_right{
    left: calc(50% + 7px);
  }

  @include min(xl){
    bottom: -25px;
  }
  @include min(bg){
    bottom: -33px;
  }
}
.my-swiper {
  width: 100%;
  height: 100%;
  overflow: hidden;

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .swiper-wrapper {
    scroll-behavior: smooth;
  }

  img {
    width: 100%;
    height: 100%;
    will-change: transform;
    transition-duration: 0.9s;
  }

  .swiper-slide,
  .swiper-slide-duplicate,
  .swiper-slide-prev,
  .swiper-slide-next,
  .swiper-slide-duplicate-prev,
  .swiper-slide-duplicate-next {
    will-change: transform;

    img {
      transform: scale(1.15);
    }
  }

  .swiper-slide-active,
  .swiper-slide-duplicate-active {
    img {
      will-change: transform;
      transform: scale(1);
      transition: transform 1.2s cubic-bezier(.37,.53,.38,1);
    }
  }
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
  overflow: hidden;
}
.swiper-buttons{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 34px;
}
.swiper-button {
  padding: 0;
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  color: #FFFFFF;
  position: relative;
  z-index: 11;
  // top: calc(81% + 12px);
  // bottom: 32px;

  overflow: hidden;

  @include min(tb) {
    position: absolute;
    top: 50%;
    bottom: unset;
  }

  &:after {
    display: none;
  }

  span {
    line-height: 1;
    transition: transform 0.3s ease 0.06s;
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
  // right: 18px;

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
  // left: 18px;

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
.main-gallery__slideshow-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.main-gallery__info-wrapper{
  margin: auto 18px;
}
.main-gallery__info {
  // margin: auto 18px;
  max-width: 100%;
  position: relative;
  z-index: 11;

  @include min(tb) {
    margin: auto;
    max-width: 467px;
  }  
  @include min(md) {
    max-width: 627px;
  }  
  @include min(bg) {
    max-width: 1096px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .swiper-wrapper {
    margin: auto;
    width: 100%;
    scroll-behavior: smooth;
  }

  .swiper-slide,
  .swiper-slide-duplicate,
  .swiper-slide-prev,
  .swiper-slide-next,
  .swiper-slide-duplicate-prev,
  .swiper-slide-duplicate-next {
    will-change: transform;
    .main-gallery__info-header {
      opacity: 0;
    }
  }

  .swiper-slide-active,
  .swiper-slide-duplicate-active {
    .main-gallery__info-header {
      opacity: 1;
      transition: 0.2s opacity 0.3s cubic-bezier(.37,.53,.38,1);
    }
  }
}
.main-gallery__info-header-wrapper {
  background-color: $grey-color;
}
.main-gallery__info-header {
  padding: 0 16px;
  padding-top: 8px;
  @include pb-gold;
  position: relative;

  @include min(md) {
    padding-top: 16px;
    @include pb-darkgreen;
  }
}
.main-gallery__info-header-top {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.main-gallery__info-title {
  @include min(md) {
    flex: 0 0 47%;
  }
}
.main-gallery__info-title-right {
  display: inline-block;
  
  a {
    width: max-content;
    display: inline-block;
  }

  @include min(md) {
    order: 3;
  }
}
.main-gallery__info-header-bottom {
  @include pt-gold;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  &--mobile {
    display: flex;

    position: relative;
    flex-direction: column;
    align-items: flex-start;

    @include min(tb){
      flex-direction: row;
      align-items: flex-end;
    }
    @include min(md) {
      display: none;
    }
  }
  &--desktop {
    display: none;

    @include min(md) {
      display: flex;
    }
  }

  @include min(md) {
    padding-top: 0;
    margin-left: 0;
    margin-right: auto;
    order: 2;
    flex-direction: column;
    align-items: flex-start;
  }
}
.main-gallery__info-text-price {
  position: absolute;
  bottom: 0;
  right: 0;
  @include min(tb){
    position: static;
  }
  @include min(md) {
    margin-top: 16px;
  }
}
.main-gallery__info-body {
  height: 44vh;
  border-width: 0px 6px 6px;
  border-style: solid;
  border-color: $grey-color;

  @include min(md) {
    border-width: 0px 8px 8px;
  }
  @include min(xl) {
    height: 50vh;
  }
}
.main-gallery__view-all-btn {
  margin-left: auto;
  margin-right: auto;
  background: transparent;
  border: none;
  padding: 0;
  color: #FFFFFF;

  position: relative;
  z-index: 12;
}
</style>