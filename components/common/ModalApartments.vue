<template>
  <div class="modal-apartments container" ref="modalApartments">
    <div class="modal-apartments__overlay" @click="close"></div>
    <div class="modal-apartments__inner">
      <div class="modal-apartments__info">
        <div class="modal-apartments__nav">
          <button 
            class="modal-apartments__nav-btn modal-apartments__nav-btn--rooms"
            :class="{'active': show === 'rooms'}"
            @click="changeView('rooms')"
            ref="btnLeft"
          >
            <p class="modal-apartments__nav-btn-value h3 hover-nonlinear-dark">{{ getData?.Main_all_accommodations?.Title_left }}</p>
            <sup class="modal-apartments__nav-btn-number p1">
              {{ getRooms.length > 9 ? getRooms.length : `0${getRooms.length}`}}
            </sup>
          </button>

          <button
            class="modal-apartments__nav-btn modal-apartments__nav-btn--chalets"
            :class="{'active': show === 'chalets'}"
            @click="changeView('chalets')"
            ref="btnRight"
          >
            <p class="modal-apartments__nav-btn-value h3 hover-nonlinear-dark">{{ getData?.Main_all_accommodations?.Title_right }}</p>
            <sup class="modal-apartments__nav-btn-number p1">
              {{ getChalets.length > 9 ? getChalets.length : `0${getChalets.length}` }}
            </sup>
          </button>
        </div>

        <p class="modal-apartments__text p1" ref="text">{{ getData?.Main_all_accommodations?.Description }}</p>

        <svg width="2" height="460" viewBox="0 0 2 460" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- <path ref="line" opacity="0.16" d="M1 460L0.99998 -4.81308e-06" stroke="#363735" stroke-dasharray="5 5"/> -->
          <clipPath id="modalAppartmentsLine">
            <path opacity="0.16" fill-rule="evenodd" clip-rule="evenodd" d="M0.49997 2.5L0.499969 0H1.49997L1.49997 2.5H0.49997ZM0.49997 12.5L0.49997 7.5H1.49997L1.49997 12.5H0.49997ZM0.49997 22.5L0.49997 17.5H1.49997L1.49997 22.5H0.49997ZM0.499971 32.5L0.499971 27.5H1.49997L1.49997 32.5H0.499971ZM0.499971 42.5L0.499971 37.5H1.49997L1.49997 42.5H0.499971ZM0.499972 52.5L0.499972 47.5H1.49997L1.49997 52.5H0.499972ZM0.499972 62.5L0.499972 57.5H1.49997L1.49997 62.5H0.499972ZM0.499973 72.5L0.499972 67.5H1.49997L1.49997 72.5H0.499973ZM0.499973 82.5L0.499973 77.5H1.49997L1.49997 82.5H0.499973ZM0.499974 92.5L0.499973 87.5H1.49997L1.49997 92.5H0.499974ZM0.499974 102.5L0.499974 97.5H1.49997L1.49997 102.5H0.499974ZM0.499974 112.5L0.499974 107.5H1.49997L1.49997 112.5H0.499974ZM0.499975 122.5L0.499975 117.5H1.49997L1.49997 122.5H0.499975ZM0.499975 132.5L0.499975 127.5H1.49997L1.49998 132.5H0.499975ZM0.499976 142.5L0.499975 137.5H1.49998L1.49998 142.5H0.499976ZM0.499976 152.5L0.499976 147.5H1.49998L1.49998 152.5H0.499976ZM0.499977 162.5L0.499976 157.5H1.49998L1.49998 162.5H0.499977ZM0.499977 172.5L0.499977 167.5H1.49998L1.49998 172.5H0.499977ZM0.499977 182.5L0.499977 177.5H1.49998L1.49998 182.5H0.499977ZM0.499978 192.5L0.499978 187.5H1.49998L1.49998 192.5H0.499978ZM0.499978 202.5L0.499978 197.5H1.49998L1.49998 202.5H0.499978ZM0.499979 212.5L0.499979 207.5H1.49998L1.49998 212.5H0.499979ZM0.499979 222.5L0.499979 217.5H1.49998L1.49998 222.5H0.499979ZM0.49998 232.5L0.499979 227.5H1.49998L1.49998 232.5H0.49998ZM0.49998 242.5L0.49998 237.5H1.49998L1.49998 242.5H0.49998ZM0.49998 252.5L0.49998 247.5H1.49998L1.49998 252.5H0.49998ZM0.499981 262.5L0.499981 257.5H1.49998L1.49998 262.5H0.499981ZM0.499981 272.5L0.499981 267.5H1.49998L1.49998 272.5H0.499981ZM0.499982 282.5L0.499982 277.5H1.49998L1.49998 282.5H0.499982ZM0.499982 292.5L0.499982 287.5H1.49998L1.49998 292.5H0.499982ZM0.499983 302.5L0.499982 297.5H1.49998L1.49998 302.5H0.499983ZM0.499983 312.5L0.499983 307.5H1.49998L1.49998 312.5H0.499983ZM0.499984 322.5L0.499983 317.5H1.49998L1.49998 322.5H0.499984ZM0.499984 332.5L0.499984 327.5H1.49998L1.49998 332.5H0.499984ZM0.499984 342.5L0.499984 337.5H1.49998L1.49998 342.5H0.499984ZM0.499985 352.5L0.499985 347.5H1.49998L1.49998 352.5H0.499985ZM0.499985 362.5L0.499985 357.5H1.49998L1.49999 362.5H0.499985ZM0.499986 372.5L0.499985 367.5H1.49999L1.49999 372.5H0.499986ZM0.499986 382.5L0.499986 377.5H1.49999L1.49999 382.5H0.499986ZM0.499987 392.5L0.499986 387.5H1.49999L1.49999 392.5H0.499987ZM0.499987 402.5L0.499987 397.5H1.49999L1.49999 402.5H0.499987ZM0.499987 412.5L0.499987 407.5H1.49999L1.49999 412.5H0.499987ZM0.499988 422.5L0.499988 417.5H1.49999L1.49999 422.5H0.499988ZM0.499988 432.5L0.499988 427.5H1.49999L1.49999 432.5H0.499988ZM0.499989 442.5L0.499989 437.5H1.49999L1.49999 442.5H0.499989ZM0.499989 452.5L0.499989 447.5H1.49999L1.49999 452.5H0.499989ZM0.49999 460L0.499989 457.5H1.49999L1.49999 460H0.49999Z" fill="#363735"/>
          </clipPath>
          <line ref="line" opacity="0.16" x1="1" y1="0" x2="2" y2="460" stroke="#363735" stroke-width="2" clip-path="url(#modalAppartmentsLine)" />
        </svg>
      </div>

      <div class="modal-apartments__cards container block-wrapper" ref="mySwiper">
        <div class="modal-apartments__cards-line" ref="fullWidthLine"></div>
        <ul class="swiper-wrapper" ref="cardsContainer">
          <li
            class="modal-apartments__card swiper-slide block-wrapper"
            v-for="(item, index) in cardsList"
            :key="index"
            ref="card"
          >
            <NuxtLink :to="localePath(`/accommodations/${item?.attributes?.Slug}`)">
              <div class="modal-apartments__card-img">
                <img :src="`${getApiUrl()}${item?.attributes?.Main_room?.Room_cover_background?.data?.attributes?.url}`" alt="">
              </div>
              <p class="modal-apartments__card-title p2">{{item?.attributes?.Main_room?.Title_room}}</p>
              <p class="modal-apartments__card-text p3">
                <span
                  v-for="(el, idx) in item?.attributes?.Main_room?.Includes"
                  :key="idx"
                > {{el?.Include}} / </span>
              </p>
              <div class="modal-apartments__card-block line-hr" ref="lineHr"></div>
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
    </div>
  </div>
