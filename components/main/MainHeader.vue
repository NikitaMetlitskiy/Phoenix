<template>
  <header class="main-header container" ref="container">
    <!-- :style="`backgroundImage: url('${getApiUrl()}${data?.Photo_main_cover?.data?.attributes?.url}')`" -->
    <div 
      class="main-header__img-wrapper block-wrapper"
      ref="imageBgWrapper"
    >
      <img class="main-header__img" :src="`${getApiUrl()}${data?.Photo_main_cover?.data?.attributes?.url}`" alt="Phoenix" />
    </div>

    <div class="main-header__inner">
      <h1 class="main-header__title h1" :data-text="data?.Main_big_title" ref="line">{{ data?.Main_big_title }}</h1>

      <p class="main-header__sap-title p1-light" ref="sapTitle">{{ data?.Main_subtitle_centre }}</p>

      <div class="main-header__options-wrap">
        <div class="main-header__options p1" ref="panel">
          <div class="main-header__options-select-wrap">
            <div class="main-header__options-select">
              <select class="p1" name="apartments">
                <option class="p1" value="value1">apartments</option>
                <option class="p1" value="value2" selected>apartments</option>
                <option class="p1" value="value3">apartments</option>
              </select>
            </div>

            <div class="main-header__options-select">
              <select class="p1" name="datesOfStay">
                <option class="p1" value="value1">dates of stay</option>
                <option class="p1" value="value2" selected>dates of stay</option>
                <option class="p1" value="value3">dates of stay</option>
              </select>
            </div>
          </div>

          <div class="main-header__options-guests p1">
            <span>Guests</span>
            <div class="main-header__counter-wrap">
              <button class="main-header__counter-btn" @click="guestsCounter = guestsCounter - 1" :disabled="!guestsCounter">-</button>
              <span class="main-header__counter">
                {{ guestsCounter >= 10 ? guestsCounter : `0${guestsCounter}` }}
              </span>
              <button class="main-header__counter-btn" @click="guestsCounter = guestsCounter + 1">+</button>
            </div>
          </div>

          <button class="main-header__search-btn p1">
            <span>Book now</span>
            <img src="icons/icon-search.svg" alt="icon-search" />
          </button>
        </div>

        <div class="main-header__social">
          <div class="main-header__social-weather p1" ref="weather">
            <span>{{ socialWeather.temp }}°C</span>
            <img :src="socialWeather.icon" alt="icon-weather" />
          </div>

          <div class="main-header__social-links p1" ref="social">
            <a class="main-header__social-link-fb hover-nonlinear-white" href="https://www.facebook.com/phoenixbukovel" target="_blank">{{fb}}</a>
            <a class="main-header__social-link-in hover-nonlinear-white" href="https://www.instagram.com/phoenixbukovel/" target="_blank">{{insta}}</a>
          </div>
        </div>
      </div>
    </div>

    <p class="main-header__text h4" ref="text">{{ data?.Main_description_right }}</p>
  </header>
</template>

