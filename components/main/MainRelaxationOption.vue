<template>
  <div class="main-relaxation-option">
    <div class="main-relaxation-option__title h2 container block-wrapper" ref="title">
      <!-- <span class="main-relaxation-option__title-word main-relaxation-option__title-word--1">{{data?.Title_1}}</span> -->
      <span class="main-relaxation-option__title-word main-relaxation-option__title-word--1">{{data?.Title_1}}</span>
      <span class="main-relaxation-option__title-word main-relaxation-option__title-word--wrap" :class="{'offset': titleOffset}">
        <!-- <span class="main-relaxation-option__title-word--2">{{data?.Title_2_left}}</span> -->
        <span class="main-relaxation-option__title-word--2" :class="{'offset': titleOffset}">{{data?.Title_2_left}}</span>
        <!-- <span class="main-relaxation-option__title-word--3">{{data?.Title_3_right}}</span> -->
        {{`${data?.Title_3_right} ${data?.Title_4_right}`}}
      </span>
      <!-- <span class="main-relaxation-option__title-word main-relaxation-option__title-word--4">{{data?.Title_4_right}}</span> -->
    </div>
    
    <div class="main-relaxation-option__swiper container block-wrapper">
      <div class="swiper-wrapper" ref="cardsContainer">
        <div 
          v-for="(card, index) in data?.Special_offer_card"
          :key="index"
          class="main-relaxation-option__card swiper-slide"
          ref="card"
        >
          <div class="main-relaxation-option__card-svg block-wrapper">
            <img :src="`${getApiUrl()}${card?.Svg_under_photo?.data?.attributes?.url}`" :alt="`${card?.Title_special_offer}-icon`" ref="iconImage" />
          </div>

          <svg class="main-relaxation-option__line" width="2" height="32" viewBox="0 0 2 32" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" ref="line">
            <!-- <path opacity="0.16" d="M0.5 2.18557e-08L0.5 2.66667L1.5 2.66667L1.5 -2.18557e-08L0.5 2.18557e-08ZM0.5 8L0.500001 13.3333L1.5 13.3333L1.5 8L0.5 8ZM0.500001 18.6667L0.500001 24L1.5 24L1.5 18.6667L0.500001 18.6667ZM0.500001 29.3333L0.500001 32L1.5 32L1.5 29.3333L0.500001 29.3333Z" fill="#363735"/> -->
            <line opacity="0.16" x1="1" y1="0" x2="1" y2="32" stroke="#363735" stroke-width="1" stroke-dasharray="3 3" />
          </svg>

          <div class="main-relaxation-option__card-img block-wrapper">
            <img :src="`${getApiUrl()}${card?.Photo?.data?.attributes?.url}`" :alt="`${card?.Title_special_offer}-image`" />
          </div>

          <p class="main-relaxation-option__card-title h4">{{card?.Title_special_offer}}</p>
          <p class="main-relaxation-option__card-text decor-text p1">{{card?.Discription_special_offer}}</p>
        </div>
      </div>

      <div class="swiper-buttons">
        <button class="swiper-button swiper-button_prev">
          <div class="swiper-button__arrow"></div>
        </button>
        <button class="swiper-button swiper-button_next">
          <div class="swiper-button__arrow"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { animateJS } from "~/plugins/animations";
