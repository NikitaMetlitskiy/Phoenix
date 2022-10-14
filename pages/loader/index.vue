<template>
  <div class="loader" :class="{'hide': hide}" ref="loader">
    <div class="loader-logo">
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

    <div class="loader-progress h1">0%</div>

    <p class="loader-text p1">{{text}}</p>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin";
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export default {
  name: "Loader",
  props: {
    hide: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    text: null,
  }),
  methods: {
    mobileHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },

    loaderAnim(time) {
      const step = 1;
      const progressPercent = document.querySelector(".loader-progress");

      function start() {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".loader",
          },
        });
  
        tl.to( ".loader-logo", { duration: 0.3, opacity: 1 }, "together" )
          .to( ".loader-progress", { duration: 0.3, opacity: 1 }, "together" )
          .to( ".loader-text", { duration: 0.3, opacity: 1 }, "together" )
      }

      function percentAnim() {
        let n = 0;
        let t = Math.round(time / 100);
  
        if (progressPercent) {
          let interval = setInterval(() => {
            n = n + step;
            if (n === 100) {
              clearInterval(interval);
            }
            progressPercent.innerHTML = `${n}%`;
          }, t);
        }
      }

      function drawImage() {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".loader",
          },
        });
  
        tl.from(
          ".loader-logo path",
          { delay: 0.3, duration: `${time/1000 - 0.3}`, drawSVG: '50% 50%' },
        )
      }

      start();
      setTimeout(percentAnim(), 300);
      drawImage();
    },
  },
  mounted() {
    this.mobileHeight();
    this.loaderAnim(2700);

    if (this.$i18n.locale === "en") {
      this.text = "IF YOU DREAM OF A WARM, ENVIRONMENTAL AND MODERN HOUSE - THIS IS THE  SOLUTION FOR YOU";
    } else {
      this.text = "ЯКЩО ВИ МРІЄТЕ ПРО ТЕПЛИЙ, ЕКОЛОГІЧНИЙ І СУЧАСНИЙ БУДИНОК - ЦЕ РІШЕННЯ ДЛЯ ВАС";
    }
  },
};
</script>

<style lang="scss" scoped>

.loader {
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-color: $black-color;
  color: #FFFFFF;
  // position: relative;
  z-index: 10000;


  position: fixed;
  transition: transform 0.7s cubic-bezier(.62,0,.63,.47);
}
.loader-logo {
  width: 338px;
  height: 375px;

  img,
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
.loader-logo,
.loader-progress {
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loader-text {
  margin: 0 auto;
  max-width: 340px;
  width: 100%;
  text-align: center;
  opacity: 0;
  position: absolute;
  bottom: 32px;
  left: 0;
  right: 0;

  @include min(tb) {
    max-width: 394px;
  }
  @include min(bg) {
    max-width: 456px;
    bottom: 40px;
  }
}

.loader.hide{
  transform: translateY(-110%);
}
</style>
