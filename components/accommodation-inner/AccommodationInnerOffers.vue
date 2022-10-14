<template>
  <div class="accommodation-offers">
    <div v-if="title" class="accommodation-offers__title container block-wrapper" ref="titleInner">
      <p class="h2" ref="title">{{ title }}</p>
    </div>

    <div v-if="offersList" class="accommodation-offers__inner container">
      <ul class="accommodation-offers__list swiper-wrapper" ref="cardsContainer">
        <li
          class="accommodation-offers__list-item swiper-slide block-wrapper"
          v-for="(item, id) in offersList"
          :key="id"
          ref="card"
        >
        <NuxtLink
          class="accommodation-offers__list-item-link"
          :to="localePath(`/special-offers/${item?.attributes?.Slug}`)"
        >
          <div class="accommodation-offers__list-item-img block-wrapper">
            <!-- <img :src="`${getApiUrl()}${item?.Photo?.data?.attributes?.url}`" :alt="`${item?.Title_special_offer}-image`" ref="itemImage" /> -->
            <img :src="`${getApiUrl()}${item?.attributes?.Offer?.Offer_cover_photo?.data?.attributes?.url}`" :alt="`${item?.attributes?.Offer_title}-image`" ref="itemImage" />
          </div>

          <!-- <div class="accommodation-offers__list-item-title h4" ref="itemTitle">{{item?.Title_special_offer}}</div> -->
          <div class="accommodation-offers__list-item-title h4" ref="itemTitle">{{item?.attributes?.Offer?.Offer_title}}</div>
          <!-- <div class="accommodation-offers__list-item-text p1" ref="itemText">{{item?.Discription_special_offer}}</div> -->
          <div class="accommodation-offers__list-item-text p1" ref="itemText">{{item?.attributes?.Offer?.Description_preview}}</div>
          <div class="accommodation-offers__list-item-block"></div>
        </NuxtLink>
        </li>
      </ul>

      <div class="swiper-buttons">
        <button class="swiper-button swiper-button_prev">
          <div class="swiper-button__arrow"></div>
        </button>
        <button class="swiper-button swiper-button_next">
          <div class="swiper-button__arrow"></div>
        </button>
      </div>
    </div>

    <div v-if="buttonLink" class="accommodation-offers__btn-wrapper" ref="linkBtn">
      <NuxtLink
        class="accommodation-offers__btn a1 hover-linear-dark"
        :to="localePath(`/${buttonLink}`)"
      >
        {{ buttonText }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { animateJS } from "~/plugins/animations";
import Swiper, {Navigation} from "swiper";
import "swiper/swiper-bundle.css";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    buttonText: {
      type: String,
      default: "",
    },
    buttonLink: {
      type: String,
      default: "",
    },
    offersList: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    swiperAccommodation: null,
  }),
  methods: {
    evenCardHeight(){
      const cards = this.$refs.card;
      const cardMaxHeight = Math.max(...cards.map(card => {
        return card.getBoundingClientRect().height;
      }));
      cards.forEach(card => {
        card.style.height = `${cardMaxHeight}px`;
      });
    },
    initSwiper() {
      this.swiperAccommodation = new Swiper(".accommodation-offers__inner", {
        slidesPerView: 1.4,
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
            xPercent: 120,
            stagger: 0.25,
            ease: "power3.easeOut",
          });
        },
        once: true,
      });
    },
  },
  mounted() {
    this.initSwiper();
    this.evenCardHeight();
    this.translateCards();

    if (window.innerWidth >= 768) {
      this.$refs.titleInner.append(this.$refs.linkBtn);
    }

    this.$nextTick(() => {
      animateJS('splitTitleLeft', this.$refs.title);
      animateJS('visibleItem', this.$refs.linkBtn);
    });
  },
};
</script>

<style lang="scss" scoped>
.accommodation-offers {
  @include mt-thistle;
}
.accommodation-offers__title {
  @include mb-blueviolet;

  @include min(tb) {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    p {
      width: 62%;
    }
  }
}
.accommodation-offers__inner {
  overflow: visible;
  position: relative;
}
.swiper-button{
  width: 40px;
  height: 40px;
  position: absolute;
  top: 145px;
  transform: translateY(-50%);
  border: 1px solid rgba(#363735, 0.1);
  border-radius: 50%;
  background-color: $white-color;
  z-index: 10;
  
  @include min(tb){
    width: 48px;
    height: 48px;

    top: 197px;
  }
  @include min(md){
    width: 56px;
    height: 56px;

    top: 175px;
  }
  @include min(lg){
    top: 200px;
  }
  @include min(xl){
    width: 66px;
    height: 66px;

    top: 234px;
  }
  @include min(bg){
    width: 86px;
    height: 86px;

    top: 313px;
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
.accommodation-offers__list-item{
  display: flex;
  flex-direction: column;
}
.accommodation-offers__list-item-link{
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  @media(hover:hover){
    &:hover{
      .accommodation-offers__list-item-img img{
        transform: scale(1.05);
      }
    }
  }
}
.accommodation-offers__list-item-img {
  height: 290px;

  @include min(tb) {
    height: 394px;
  }
  @include min(md) {
    height: 351px;
  }
  @include min(lg) {
    height: 400px;
  }
  @include min(xl) {
    height: 469px;
  }
  @include min(bg) {
    height: 626px;
  }

  & img{
    transition: transform 1s cubic-bezier(0.37, 0.53, 0.38, 1);
  }
}
.accommodation-offers__list-item-title {
  @include mt-darkgreen;
  width: 75%;

  @include min(tb) {
    width: 90%;
  }
}
.accommodation-offers__list-item-text {
  @include mt-gold;
  width: 66.7%;

  @include min(tb) {
    width: 75%;
  }
  @include min(xl) {
    padding-left: 28px;
    position: relative;

    &::before {
      content: "/*";
      position: absolute;
      left: 0;
    }
  }
}
.accommodation-offers__list-item-block {
  margin-top: 16px;
  height: 42px;
  border-width: 0px 0px 1px 1px;
  border-style: dashed;
  border-color: rgba($black-color, 0.16);

  flex-grow: 1;

  @include min(tb) {
    height: 48px;
  }
  @include min(md) {
    margin-top: 20px;
    height: 52px;
  }
  @include min(xl) {
    margin-top: 24px;
    height: 56px;
  }
  @include min(bg) {
    margin-top: 32px;
    height: 88px;
  }
}
.accommodation-offers__btn-wrapper {
  margin-left: 18px;
  display: inline-block;
  background-color: $white-color;
  position: relative;
  z-index: 5;
  top: -3px;
  transform: translateY(-50%);

  padding: 8px 10px 0px 0px;

  @include min(tb) {
    margin-left: 0;
    background-color: transparent;
    transform: unset;
  }
}
</style>