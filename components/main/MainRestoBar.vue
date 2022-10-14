<template>
  <div class="main-resto-bar container">
    <div class="main-resto-bar__img block-wrapper">
      <img :src="`${getApiUrl()}${data?.Photo_restobar_cover?.data?.attributes?.url}`" alt="img" ref="imageBg" />
    </div>

    <svg class="main-resto-bar__svg" width="167" height="423" viewBox="0 0 167 423" fill="none" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="arrow1-mask">
        <path opacity="0.5" d="M1.21588e-05 421L5.62683 422.293L3.93335 416.774L1.21588e-05 421ZM101.736 1.32818C141.162 46.6455 165.5 108.873 165.5 177.55L166.5 177.55C166.5 108.637 142.078 46.1755 102.491 0.671818L101.736 1.32818ZM165.5 177.55C165.5 292.585 97.2232 389.499 4.15335 419.203L4.45739 420.155C97.9955 390.302 166.5 292.961 166.5 177.55L165.5 177.55Z" fill="#D9D9D9"/>
      </clipPath>
      <path opacity="0.5" d="M100 0 L117 20 L130 40 L140 60 L148 80 L155 100 L160 120 L165 150 L166 180 L164 210 L159 240 L150 270 L138 300 L120 330 L97 360 L64 390 L30 410 L0 421" stroke="white" stroke-width="6" clip-path="url(#arrow1-mask)" ref="arrow1" />
    </svg>

    <div class="main-resto-bar__inner">
      <div class="main-resto-bar__title h2" ref="title">
        <span class="main-resto-bar__title-word main-resto-bar__title-word--first">
          {{data.RestoBar_title.slice(0, data?.RestoBar_title.indexOf(" "))}}
        </span>
        <span class="main-resto-bar__title-word main-resto-bar__title-word--second">
          {{data.RestoBar_title.slice(data?.RestoBar_title.indexOf(" "))}}
        </span>
      </div>

      <div class="main-resto-bar__text main-resto-bar__text1 p1" ref="text1">{{data?.Small_description_right_upper}}</div>
      
      <div class="main-resto-bar__text main-resto-bar__text2 p1">
        <span ref="text2">{{data?.Small_description_left}}</span>
        <svg class="main-resto-bar__svg-dotted2" width="176" height="117" viewBox="0 0 176 117" fill="none" xmlns="http://www.w3.org/2000/svg">
          <clipPath id="arrow2-mask">
            <path opacity="0.5" d="M-1.19401e-05 117L5.76248 116.644L2.57262 111.831L-1.19401e-05 117ZM174.724 0.583244L172.64 1.9642L173.193 2.79771L175.276 1.41676L174.724 0.583244ZM168.474 4.7261L164.307 7.48801L164.86 8.32152L169.026 5.55961L168.474 4.7261ZM160.14 10.2499L155.974 13.0118L156.526 13.8453L160.693 11.0834L160.14 10.2499ZM151.807 15.7737L147.64 18.5356L148.193 19.3691L152.36 16.6072L151.807 15.7737ZM143.474 21.2975L139.307 24.0594L139.86 24.8929L144.026 22.131L143.474 21.2975ZM135.14 26.8213L130.974 29.5832L131.526 30.4168L135.693 27.6549L135.14 26.8213ZM126.807 32.3452L122.64 35.1071L123.193 35.9406L127.36 33.1787L126.807 32.3452ZM118.474 37.869L114.307 40.6309L114.86 41.4644L119.026 38.7025L118.474 37.869ZM110.14 43.3928L105.974 46.1547L106.526 46.9882L110.693 44.2263L110.14 43.3928ZM101.807 48.9166L97.6404 51.6785L98.1929 52.512L102.36 49.7501L101.807 48.9166ZM93.4737 54.4404L89.3071 57.2023L89.8596 58.0358L94.0262 55.2739L93.4737 54.4404ZM85.1404 59.9642L80.9737 62.7261L81.5262 63.5596L85.6929 60.7977L85.1404 59.9642ZM76.8071 65.488L72.6404 68.2499L73.1929 69.0834L77.3596 66.3215L76.8071 65.488ZM68.4737 71.0118L64.3071 73.7737L64.8596 74.6073L69.0262 71.8453L68.4737 71.0118ZM60.1404 76.5356L55.9737 79.2975L56.5262 80.1311L60.6929 77.3692L60.1404 76.5356ZM51.8071 82.0594L47.6404 84.8213L48.1929 85.6549L52.3596 82.893L51.8071 82.0594ZM43.4737 87.5832L39.3071 90.3451L39.8596 91.1787L44.0262 88.4168L43.4737 87.5832ZM35.1404 93.107L30.9738 95.869L31.5263 96.7025L35.6929 93.9406L35.1404 93.107ZM26.8071 98.6309L22.6404 101.393L23.1929 102.226L27.3596 99.4644L26.8071 98.6309ZM18.4738 104.155L14.3071 106.917L14.8596 107.75L19.0263 104.988L18.4738 104.155ZM10.1404 109.678L5.97379 112.44L6.52629 113.274L10.6929 110.512L10.1404 109.678Z" fill="white"/>
          </clipPath>
          <line opacity="0.5" x1="176" y1="0" x2="0" y2="117" stroke="white" stroke-width="8" clip-path="url(#arrow2-mask)" ref="arrow2"/>
        </svg>
      </div>

      <div class="main-resto-bar__text main-resto-bar__text3 p1">
        <span ref="text3">{{data?.Small_description_right_center}}</span>
        <svg class="main-resto-bar__svg-dotted3" width="176" height="117" viewBox="0 0 176 117" fill="none" xmlns="http://www.w3.org/2000/svg">
          <clipPath id="arrow3-mask">
            <path opacity="0.5" d="M-1.19401e-05 117L5.76248 116.644L2.57262 111.831L-1.19401e-05 117ZM174.724 0.583244L172.64 1.9642L173.193 2.79771L175.276 1.41676L174.724 0.583244ZM168.474 4.7261L164.307 7.48801L164.86 8.32152L169.026 5.55961L168.474 4.7261ZM160.14 10.2499L155.974 13.0118L156.526 13.8453L160.693 11.0834L160.14 10.2499ZM151.807 15.7737L147.64 18.5356L148.193 19.3691L152.36 16.6072L151.807 15.7737ZM143.474 21.2975L139.307 24.0594L139.86 24.8929L144.026 22.131L143.474 21.2975ZM135.14 26.8213L130.974 29.5832L131.526 30.4168L135.693 27.6549L135.14 26.8213ZM126.807 32.3452L122.64 35.1071L123.193 35.9406L127.36 33.1787L126.807 32.3452ZM118.474 37.869L114.307 40.6309L114.86 41.4644L119.026 38.7025L118.474 37.869ZM110.14 43.3928L105.974 46.1547L106.526 46.9882L110.693 44.2263L110.14 43.3928ZM101.807 48.9166L97.6404 51.6785L98.1929 52.512L102.36 49.7501L101.807 48.9166ZM93.4737 54.4404L89.3071 57.2023L89.8596 58.0358L94.0262 55.2739L93.4737 54.4404ZM85.1404 59.9642L80.9737 62.7261L81.5262 63.5596L85.6929 60.7977L85.1404 59.9642ZM76.8071 65.488L72.6404 68.2499L73.1929 69.0834L77.3596 66.3215L76.8071 65.488ZM68.4737 71.0118L64.3071 73.7737L64.8596 74.6073L69.0262 71.8453L68.4737 71.0118ZM60.1404 76.5356L55.9737 79.2975L56.5262 80.1311L60.6929 77.3692L60.1404 76.5356ZM51.8071 82.0594L47.6404 84.8213L48.1929 85.6549L52.3596 82.893L51.8071 82.0594ZM43.4737 87.5832L39.3071 90.3451L39.8596 91.1787L44.0262 88.4168L43.4737 87.5832ZM35.1404 93.107L30.9738 95.869L31.5263 96.7025L35.6929 93.9406L35.1404 93.107ZM26.8071 98.6309L22.6404 101.393L23.1929 102.226L27.3596 99.4644L26.8071 98.6309ZM18.4738 104.155L14.3071 106.917L14.8596 107.75L19.0263 104.988L18.4738 104.155ZM10.1404 109.678L5.97379 112.44L6.52629 113.274L10.6929 110.512L10.1404 109.678Z" fill="white"/>
          </clipPath>
          <line opacity="0.5" x1="176" y1="0" x2="0" y2="117" stroke="white" stroke-width="8" clip-path="url(#arrow3-mask)" ref="arrow3"/>
        </svg>
      </div>

      <div class="main-resto-bar__text main-resto-bar__text4 p1">
        <span  ref="text4">{{data?.Small_description_right_lower}}</span>
        <svg class="main-resto-bar__svg-dotted4" width="241" height="79" viewBox="0 0 241 79" fill="none" xmlns="http://www.w3.org/2000/svg">
          <clipPath id="arrow4-mask">
            <path opacity="0.5" d="M241 77L237.105 72.7385L235.362 78.2426L241 77ZM233.951 74.2433L229.151 72.7233L228.849 73.6767L233.649 75.1967L233.951 74.2433ZM224.351 71.2033L219.551 69.6833L219.249 70.6367L224.049 72.1567L224.351 71.2033ZM214.751 68.1633L209.951 66.6433L209.649 67.5967L214.449 69.1167L214.751 68.1633ZM205.151 65.1233L200.351 63.6033L200.049 64.5567L204.849 66.0767L205.151 65.1233ZM195.551 62.0833L190.751 60.5633L190.449 61.5167L195.249 63.0367L195.551 62.0833ZM185.951 59.0433L181.151 57.5233L180.849 58.4767L185.649 59.9967L185.951 59.0433ZM176.351 56.0033L171.551 54.4833L171.249 55.4367L176.049 56.9567L176.351 56.0033ZM166.751 52.9633L161.951 51.4433L161.649 52.3967L166.449 53.9167L166.751 52.9633ZM157.151 49.9233L152.351 48.4033L152.049 49.3567L156.849 50.8767L157.151 49.9233ZM147.551 46.8833L142.751 45.3633L142.449 46.3167L147.249 47.8367L147.551 46.8833ZM137.951 43.8433L133.151 42.3233L132.849 43.2767L137.649 44.7967L137.951 43.8433ZM128.351 40.8033L123.551 39.2833L123.249 40.2367L128.049 41.7567L128.351 40.8033ZM118.751 37.7633L113.951 36.2433L113.649 37.1967L118.449 38.7167L118.751 37.7633ZM109.151 34.7233L104.351 33.2033L104.049 34.1567L108.849 35.6767L109.151 34.7233ZM99.5509 31.6833L94.7509 30.1633L94.449 31.1167L99.249 32.6367L99.5509 31.6833ZM89.9509 28.6433L85.151 27.1233L84.8491 28.0767L89.6491 29.5967L89.9509 28.6433ZM80.351 25.6033L75.551 24.0833L75.2491 25.0367L80.0491 26.5567L80.351 25.6033ZM70.751 22.5633L65.951 21.0433L65.6491 21.9967L70.4491 23.5167L70.751 22.5633ZM61.151 19.5233L56.351 18.0033L56.0491 18.9567L60.8491 20.4767L61.151 19.5233ZM51.551 16.4833L46.751 14.9633L46.4491 15.9167L51.2491 17.4367L51.551 16.4833ZM41.951 13.4433L37.151 11.9233L36.8491 12.8767L41.6491 14.3967L41.951 13.4433ZM32.351 10.4033L27.551 8.88335L27.2491 9.83669L32.0491 11.3567L32.351 10.4033ZM22.751 7.36335L17.951 5.84336L17.6491 6.7967L22.4491 8.3167L22.751 7.36335ZM13.151 4.32336L8.35104 2.80336L8.04915 3.7567L12.8491 5.2767L13.151 4.32336ZM3.55104 1.28336L1.15093 0.523324L0.849039 1.47667L3.24915 2.2367L3.55104 1.28336Z" fill="white"/>
          </clipPath>
          <line opacity="0.5" x1="0" y1="0" x2="241" y2="79" stroke="white" stroke-width="8" clip-path="url(#arrow4-mask)" ref="arrow4"/>
        </svg>
      </div>

      <div class="main-resto-bar__circle-btn">
        <CircleBtn :textBtn="$t('read more')" :linkBtn="'restaurant'" />
      </div>
    </div>
  </div>
