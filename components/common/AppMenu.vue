<template>
  <div class="menu container">
    <!-- <div class="menu__app">
      <div class="menu__app-time p1"> {{getCurrentTime}} </div>
      <div class="menu__app-weather p1">
        <span>{{weather.temp}}°C</span>
        <img :src="weather.icon" alt="icon-weather" />
      </div>
    </div> -->

    <div class="menu__bg">
      <svg width="488" height="439" viewBox="0 0 488 439" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.2">
          <path d="M186.298 426.473L244.084 361.479L301.873 426.473H186.298ZM74.2262 353.92V290.407L86.3511 276.774V353.92H97.8622V263.822L127.563 230.42L157.257 263.817V353.92H168.769V276.766L180.891 290.402V353.92H192.405V303.348L204.528 316.987V353.92H216.039V329.936L236.206 352.62L166.768 430.718C164.702 433.041 165.019 434.782 165.391 435.615C165.766 436.445 166.859 437.836 169.959 437.836H318.207C319.908 437.836 321.404 436.868 322.106 435.311C322.806 433.756 322.535 431.995 321.399 430.718L251.963 352.617L272.125 329.941V353.917H283.639V316.992L295.761 303.356V353.917H307.272V290.409L319.392 276.774V353.917H330.904V263.824L360.606 230.415L390.298 263.817V353.917H401.813V276.766L413.937 290.402V353.917H425.447V303.348L437.574 316.987V353.917H449.086V329.936L470.319 353.817L470.416 353.925H486.171L360.842 212.957L360.599 212.684L244.082 343.758L127.8 212.977L127.555 212.705L2.48521 353.386L2 353.932L17.7554 353.925L39.0783 329.941V353.92H50.5901V316.992L62.7121 303.356V353.92H74.2262Z" stroke="white"/>
          <path d="M121.503 262.013H109.986V353.921H121.503V262.013Z" stroke="white"/>
          <path d="M145.135 262.013H133.623V353.921H145.135V262.013Z" stroke="white"/>
          <path d="M343.027 353.92H354.544V262.012H343.027V353.92Z" stroke="white"/>
          <path d="M378.18 262.013H366.668V353.921H378.18V262.013Z" stroke="white"/>
          <path d="M255.408 51.491C259.329 51.491 262.518 48.3024 262.518 44.3811C262.518 40.4568 259.329 37.2682 255.408 37.2682C251.484 37.2682 248.295 40.4568 248.295 44.3811C248.295 48.3024 251.484 51.491 255.408 51.491Z" stroke="white"/>
          <path d="M154.316 200.327L244.079 99.3556L333.851 200.325L244.082 301.293L154.316 200.327ZM244.082 319.012L349.412 200.539L349.605 200.32L252.231 90.8006C286.358 54.2307 314.452 51.1946 319.748 50.9576C322.203 50.8275 324.2 49.3009 325.385 46.6222L325.704 45.5299C326.135 43.3394 325.702 41.9481 324.085 40.3803L323.434 39.8338C301.437 21.3825 271.172 19.1411 259.183 19.0342C256.491 19.011 249.906 18.9041 247.881 18.7404C221.12 16.5656 210.104 7.67335 205.918 2.56635L205.649 2.2374L205.232 2.12973C201.203 1.104 197.133 0.77729 193.092 1.14736L191.466 1.29763L191.966 2.8497C192.768 5.34451 201.14 27.3313 247.072 31.0103C249.441 31.2017 256.076 31.3273 258.819 31.3729C266.705 31.506 286.721 32.7717 303.852 41.5697C289.932 45.7848 263.105 57.9202 234.534 92.2943L138.742 200.123L138.549 200.343L243.837 318.738L244.082 319.012Z" stroke="white"/>
        </g>
      </svg>
    </div>

    <ul class="menu__list">
      <!-- <li 
        class="menu__list-item"
        v-for="(el, id) in getMenuData?.Menu"
        :key="id"
      > -->
      <li 
        :class="{'menu__list-break': el?.Page_name === 'menu-break-point', 'menu__list-item': el?.Page_name !== 'menu-break-point', 'menu__list-item--slash': el?.slash}"
        v-for="(el, id) in menuWithBreaks"
        :key="id"
      >
        <NuxtLink
          v-if="el?.Page_name !== 'menu-break-point'"
          class="menu__list-link hover-nonlinear-white h3"
          :to="localePath(`/${el?.Slug}`)"
        >{{el?.Page_name}}</NuxtLink>
      </li>
    </ul>

    <div class="menu__bottom">
      <ul class="menu__social">
        <li 
          class="menu__social-item"
          v-for="(el, id) in getSocials"
          :key="id"
        >
          <a class="menu__social-link hover-nonlinear-white p1" :href="el?.Link" target="_blank">{{el?.Social_title}}</a>
        </li>
      </ul>

      <ul class="menu__contact">
        <li class="menu__contact-item">
          <a
            class="menu__contact-link menu__contact-link--phone hover-nonlinear-white p1"
            :href="`tel:${getData?.Contact?.Contact_block?.Phone}`"
          >{{getData?.Contact?.Contact_block?.Phone}}</a>
        </li>
        <li class="menu__contact-item">
          <a
            class="menu__contact-link menu__contact-link--email hover-nonlinear-white p1"
            :href="`mailto:${getData?.Contact?.Contact_block?.Email}`"
          >{{getData?.Contact?.Contact_block?.Email}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin";
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
import { mapGetters } from "vuex";

export default {
  // data: () => ({
  //   time: 0,
  // }),
  computed: {
    ...mapGetters("headerAndMenu", ["getMenuData"]),
    ...mapGetters("contactPage", ["getData"]),
    // ...mapGetters("mainPage", ["getWeather"]),
    // ...mapGetters("mainPage", ["getCurrentTime"]),

    getSocials() {
      return [...this.getData?.Contact?.Social_media].reverse()
    },
    weather(){
      if(this.getWeather){
        return {
          temp: Math.round(this.getWeather.main.temp),
          icon: `http://openweathermap.org/img/wn/${this.getWeather.weather[0].icon}@2x.png`
        };
      } else {
        return {
          temp: "",
          icon: ""
        };
      }
    },
    menuWithBreaks(){
      const menu = this.getMenuData?.Menu;
      if(menu){
        const breaksMenu = [];
        menu.forEach((item, index) => {
          const el = item;

          if((index + 1) % 3 === 0){
            breaksMenu.push(el);
            breaksMenu.push({Page_name: 'menu-break-point'});
          } else {
            el.slash = true;
            breaksMenu.push(el);
          }
        });

        return breaksMenu;
      } else{
        return [];
      }
    }
  },
  methods: {
    mobileHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },

    drawImage() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".menu__bg",
        },
      });
  
      tl.from(
        ".menu__bg path",
        { delay: 0.3, duration: 1.2, drawSVG: '50% 50%' },
      )
    },

    disableImage() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".menu__bg",
        },
      });
  
      tl.from(
        ".menu__bg path",
        { duration: 0.3, drawSVG: '0%' },
      )
    },

    // currentTime() {
    //   this.time = `${new Date().getHours() > 9 ? new Date().getHours() : '0' + new Date().getHours()}:
    //     ${new Date().getMinutes() > 9 ? new Date().getMinutes() : '0' + new Date().getMinutes()}`;
    // }
  },
  mounted() {
    this.mobileHeight();
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/utilities/indents";

.menu {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $black-color;
  color: #ffffff;
  position: absolute;
  z-index: 98;
  top: 0;
  left: 0;
  transform: translateY(-110%);
  // transition: transform 1s cubic-bezier(.37,.53,.38,1);
  transition: transform 1s cubic-bezier(.62,0,.63,.47);

  &.active {
    transform: translateY(0%);
    transition: transform 1s cubic-bezier(.37,.53,.38,1);
  }
}
// .menu__app {
//   @include mt-crimson;
//   display: flex;
//   position: absolute;
//   left: 50%;
//   transform: translate(-50%, 55%);

//   &-time {
//     display: none;
//     position: relative;

//     &::after {
//       content: "|";
//       position: absolute;
//       top: 0;
//       right: 0;
//     }

//     @include min(md) {
//       padding-right: 21px;
//       display: unset;
//     }
//     @include min(bg) {
//       padding-right: 25px;
//     }
//   }
//   &-weather {
//     display: flex;

//     @include min(md) {
//       padding-left: 20px;
//     }
//     @include min(bg) {
//       padding-left: 24px;
//     }
//   }
//   &-weather img {
//     // margin-left: 12px;
//     // width: 17px;
//     // height: 15px;
//     margin-left: 10px;
//     width: 25px;
//     height: 25px;
//     margin-top: -5px;

//     @include min(bg) {
//       // width: 23px;
//       // height: 20px;
//       margin-left: 10px;
//       width: 30px;
//       height: 30px;
//       margin-top: -5px;
//     }
//   }
// }
.menu__bg {
  margin: 0 auto;
  width: 338px;
  height: 375px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  svg {
    object-fit: unset;
  }

  @include min(tb) {
    width: 454px;
    height: 410px;
  }
  @include min(md) {
    width: 496px;
    height: 447px;
  }
  @include min(bg) {
    width: 652px;
    height: 588px;
  }
}
.menu__list {
  margin-top: 16.5vh;
  display: flex;
  flex-direction: column;

  @include min(md) {
    margin-top: 50vh;
    margin-left: auto;
    margin-right: auto;
    flex-direction: unset;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    transform: translateY(-50%);
  }
}
.menu__list-item {
  @include min(md){
    margin-left: 30px;
    margin-right: 30px;
  }
  @include min(bg){
    margin-left: 48px;
    margin-right: 48px;
  }
  
  // &:not(:nth-of-type(3n)) {
  &--slash {
    position: relative;

    &::after {
      content: "/";
      position: absolute;
      // right: 0;
      transform: translateY(-5%);
      display: none;

      @include min(md) {
        display: unset;
        font-size: 32px;
        left: calc(100% + 24px);
      }
      @include min(xl) {
        font-size: 40px;
      }
      @include min(bg) {
        font-size: 48px;
        left: calc(100% + 40px);
      }
    }
  }
  &:not(:last-child) {
    margin-bottom: 24px;

    @include min(tb) {
      margin-bottom: 32px;
    }
    @include min(md) {
      // width: 33%;
      text-align: center;
    }
    @include min(bg) {
      margin-bottom: 48px;
    }
  }
  &:last-child::after{
    display: none;
  }
}
.menu__list-break{
  display: none;
  @include min(md){
    display: block;
    flex-basis: 100%;
  }
}
.menu__bottom {
  // margin-bottom: 28px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include min(tb) {
    // margin-bottom: 32px;
    margin-bottom: 24px;
  }
  @include min(xl) {
    margin-bottom: 32px;
  }
  @include min(bg) {
    margin-bottom: 40px;
  }
}
.menu__social,
.menu__contact {
  @include min(tb) {
    display: flex;
  }
}
.menu__social-item,
.menu__contact-item {
  &:not(:last-child) {
    margin-right: 32px;

    @include min(bg) {
      margin-right: 56px;
    }
  }
}
</style>