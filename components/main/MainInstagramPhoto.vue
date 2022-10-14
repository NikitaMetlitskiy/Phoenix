<template>
  <div class="main-instagram-photo" ref="mainInstagramInner">
    <div class="main-instagram-photo__img-bg block-wrapper">
      <img :src="`${getApiUrl()}${data?.Photo_cover?.data?.attributes?.url}`" alt="img" ref="imageBg"/>
    </div>

    <div class="main-instagram-photo__inner">
      <div class="main-instagram-photo__swiper">
        <!-- <div v-if="getDataInstaList" class="swiper-wrapper main-instagram-photo__swiper-wrapper" ref="swiperWrapper"> -->
        <!-- v-for="(item, id) in getDataInstaList.slice(0, 9)" -->
        <div class="swiper-wrapper main-instagram-photo__swiper-wrapper" ref="swiperWrapper">
          <div
            class="swiper-slide"
            v-for="(item, id) in photos"
            :key="id"
            :style="{'animation-delay': `${Math.random() * 10}s`}"
          >
            <a
              class="main-instagram-photo__img"
              :class="`main-instagram-photo__img-${id+1}`"
              :href="item.permalink"
              target="_blank"
              v-if="item.permalink"
            >
              <img v-if="item.media_type === 'IMAGE'" :src="item.media_url" alt="img" ref="image" />
              <video
                v-else
                :src='item.media_url'
                type='video/mp4'
                preload='metadata'
                autoplay
                loop
                muted
                playsinline
              ></video>
            </a>

            <div
              v-else
              class="main-instagram-photo__img"
              :class="`main-instagram-photo__img-${id+1}`"
            >
              <img :src="`${getApiUrl()}${item?.attributes?.url}`" alt="img" ref="image" />
            </div>
          </div>
        </div>

        <!-- <div v-else class="swiper-wrapper">
          <div
            class="swiper-slide block-wrapper"
            v-for="(item, id) in data?.Photo_for_slider?.data?.slice(0, 5)"
            :key="id"
          >
            <div
              class="main-instagram-photo__img"
              :class="`main-instagram-photo__img-${id+1}`"
            >
              <img :src="`${getApiUrl()}${item?.attributes?.url}`" alt="img" ref="image" />
            </div>
          </div>
        </div> -->
      </div>

      <div class="main-instagram-photo__link-wrap container">
        <div class="main-instagram-photo__link-title p1" ref="text">
          {{data?.Description}}
        </div>
        <a class="main-instagram-photo__link hover-nonlinear-white p1" :href="data?.Link_instagram" target="_blank" ref="title">
          {{data?.Title_link_instagram}}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper, {Autoplay} from 'swiper';