<script>
import { animateJS } from "~/plugins/animations";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    weather: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    guestsCounter: 1,
    // socialWeather: 18,
    fb: null,
    insta: null
  }),
  computed: {
    socialWeather(){
      if(this.weather){
        return {
          temp: Math.round(this.weather.main.temp),
          icon: `http://openweathermap.org/img/wn/${this.weather.weather[0].icon}@2x.png`
        };
      } else {
        return {
          temp: "",
          icon: ""
        };
      }
    }
  },
  methods: {
    mobileHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    moveStroke() {
      gsap.registerPlugin(ScrollTrigger);

      if (window.innerWidth >= 768) {
        gsap.set(this.$refs.line, {
          position: "relative",
          display: "inline-block",
          right: "-25%",
        });

        gsap.to(this.$refs.line, {
          scrollTrigger: {
            trigger: this.$refs.container,
            scrub: 2,
          },
          x: -650,
        });
      } 
    },
  },
  mounted() {
    this.mobileHeight();
    this.moveStroke();

    if (window.innerWidth >= 1024) {
      this.fb = 'fb';
      this.insta = 'in';
    } else {
      this.fb = 'facebook';
      this.insta = 'instagram';
    }

    // if (window.innerWidth >=1024) {
    //   gsap.timeline({
    //     scrollTrigger: {
    //       trigger: this.$refs.container,
    //       start: "top top",
    //       scrub: true,
    //     }
    //   })
    //   .fromTo(this.$refs.imageBgWrapper, 
    //     { yPercent: 0, scale: 1.1 },
    //     { yPercent: 90, scale: 1, ease: "none" },
    //   );
    // }

    this.$nextTick(() => {
      if (this.$refs.sapTitle) {
        animateJS('splitText', this.$refs.sapTitle);
      }

      if (this.$refs.text) {
        animateJS('splitTitleLeft', this.$refs.text);
      }

      if (this.$refs.weather) {
        animateJS('fade', this.$refs.weather);
      }

      if (this.$refs.social) {
        animateJS('fade', this.$refs.social);
      }

      if (this.$refs.panel) {
        animateJS('fadeUp', this.$refs.panel);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/utilities/indents";

.main-header {
  @include pb-thistle;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: #ffffff;
  position: relative;
  overflow: hidden;
}
.main-header__img-wrapper{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -2;
}
.main-header__img {
  width: 100%;
  height: 100%;
  // background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  // will-change: transform;
  // pointer-events: none;
  // transform: scale(1.1);
  position: absolute;
  top: 0;
  left: 0;
}
.main-header__inner {
  margin-top: calc(var(--vh, 1vh) * 25);
  height: calc(var(--vh, 1vh) * 75);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 2;

  @include min(tb) {
    // margin-top: calc(var(--vh, 1vh) * 40);
    // height: calc(var(--vh, 1vh) * 60);
    margin-top: calc(var(--vh, 1vh) * 50 - 78px);
    height: calc(var(--vh, 1vh) * 50 + 78px);
  }
  @include min(md) {
    // margin-top: calc(var(--vh, 1vh) * 38);
    // height: calc(var(--vh, 1vh) * 62);
    margin-top: calc(var(--vh, 1vh) * 50 - 90px);
    height: calc(var(--vh, 1vh) * 50 + 90px);
  }
  @include min(xl) {
    margin-top: calc(var(--vh, 1vh) * 50 - 106px);
    height: calc(var(--vh, 1vh) * 50 + 106px);
  }
  @include min(bg) {
    margin-top: calc(var(--vh, 1vh) * 50 - 142.5px);
    height: calc(var(--vh, 1vh) * 50 + 142.5px);
  }
}
.main-header__title {
  @include mb-antiquewhite;
  text-align: center;
  position: relative;

  @include min(tb) {
    white-space: nowrap;

    &:before{
      content: attr(data-text);
      margin-right: 50px;
      position: absolute;
      top: 50%;
      right: 100%;
      transform: translateY(-50%);
    }
  }
}
.main-header__sap-title {
  display: none;

  @include min(tb) {
    // margin-bottom: 324px;
    margin-left: auto;
    margin-right: auto;
    width: 342px;
    display: block;
    text-align: center;
    color: #FFFFFF;
  }  
  @include min(md) {
    // margin-bottom: 147px;
  }  
  @include min(xl) {
    // margin-bottom: 186px;
  }  
  @include min(bg) {
    width: 456px;
  }
}
.main-header__options-wrap {
  margin-top: auto;
  position: relative;
}
.main-header__options {
  display: none;

  margin-left: auto;
  margin-right: auto;
  max-width: 688px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  position: relative;

  @include min(tb) {
    display: none;

    padding-right: 8px;
    // display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 68px;
  }
  @include min(md) {
    max-width: 614px;
  }  
  @include min(xl) {
    max-width: 884px;
  }  
  @include min(bg) {
    max-width: 1174px;
  }
}
.main-header__options-select-wrap {
  display: flex;
  justify-content: space-between;

  @include min(tb) {
    width: 74%;
  }  
  @include min(bg) {
    width: 53%;
  }
}
.main-header__options-select {
  padding: 20px;
  width: 50%;
  text-align: start;
  position: relative;

  @include min(bg) {
    padding: 32px;
  }
}
.main-header__options-select:not(:last-child):before {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.1);
}
.main-header__options-select:last-child:before {
  @include min(tb) {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 32px;
    background-color: rgba(255, 255, 255, 0.1);
  }
}
.main-header__options-select select {
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: #ffffff;
}
.main-header__options-select option {
  color: #000;
}
.main-header__options-guests {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @include min(bg) {
    padding: 32px;

    & > span {
      margin-right: 122px;
    }
  }
}
.main-header__counter-wrap {
  display: flex;

  @include min(bg) {
    & span {
      margin-left: 8px;
      margin-right: 8px;
    }
  }
}
.main-header__counter-btn {
  padding: 0 8px;
  background-color: transparent;
  border: none;
  text-align: right;
}
.main-header__search-btn {
  padding: 15px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  color: $black-color;
  border-radius: 12px;
  position: absolute;
  bottom: -65px;
  left: 0;

  @include min(tb) {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    position: static;

    & span {
      display: none;
    }
  }  
  @include min(xl) {
    width: 150px;
    min-height: 50px;
    border-radius: 29px;

    & span {
      display: block;
      white-space: nowrap;
      color: $black-color;
    }
  }
  @include min(bg) {
    width: 208px;
    min-height: 64px;
    border-radius: 38px;

    & span {
      margin-right: 38px;
    }
  }
}
.main-header__search-btn img {
  margin: unset;
  margin-left: 12px;
  width: 14px;
  height: 14px;
  vertical-align: middle;

  @include min(tb) {
    margin: 0;
  }  
  @include min(xl) {
    margin-left: 19px;
  }
  @include min(bg) {
    width: 16px;
    height: 16px;
  }
}
.main-header__social {
  @include pb-crimson;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @include min(md) {
    border-bottom: none;
  }  
  @include min(bg) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.main-header__social-weather {
  display: flex;
  align-items: center;
  @include min(lg){
    opacity: 0.5;
  }
}
.main-header__social-weather img {
  margin-left: 5px;
  // margin-left: 12px;
  // width: 17px;
  // height: 15px;
  width: 25px;
  height: 25px;
  margin-top: -3px;
}
.main-header__social-links {
  display: flex;
}
.main-header__social-link-fb {
  margin-right: 12px;
  transition: opacity 0.3s cubic-bezier(.37,.53,.38,1);
  @include min(lg){
    opacity: 0.5;
  }
}
.main-header__social-link-in {
  transition: opacity 0.3s cubic-bezier(.37,.53,.38,1);
  @include min(lg){
    opacity: 0.5;
  }
}
.main-header__text {
  margin-top: 32px;
  position: relative;

  @include min(tb) {
    margin-top: 48px;
    width: 87%;
  }  
  @include min(md) {
    // max-width: 40%;
    max-width: 43%;
    margin-left: auto;
    margin-top: 40px;
    margin-right: 24px;

    &::before {
      content: "";
      position: absolute;
      top: -40px;
      // left: -40px;
      left: calc(-16% + 23px);
      background-color: rgba(255, 255, 255, .2);
      width: 1px;
      height: 356px;
    }
  }
  @include min(xl) {
    max-width: 40%;
    margin-top: 90px;
    margin-right: 83px;

    &::before {
      top: -90px;
      left: calc(-25% + 83px);
    }
  }
  @include min(bg) {
    margin-top: 67px;
    margin-right: 111px;

    &::before {
      height: 475px;
      top: -67px;
      // left: -64px;
      left: calc(-25% + 111px);
    }
  }
}

@media (hover: hover) {
  .main-header__social-link-fb:hover,
  .main-header__social-link-in:hover {
    opacity: 1;
    transition: opacity 0.3s cubic-bezier(.37,.53,.38,1);
  }
}

</style>