</template>

<script>
import CircleBtn from "~/components/common/CircleBtn.vue";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin";
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
import { animateJS } from "~/plugins/animations";

export default {
  components: {
    CircleBtn
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    // drawImage() {
    //   const images = gsap.utils.toArray(".image-logo");

    //   images.forEach((el) => {
    //     const tl = gsap.timeline({
    //       scrollTrigger: {
    //         trigger: el,
    //         start: 'bottom bottom',
    //       },
    //     });
  
    //     tl.from(
    //       el.querySelectorAll("path"),
    //       { delay: 0.5, duration: 2.5, drawSVG: '50% 50%' },
    //     )
    //   });
    // },
  },
  mounted() {
    this.$nextTick(() => {
      const {text1, text2, text3, text4, arrow1, arrow2, arrow3, arrow4} = this.$refs;
      const text = [text1, text2, text3, text4];
      const arrowsDraw = [arrow1, arrow2, arrow3, arrow4];

      if (this.$refs.imageBg) {
        animateJS('scaleFullImage', this.$refs.imageBg);
      }

      if (this.$refs.title) {
        animateJS('splitTitleLeft', this.$refs.title);
      }

      if (arrowsDraw) {
        animateJS('drawSvg', arrowsDraw);
      }

      if (text) {
        animateJS('splitText', text);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/utilities/indents";

.main-resto-bar {
  @include pt-coral;
  @include pb-coral;
  width: 100%;
  min-height: 656px;
  position: relative;
  overflow: hidden;

  @include min(xl) {
    min-height: 744px;
  }  
  @include min(bg) {
    min-height: 992px;
  }
}
.main-resto-bar__img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));

    @include min(lg){
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
    }
  }
}
.main-resto-bar__inner {
  width: 100%;
  height: 100%;
}
.main-resto-bar__title {
  @include mb-blueviolet;
  width: 200px;
  color: #FFFFFF;

  @include min(tb) {
    margin-bottom: 88px;
    width: 260px;
  }  
  @include min(md) {
    margin-bottom: 104px;
  }  
  @include min(bg) {
    margin-bottom: 233px;
    width: 625px;
  }
}
.main-resto-bar__title-word {
  display: inline-block;
}
.main-resto-bar__title-word--second {
  @include min(md) {
    text-indent: 3ch;
  }
}
.main-resto-bar__svg {
  position: absolute;
  width: 44%;
  height: 420px;
  top: 101px;
  left: 146px;

  transform: rotate(353deg);

  @include min(tb) {
    width: auto;
    height: 283px;
    top: -35px;
    left: 420px;
    transform: rotate(-88deg);
  }
  @include min(950) {
    height: 363px;
    transform: rotate(-90deg);
    top: -64px;
    left: 465px;
  }
  @include min(md) {
    height: 406px;
    top: -74px;
    left: 570px;
    left: 50%;
    transform: rotate(-85deg);
  }
  @include min(1180) {
    height: 456px;
    top: -102px;
    left: 55%;
  }
  @include min(lg) {
    height: 506px;
    top: -122px;
  }
  @include min(xl) {
    height: 605px;
    top: -172px;
    left: 52%;
    transform: rotate(-88deg);
  }
  @include min(1600) {
    height: 695px;
    top: -100px;
    left: 55%;
    transform: rotate(-82deg);
  }
  @include min(bg) {
    height: 865px;
    top: -222px;
    left: 50%;
    transform: rotate(-86deg);
  }
}
.main-resto-bar__text {
  color: #FFFFFF;
}
.main-resto-bar__text1{
  @include mb-cornflowerblue;
  max-width: 312px;
  text-indent: 6ch;

  &::before {
    content: "/*";
    position: absolute;
    left: 0;
    text-indent: 0ch;
  }

  @include min(tb) {
    margin-left: auto;
    margin-bottom: 23px;
  }
  @include min(bg) {
    max-width: 384px;
    margin-right: 77px;
    margin-bottom: 158px;
  }
}
.main-resto-bar__text2 {
  @include mb-cornflowerblue;
  max-width: 225px;
  width: 100%;

  @include min(tb) {
    margin-bottom: 98px;
    position: relative;
  }
  @include min(tb) {
    margin-bottom: 81px;
  }
  @include min(bg) {
    position: absolute;
    top: 50%;
    left: 190px;
    max-width: 300px;
  }
}
.main-resto-bar__svg-dotted2 {
  display: none;

  @include min(tb) {
    width: 120px;
    height: 165px;
    display: block;
    position: absolute;
    top: -165px;
    left: 9px;
    transform: rotate(-95deg);
  }
  @include min(xl) {
    width: 160px;
    height: 238px;
    top: -218px;
  }
  @include min(bg) {
    width: 250px;
    height: 318px;
    top: -278px;
    transform: rotate(-105deg);
  }
}
.main-resto-bar__text3 {
  @include mb-cornflowerblue;
    max-width: 225px;

  @include min(tb) {
    position: relative;
    margin-bottom: 126px;
    margin-left: auto;
    margin-right: 171px;
  }
  @include min(md) {
    margin-right: 233px;
    margin-bottom: 120px;
  }
  @include min(bg) {
    max-width: 277px;
    margin-right: 486px;
    margin-bottom: 187px;
  }
}
.main-resto-bar__svg-dotted3 {
  display: none;

  @include min(tb) {
    width: 175px;
    height: 210px;
    display: block;
    position: absolute;
    top: -180px;
    right: -51px;
  }
  @include min(xl) {
    width: 215px;
    height: 256px;
    top: -200px;
    right: -100px;
    transform: rotate(5deg);
  }
}
.main-resto-bar__text4 {
  margin-bottom: 116px;

  @include min(tb) {
    position: relative;
    margin-bottom: 16px;
    text-align: right;
  }
  @include min(bg) {
    margin-bottom: 0;
    padding-right: 220px;
  }
}
.main-resto-bar__svg-dotted4 {
  display: none;

  @include min(tb) {
    width: 214px;
    height: 252px;
    display: block;
    position: absolute;
    top: -190px;
    right: 95px;
    transform: rotate(5deg);
  }
  @include min(xl) {
    width: 264px;
    right: 90px;
    transform: rotate(0deg);
  }
  @include min(bg) {
    width: 284px;
    top: -220px;
    right: 284px;
    transform: rotate(10deg);
  }
}
.main-resto-bar__circle-btn {
  position: absolute;
  bottom: 48px;
  left: 18px;

  @include min(tb) {
    bottom: 56px;
    left: 40px;
  }
  @include min(bg) {
    bottom: 80px;
    left: 80px;
  }
}
</style> 