import "swiper/swiper-bundle.css";
import {animateJS} from "~/plugins/animations";
import { mapGetters } from "vuex";
import { dragCursor } from "~/plugins/dragCursor";

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    swiperImages: null,
    instagramList: null,
  }),
  async asyncData({ store }) {
    await store.dispatch("mainPage/getDataInstaList");
  },
  computed: {
    ...mapGetters("mainPage", ["getDataInstaList"]),

    photos(){
      // return this.getDataInstaList?.slice(0, 9) || this.data?.Photo_for_slider?.data?.slice(0, 6);
      return this.getDataInstaList?.slice(0, 9);
    }
  },
  methods: {
    async getImages() {
      let response = await fetch('https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=' + this.data?.Token_instagram);

      if (response.ok) {
        let data = await response.json();
        this.instagramList = data.data.slice(0, 10);
      } 
      else {
        throw new Error(`There is a problem. No data. We've got an error ${response.status}`);
      }
    },

    initSwiper() {
      const _this = this;

      this.swiperImages = new Swiper(".main-instagram-photo__swiper", {
        slidesPerView: 2.4,
        // speed: 1000,
        preventClicks: false,
        touchStartPreventDefault: false,
        shortSwipes: false,
        longSwipesRatio: 0.07,
        longSwipesMs: 100,
        loop: true,
        autoplay: {
          delay: 1,
          disableOnInteraction: false
        },

        spaceBetween: 0,
        freeMode: true,
        speed: 3500,
        freeModeMomentum: false,

        modules: [Autoplay],
        on: {
          init: () => {
            this.toggleLinksOnMove();
          },
          sliderMove: (swiper) => {
            // swiper.autoplay = false;
            swiper.params.speed = 1000;
            swiper.params.freeModeMomentum = true;
            this.$refs.swiperWrapper.classList.remove("main-instagram-photo__swiper-wrapper");
            // swiper.slides.forEach(slide => {
            //   slide.style.animationDuration = '60s';
            // });

            setTimeout(() => {
              swiper.params.speed = 3500;
              swiper.params.freeModeMomentum = false;
              this.$refs.swiperWrapper.classList.add("main-instagram-photo__swiper-wrapper");
              // swiper.slides.forEach(slide => {
              //   slide.style.removeProperty('animation-duration');
              // });
            }, 1000)
          },
        },

        breakpoints: {
          576: {
            slidesPerView: 2.7,
          },
          768: {
            slidesPerView: 3,
          },
          1920: {
            slidesPerView: 3.2,
          },
        },
      }); 
    },

    toggleLinksOnMove(){
      const sliderArea = document.querySelector(".main-instagram-photo__inner");

      sliderArea.addEventListener("mousedown", () => {
        sliderArea.addEventListener("mousemove", this.disableLinks);
      });

      sliderArea.addEventListener("touchstart", () => {
        sliderArea.addEventListener("touchmove", this.disableLinks);
      });

      document.addEventListener("mouseup", () => {
        this.enableLinks();
        sliderArea.removeEventListener("mousemove", this.disableLinks);
      });

      document.addEventListener("touchend", () => {
        this.enableLinks();
        sliderArea.removeEventListener("touchmove", this.disableLinks);
      });
    },

    disableLinks(){
      const links = document.querySelectorAll(
        ".main-instagram-photo__img"
      );

      links.forEach((link) => (link.style.pointerEvents = "none"));
    },
    enableLinks(){
      const links = document.querySelectorAll(
        ".main-instagram-photo__img"
      );

      links.forEach((link) => (link.style.pointerEvents = "auto"));
    }
  },
  mounted() {
    setTimeout(() => {
      this.initSwiper();
    }, 1500);

    this.$nextTick(() => {
      animateJS('scaleFullImage', this.$refs.imageBg);
      animateJS('splitText', this.$refs.text);
      animateJS('splitTitleLeft', this.$refs.title);
      animateJS('fadeImage', this.$refs.image);


      if (
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
          navigator.userAgent
        ) ||
        window.innerWidth >= 1024
      ) {
        dragCursor(this.$refs.mainInstagramInner);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/utilities/indents";

.main-instagram-photo {
  position: relative;
  height: 656px;

  @include min(xl) {
    height: 862px;
  }
  @include min(bg) {
    height: 1149px;
  }
}
.main-instagram-photo__img-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
}
.main-instagram-photo__inner {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.main-instagram-photo__swiper {
  width: 100%;
  height: 100%;
}
.main-instagram-photo__img {
  position: absolute;
  z-index: 2;

  video {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
.main-instagram-photo__img-1,
.main-instagram-photo__img-4,
.main-instagram-photo__img-7,
.main-instagram-photo__img-10 {
  margin-left: 50px;
  width: 181px;
  height: 131px;
  bottom: 120px;
  left: 0;

  @include min(tb) {
    margin-left: 15px;
    width: 264px;
    height: 192px;
    bottom: 24px;
  }
  @include min(md) {
    margin-left: 1.5vw;
    width: 28.5vw;
    height: 20.7vw;
    bottom: 10px;
  }
  @include min(xl){
    width: 27.9vw;
    height: 20.3vw;
    bottom: 48px;
  }
  @include min(bg) {
    margin-left: 10vw;
    bottom: 24px;
  }
}

.main-instagram-photo__img-2,
.main-instagram-photo__img-5,
.main-instagram-photo__img-8 {
  margin-left: 40px;
  width: 263px;
  height: 170px;
  top: 11.6%;
  right: -90px;

  @include min(tb) {
    margin-left: 55px;
    width: 265px;
    height: 172px;
    top: 9%;
    right: -55px;
  }
  @include min(md) {
    margin-left: 5vw;
    width: 32.6vw;
    height: 21.2vw;
    top: 8%;
    right: -5vw;
  }
  @include min(xl) {
    width: 33.6vw;
    height: 21.9vw;
    top: 6%;
  }
  @include min(bg) {
    left: 0;
    margin-left: 13vw;
    right: unset;
  }
}
.main-instagram-photo__img-3,
.main-instagram-photo__img-6,
.main-instagram-photo__img-9 {
  margin-left: 40px;
  width: 193px;
  height: 156px;
  top: 33%;
  left: -73px;

  @include min(tb) {
    margin-left: 55px;
    width: 211px;
    height: 170px;
    top: 25.3%;
    left: -40px;
  }
  @include min(md) {
    margin-left: 5vw;
    width: 26.1vw;
    height: 20.1vw;
    top: 30%;
    left: -4vw;
  }
  @include min(xl) {
    width: 26.6vw;
    height: 21.5vw;
    top: 25.9%;
  }
  @include min(bg) {
    left: 0vw;
  }
}
.main-instagram-photo__img-1{
  @include min(bg){
    margin-left: 2vw;
  }
}
.main-instagram-photo__img-2{
  @include min(bg){
    margin-left: 5vw;
  }
}
.main-instagram-photo__img-10 {
  margin-left: 0px;
}
.main-instagram-photo__link-wrap {
  padding: 0 18px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: absolute;
  z-index: 2;
  left: 0;
  bottom: 32px;

  @include min(tb) {
    flex-direction: column-reverse;
    align-items: center;
    bottom: 50%;
    left: 0;
    transform: translateY(50%);
  }
}
.main-instagram-photo__link-title {
  display: inline-block;
  width: 176px;
  color: #ffffff;

  @include min(tb) {
    width: 100%;
    display: block;
    text-align: center;
  }
}
.main-instagram-photo__link {
  display: inline-block;
  color: #ffffff;

  @include min(tb) {
    margin-bottom: 24px;
    font-family: "Metal-Trial-Reg-3", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 0.96;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
  @include min(md) {
    margin-bottom: 28px;
    font-size: 48px;
  }
  @include min(xl){
    font-size: 64px;
  }
  @include min(bg) {
    margin-bottom: 48px;
    font-size: 80px;
  }
}


.swiper-wrapper.main-instagram-photo__swiper-wrapper {
  -webkit-transition-timing-function:linear!important; 
  -o-transition-timing-function:linear!important;
  transition-timing-function:linear!important; 
}

.swiper-slide{
  will-change: transform;
  animation: floatSlidesMobile 20s linear infinite;

  @include min(tb){
    // overflow: hidden;
    animation: floatSlides 40s linear infinite;
  }
}
@keyframes floatSlides{
  0%{
    transform: translate3d(0, 0 ,0);
  };
  20%{
    transform: translate3d(30px, 0 ,0);
  };
  30%{
    transform: translate3d(20px, 30px ,0);
  };
  40%{
    transform: translate3d(-10px, 10px ,0);
  };
  50%{
    transform: translate3d(-40px, -20px ,0);
  };
  60%{
    transform: translate3d(10px, 0px ,0);
  };
  70%{
    transform: translate3d(-20px, 15px ,0);
  };
  80%{
    transform: translate3d(5px, 20px ,0);
  };
  90%{
    transform: translate3d(15px, 10px ,0);
  };
  100%{
    transform: translate3d(0px, 0px ,0);
  }
}
@keyframes floatSlidesMobile{
  0%{
    transform: translate3d(0, 0 ,0);
  };
  20%{
    transform: translate3d(15px, 0 ,0);
  };
  30%{
    transform: translate3d(10px, 15px ,0);
  };
  40%{
    transform: translate3d(-5px, 5px ,0);
  };
  50%{
    transform: translate3d(-20px, -10px ,0);
  };
  60%{
    transform: translate3d(5px, 0px ,0);
  };
  70%{
    transform: translate3d(-10px, 8px ,0);
  };
  80%{
    transform: translate3d(3px, 10px ,0);
  };
  90%{
    transform: translate3d(8px, 5px ,0);
  };
  100%{
    transform: translate3d(0px, 0px ,0);
  }
}
</style> 