import Swiper, {Navigation} from 'swiper';
import "swiper/swiper-bundle.css";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    swiperImages: null,
    optionTitle: "Your visit to phoenix can be as high energy or calming",
    cards: [
      {
        id: 1,
        title: "rental",
        svg: require("~/static/icons/house.svg"),
        img: require("~/static/images/main/relaxation-option1.jpg"),
        text: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        id: 2,
        title: "Wellness, SPA",
        svg: require("~/static/icons/house.svg"),
        img: require("~/static/images/main/relaxation-option2.jpg"),
        text: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        id: 3,
        title: "Game room",
        svg: require("~/static/icons/house.svg"),
        img: require("~/static/images/main/relaxation-option3.jpg"),
        text: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        id: 4,
        title: "Wellness, SPA",
        svg: require("~/static/icons/house.svg"),
        img: require("~/static/images/main/relaxation-option4.jpg"),
        text: "Lorem ipsum dolor sit amet, consectetur",
      },
    ],
    titleOffset: false
  }),
  methods: {
    initSwiper() { 
      this.swiperImages = new Swiper(".main-relaxation-option__swiper", {
        slidesPerView: 1.2,
        spaceBetween: 12,
        allowTouchMove: true,
        modules: [Navigation],
        
        navigation: {
          nextEl: '.swiper-button_next',
          prevEl: '.swiper-button_prev',
        },

        breakpoints: {
          576: {
            slidesPerView: 1.7,
          },
          768: {
            slidesPerView: 2.3,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 3,
            allowTouchMove: false,
          }
        },
      }); 
    },
    translateCards() {
      const items = this.$refs.card;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.cardsContainer,
        },
      });

      tl.from(this.$refs.cardsContainer, {
        delay: 0,
        duration: 1,
        opacity: 0,
        xPercent: 110,
      });

      ScrollTrigger.batch(items, {
        onEnter: (elements) => {
          gsap.from(elements, {
            delay: 0.2,
            duration: 1,
            xPercent: 100,
            stagger: 0.25,
            ease: "power3.easeOut",
          });
        },
        once: true,
      });
    },
    offsetTitle(){
      if(window.innerWidth < 1280) return;

      const titlePadding = parseInt(getComputedStyle(document.querySelector(".main-relaxation-option__title")).paddingLeft);
      const titleLeftPart = document.querySelector(".main-relaxation-option__title-word--2");
      const offset = Math.max(titleLeftPart.getBoundingClientRect().right - titlePadding, 320);

      document.documentElement.style.setProperty('--relaxationTitleOffset', `${offset}px`);

      this.titleOffset = true;
    }
  }, 
  mounted() {
    this.initSwiper();
    this.translateCards();
    this.offsetTitle();

    this.$nextTick(() => {
      animateJS('splitTitleLeft', this.$refs.title);
      animateJS('fadeImage', this.$refs.iconImage);
      animateJS('line-vr', this.$refs.line);
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/utilities/indents";

.main-relaxation-option {
  @include pt-aquamarine;
  @include pb-aquamarine;

  background: $white-color;
}
.main-relaxation-option__title {
  @include mb-blueviolet;
  margin-left: 0;

  @include min(tb) {
    max-width: 92%;
  }
  @include min(md) {
    max-width: 79%;
  }
  @include min(lg) {
    max-width: 100%;
  }
}
.main-relaxation-option__title-word {
  display: inline-block;

  @include min(lg){
    &--wrap{
      text-align: right;
      &.offset{
        text-indent: var(--relaxationTitleOffset);
      }
    }
    &--2{
      &.offset{
        position: absolute;
        left: calc(-1 * var(--relaxationTitleOffset));
      }
    }      
  }
  @include min(xl) {
    // display: flex;
    // justify-content: space-between;

    div {
      width: 100%;
    }
  }
}
.main-relaxation-option__swiper {
  overflow: visible;
  position: relative;
}
.swiper-button{
  width: 40px;
  height: 40px;
  position: absolute;
  top: 209px;
  transform: translateY(-50%);
  border: 1px solid rgba(#363735, 0.1);
  border-radius: 50%;
  background-color: $white-color;
  z-index: 10;
  
  @include min(tb){
    width: 48px;
    height: 48px;

    top: 277px;
  }
  @include min(md){
    width: 56px;
    height: 56px;

    top: 258px;
  }
  @include min(xl){
    width: 66px;
    height: 66px;

    top: 343px;
  }
  @include min(bg){
    width: 86px;
    height: 86px;

    top: 455px;
  }

  &_prev{
    left: 8px;
    @include min(tb){
      left: 16px;
    }
    @include min(md){
      left: 20px;
    }
    @include min(xl){
      left: 32px;
    }
    @include min(bg){
      left: 40px;
    }

    & .swiper-button__arrow{
      mask-image: url('/icons/arrow-prev.svg');
    }

    &:hover{
      @include min(lg){
        & .swiper-button__arrow{
          transform: translate(-80%, -50%);
        }
      }
    }
  }
  &_next{
    right: 8px;
    @include min(tb){
      right: 16px;
    }
    @include min(md){
      right: 20px;
    }
    @include min(xl){
      right: 32px;
    }
    @include min(bg){
      right: 40px;
    }

    & .swiper-button__arrow{
      mask-image: url('/icons/arrow-next.svg');
    }

    &:hover{
      @include min(lg){
        & .swiper-button__arrow{
          transform: translate(-20%, -50%);
        }
      }
    }
  }

  &__arrow{
    width: 40%;
    height: 40%;
    background-color: #363735;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    mask-size: cover;
    mask-position: center;

    transition: transform 0.3s ease;

    @include min(tb){
      width: 35%;
      height: 35%;
    }
    @include min(md){
      width: 25%;
      height: 25%;
    }
  }
}
.main-relaxation-option__card-svg {
  @include pb-gold;
  width: 18px;
  height: 20px;

  svg {
    object-fit: unset;
  }

  @include min(tb) {
    width: 24px;
    height: 27px;
  }  
  @include min(bg) {
    width: 32px;
    height: 36px;
  }
}
.main-relaxation-option__line {
  margin-right: auto;
  margin-left: 0;
  width: 2px;
  height: 32px;

  @include min(tb) {
    height: 40px;
  }
  @include min(xl) {
    height: 65px;
  }
  @include min(bg) {
    height: 82px;
  }
}
.main-relaxation-option__card-img {
  height: 290px;

  @include min(tb) {
    height: 394px;
  }
  @include min(md) {
    height: 351px;
  }
  @include min(xl) {
    height: 469px;
  }
  @include min(bg) {
    height: 626px;
  }
}
.main-relaxation-option__card-title {
  @include mt-darkgreen;
}
.main-relaxation-option__card-text {
  @include mt-gold;
  width: 66.7%;

  @include min(md) {
    width: 100%;
    text-indent: 6ch;
  }
}
</style> 