</template>

<script>
import { animateJS } from "~/plugins/animations";
import Swiper, {Navigation} from 'swiper';
import "swiper/swiper-bundle.css";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin";
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
import { mapGetters } from "vuex";

export default {
  props: {
    darkTheme: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    show: 'rooms',
    cardsList: null,
    swiperCards: null,
  }),
  computed: {
    ...mapGetters("accommodationsPage", ["getData"]),
    ...mapGetters("allAccommodations", ["getAccommodationsData"]),

    getRooms() {
      return this.getAccommodationsData.filter(item => item.attributes.RoomTrue_ChaletFalse === true)
    },
    getChalets() {
      return this.getAccommodationsData.filter(item => item.attributes.RoomTrue_ChaletFalse === false)
    },
  },
  methods: {
    mobileHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
    changeView(value) {
      this.show = value;
      this.$el.querySelectorAll('.modal-apartments__nav-btn').forEach(btn => btn.disabled = true);

      value === 'rooms' ? this.cardsList = this.getRooms : this.cardsList = this.getChalets;

      this.swiperCards.destroy();
      setTimeout(this.initSwiper, 200);
      this.fadeItems();

      setTimeout(() => {
        this.$el.querySelectorAll('.modal-apartments__nav-btn').forEach(btn => btn.disabled = false);
      }, 1200);
    },
    initSwiper() { 
      this.swiperCards = new Swiper(".modal-apartments__cards", {
        slidesPerView: 2.8,
        spaceBetween: 24,
        modules: [Navigation],
        
        navigation: {
          nextEl: '.swiper-button_next',
          prevEl: '.swiper-button_prev',
        },

        breakpoints: {
          1280: {
            slidesPerView: 3,
            spaceBetween: 36,
          },
          1440: {
            slidesPerView: 3.1,
            spaceBetween: 48,
          },
        },
      }); 
    },
    fadeItems() {
      const items = this.$refs.card;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.cardsContainer,
        },
      });

      tl.from(this.$refs.cardsContainer, {
        delay: 0.2,
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
    animationInfo() {
      if (this.$refs.btnLeft) {
        animateJS('splitTitleLeft', this.$refs.btnLeft);
      }

      if (this.$refs.btnRight) {
        animateJS('splitTitleLeft', this.$refs.btnRight);
      }

      if (this.$refs.text) {
        animateJS('splitText', this.$refs.text);
      }

      if (this.$refs.lineHr) {
        animateJS('line-hr', this.$refs.lineHr);
      }

      if (this.$refs.line) {
        animateJS('drawSvg', this.$refs.line);
      }
      if(this.$refs.fullWidthLine){
        gsap.from(this.$refs.fullWidthLine, {
          width: 0,
          duration: 1.5,
          ease: 'none',
          clearProps: 'all',
        })
      }
    },
    close() {
      this.$el.classList.remove('active');
      document.body.classList.remove("lock");

      document.removeEventListener('click', this.clickOutside);
    },
    clickOutsideHandler(){
      setTimeout(() => {
        document.addEventListener('click', this.clickOutside);  
      }, 0);
    },
    clickOutside(e){
      if(e.target !== this.$refs.modalApartments && !this.$refs.modalApartments.contains(e.target)){
        this.close();
      }
    }
  },
  mounted() {
    this.cardsList = this.getRooms;
    this.mobileHeight();
    this.initSwiper();
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/utilities/indents";

.swiper-button{
  width: 48px;
  height: 48px;
  position: absolute;
  top: 34%;
  transform: translateY(-50%);
  border: 1px solid rgba(#363735, 0.1);
  border-radius: 50%;
  background-color: #fff;
  z-index: 10;
  
  @include min(bg){
    width: 56px;
    height: 56px;
    
  }

  &_prev{
    left: 20px;
    @include min(xl){
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
    right: 20px;
    @include min(xl){
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
    width: 35%;
      height: 35%;
    background-color: #363735;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    mask-size: cover;
    mask-position: center;

    transition: transform 0.3s ease;
  }
}

.modal-apartments {
  margin-top: 64px;
  margin-bottom: auto;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  // display: none;
  color: $black-color;
  position: absolute;
  z-index: 98;
  top: 0;
  left: 0;

  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease-in-out, visibility 0s 0.4s;

  @include min(tb) {
    margin-top: 85px;
  }
  @include min(xl) {
    margin-top: 94px;
  }
  @include min(bg) {
    margin-top: 125px;
  }

  &.active {
    display: flex;
  }
}
.modal-apartments__overlay {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.48) 13.77%);
  position: absolute;
  z-index: 98;
  top: 0;
  left: 0;
}
.modal-apartments__inner {
  width: 100%;
  height: 58%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  position: relative;
  z-index: 101;
  border-radius: 6px;

  transform: translateY(-20%);
  transition: transform 0.4s ease-in-out;
}
.modal-apartments__info {
  @include pt-cornflowerblue;
  @include pb-cornflowerblue;
  padding-left: 24px;
  padding-right: 24px;
  height: 100%;
  flex: 0 0 31%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  @include min(md) {
    padding-left: 40px;
    padding-right: 40px;
  }
  @include min(bg) {
    padding-left: 64px;
    padding-right: 64px;
  }

  svg {
    width: unset;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
  }
  svg path {
    height: 100%;
  }
}
.modal-apartments__nav {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.modal-apartments__nav-btn {
  display: flex;
  line-height: 1;

  &:not(:last-child) {
    @include mb-greenyellow;
  }

  &.active {
    .modal-apartments__nav-btn-value {
      color: $black-color;
      -webkit-text-stroke-width: 0;
      transition: 0.4s cubic-bezier(.37,.53,.38,1);
    }
    .modal-apartments__nav-btn-number {
      color: $black-color;
      opacity: 1;
      transition: 0.4s cubic-bezier(.37,.53,.38,1);
    }
  } 
}
.modal-apartments__nav-btn-value {
  margin-right: 8px;
  color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: rgba($black-color, 0.5);
  transition: 0.4s cubic-bezier(.37,.53,.38,1);

  @include min(md) {
    transform: translateY(-20%);
  }
}
.modal-apartments__nav-btn-number {
  display: inline-block;
  transform: translateY(10px);
  opacity: 0.3;
  transition: 0.4s cubic-bezier(.37,.53,.38,1);

  @include min(md) {
    transform: translateY(0);
  }
}
.modal-apartments__cards {
  @include mt-coral;
  @include mb-crimson;
  flex: 0 0 69%;
  position: relative;
}
.modal-apartments__cards-line{
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed rgba($black-color, 0.16);
  position: absolute;
  bottom: 0;
  left: 0;
}
.modal-apartments__card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  a {
    width: 100%;
    height: 100%;
  }
}
.modal-apartments__card-img {
  width: 100%;
  height: 68%;
}
.modal-apartments__card-title {
  @include mt-gold;
}
.modal-apartments__card-text {
  @include mt-olive;
  opacity: 0.5;

  span {
    font-size: 12px;
    text-transform: uppercase;
  }
}
.modal-apartments__card-block {
  margin-top: 8px;
  height: 32px;
  border-width: 0px 0px 0px 1px;
  border-style: dashed;
  border-color: rgba($black-color, 0.16);

  @include min(bg) {
    height: 40px;
  }
}

.modal-apartments.active{
  opacity: 1;
  visibility: visible;
  transition: opacity 0.4s ease-in-out, visible 0s;

  & .modal-apartments__inner{
    transform: translateY(0);
  }
}

</style>