<template>
  <div class="error">
    <AppHeader />

    <div 
      class="error__card"
      v-for="(item, id) in getAccommodations"
      :key="id"
      :class="`error__card-${id + 1}`"
    >
      <div class="error__card-img">
        <img
          :src="`${getApiUrl()}${item?.attributes?.Main_room?.Room_cover_background?.data?.attributes?.url}`"
          :alt="item?.attributes?.Title_room" />
      </div>
      <div class="error__card-info">
        <p>{{item?.attributes?.Main_room?.Title_room}}</p>
        <NuxtLink class="a1 hover-linear-dark" :to="localePath(`/accommodations/${item?.attributes?.Slug}`)">{{$t('book now')}}</NuxtLink>
      </div>
    </div>

    <div class="error__title" ref="title">
      <svg width="484" height="108" viewBox="0 0 484 108" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M124.826 106.727V82.2092H155.284V66.3671H124.826V2.05571H103.798L0.541016 67.7816V82.2092H107.569V106.727H124.826ZM107.569 19.0294V66.3671H59.3831C48.4445 66.3671 36.5629 67.3101 26.473 68.3473L107.569 19.0294Z" fill="#F8F8F8"/>
        <path d="M241.941 107.764C297.954 107.764 313.607 89.5644 313.607 54.2969C313.607 19.0294 297.954 0.829834 241.941 0.829834C185.833 0.829834 170.274 19.0294 170.274 54.2969C170.274 89.5644 185.833 107.764 241.941 107.764ZM241.941 91.639C195.829 91.639 187.625 78.4372 187.625 54.2969C187.625 30.2509 195.829 16.8605 241.941 16.8605C287.958 16.8605 296.162 30.1566 296.162 54.2969C296.162 78.4372 287.958 91.639 241.941 91.639Z" fill="#F8F8F8"/>
        <path d="M453.542 106.727V82.2092H484V66.3671H453.542V2.05571H432.514L329.257 67.7816V82.2092H436.285V106.727H453.542ZM436.285 19.0294V66.3671H388.099C377.161 66.3671 365.279 67.3101 355.189 68.3473L436.285 19.0294Z" fill="#F8F8F8"/>
      </svg>

      <div class="error__title-btn">
        <CircleBtn
          :textBtn="$t('book now')"
          :linkBtn="'choose-apartment'"
        />
      </div>
    </div>

    <div class="error__text p1" ref="text">
      <span>{{$t('oops, somethings went wrong')}}</span>
      <NuxtLink class="error__text-link hover-linear-white" :to="localePath(`/`)">{{$t('go to main')}}</NuxtLink>
    </div>

    <div class="error__bg">
      <svg width="499" height="449" viewBox="0 0 499 449" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.06">
        <path d="M190.736 436.363L249.913 369.805L309.093 436.363H190.736ZM75.9651 362.064V297.022L88.382 283.061V362.064H100.17V269.796L130.586 235.591L160.995 269.792V362.064H172.784V283.052L185.198 297.016V362.064H196.989V310.275L209.404 324.242V362.064H221.192V337.502L241.845 360.733L170.734 440.711C168.619 443.09 168.944 444.873 169.325 445.726C169.709 446.576 170.829 448 174.003 448H325.82C327.562 448 329.094 447.009 329.813 445.414C330.53 443.822 330.252 442.019 329.089 440.711L257.982 360.73L278.628 337.508V362.061H290.419V324.247L302.834 310.282V362.061H314.622V297.024L327.034 283.061V362.061H338.823V269.799L369.24 235.585L399.647 269.792V362.061H411.439V283.052L423.855 297.016V362.061H435.642V310.275L448.061 324.242V362.061H459.85V337.502L481.594 361.959L481.694 362.069H497.829L369.481 217.707L369.233 217.428L249.91 351.657L130.829 217.728L130.578 217.449L2.49689 361.517L2 362.077L18.1347 362.069L39.971 337.508V362.064H51.76V324.247L64.1738 310.282V362.064H75.9651Z" stroke="white"/>
        <path d="M124.379 267.944H112.585V362.065H124.379V267.944Z" stroke="white"/>
        <path d="M148.582 267.944H136.793V362.065H148.582V267.944Z" stroke="white"/>
        <path d="M351.239 362.064H363.033V267.943H351.239V362.064Z" stroke="white"/>
        <path d="M387.236 267.944H375.447V362.065H387.236V267.944Z" stroke="white"/>
        <path d="M261.509 52.3535C265.524 52.3535 268.791 49.0881 268.791 45.0725C268.791 41.0537 265.524 37.7883 261.509 37.7883C257.49 37.7883 254.225 41.0537 254.225 45.0725C254.225 49.0881 257.49 52.3535 261.509 52.3535Z" stroke="white"/>
        <path d="M157.983 204.773L249.907 101.371L341.84 204.771L249.91 308.17L157.983 204.773ZM249.91 326.315L357.776 204.991L357.974 204.765L258.256 92.6096C293.204 55.1592 321.974 52.05 327.397 51.8073C329.912 51.6741 331.957 50.1107 333.17 47.3675L333.497 46.2489C333.939 44.0057 333.495 42.5809 331.839 40.9753L331.173 40.4157C308.646 21.5201 277.653 19.2248 265.375 19.1153C262.617 19.0916 255.874 18.9821 253.8 18.8144C226.395 16.5872 215.114 7.48094 210.828 2.25098L210.551 1.91411L210.125 1.80385C205.999 0.753418 201.831 0.418845 197.693 0.797827L196.027 0.951709L196.54 2.54115C197.36 5.09603 205.934 27.6122 252.972 31.3798C255.398 31.5758 262.193 31.7044 265.001 31.7511C273.078 31.8874 293.575 33.1836 311.119 42.1934C296.864 46.51 269.391 58.9376 240.132 94.1393L142.034 204.564L141.836 204.789L249.659 326.035L249.91 326.315Z" stroke="white"/>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import AppHeader from "~/components/common/AppHeader.vue";
import CircleBtn from "~/components/common/CircleBtn.vue";
import { animateJS } from "~/plugins/animations";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin";
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
import { mapGetters } from "vuex";

export default {
  components: {
    AppHeader,
    CircleBtn
  },
  computed: {
    ...mapGetters("allAccommodations", ["getAccommodationsData"]),

    getAccommodations() {
      return [...this.getAccommodationsData.slice(0, 2), ...this.getAccommodationsData.slice(-2)]
    },
  },
  methods: {
    mobileHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
    fadeCards() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".error",
        },
        delay: 0,
        duration: 0.5,
        ease: "none",
      });

      tl.from(".error__card", { opacity: 0, stagger: 0.25 }, "first")
        .from(".error__bg svg path", { duration: 1.2, drawSVG: '50% 50%' }, "first")
        .from(".error__card-1", { top: "40%", left: "40%" }, "second")
        .from(".error__card-2", { top: "55%", left: "40%" }, "second")
        .from(".error__card-3", { bottom: "50%", right: "35%" }, "second")
        .from(".error__card-4", { top: "35%", right: "45%" }, "second");
    },
  },
  mounted() {
    this.mobileHeight();
    this.fadeCards();

    this.$nextTick(() => {
      animateJS('splitTitleLeft', this.$refs.text);
      animateJS('splitText', this.$refs.title);
    });
  }
};
</script>

<style lang='scss' scoped>
@import "~/assets/scss/utilities/indents";

.error {
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: $black-color;
  overflow: hidden;
  position: relative;
}
.error__bg {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;

  svg {
    width: 375px;
    height: 338px;

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
}
.error__title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  svg {
    width: 301px;
    height: 67px;

    @include min(tb) {
      width: 339px;
      height: 75px;
    }
    @include min(md) {
      width: 327px;
      height: 72px;
    }
    @include min(xl) {
      width: 484px;
      height: 106px;
    }
    @include min(bg) {
      width: 645px;
      height: 143px;
    }
  }

  &-btn {
    position: absolute;
    z-index: 5;
    bottom: -79px;
    right: -21px;

    @include min(tb) {
      bottom: -75px;
      right: -64px;
    }
    @include min(md) {
      display: none;
    }
  }
}
.error__text {
  margin-top: auto;
  margin-bottom: 32px;
  color: $white-color;
  position: relative;
  z-index: 5;

  @include min(xl) {
    margin-bottom: 40px;
  }

  &-link {
    opacity: 1;
  }
}
.error__card {
  padding: 4px;
  width: 368px;
  display: none;
  background-color: $grey-color;
  position: absolute;
  z-index: 10;

  @include min(md) {
    display: block;
  }
  @include min(xl) {
    width: 402px;
  }
  @include min(bg) {
    padding: 6px;
    width: 542px;
  }

  &:nth-of-type(1) {
    z-index: 3;
    top: 11%;
    left: 12%;

    @include min(xl) {
      top: 15%;
      left: 10.2%;
    }
    @include min(bg) {
      top: 13.6%;
      left: 9.95%;
    }
  }
  &:nth-of-type(2) {
    top: 38.8%;
    left: -1.1%;

    @include min(xl) {
      top: 46.8%;
      left: 11.4%;
    }
    @include min(bg) {
      top: 42.6%;
      left: 4.2%;
    }
  }
  &:nth-of-type(3) {
    z-index: 3;
    bottom: 12.5%;
    right: 8.2%;

    @include min(xl) {
      bottom: 24.3%;
      right: 3.6%;
    }
    @include min(bg) {
      bottom: 9.9%;
      right: 9.9%;
    }
  }
  &:nth-of-type(4) {
    top: 28.6%;
    right: -1.1%;

    @include min(xl) {
      top: 26.7%;
      right: 4.8%;
    }
    @include min(bg) {
      top: 27.1%;
      right: 4.2%;
    }
  }

  &-img {
    height: 212px;

    @include min(xl) {
      height: 232px;
    }
    @include min(bg) {
      height: 310px;
    }
  }
  &-info {
    margin: 8px 14px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include min(xl) {
      margin: 9px 16px auto;
    }
    @include min(bg) {
      margin: 14px 20px auto;
    }
  }
  &-info p {
    margin-bottom: 6px;
    font-family: $font-second;
    font-style: normal;
    font-weight: $font-weight;
    font-size: 22px;
    line-height: 1.2;
    text-transform: uppercase;

    @include min(xl) {
      margin-bottom: 8px;
      font-size: 24px;
    }
    @include min(bg) {
      margin-bottom: 10px;
      font-size: 32px;
    }
  }
  &-info a {
    opacity: 1;

    white-space: nowrap;
  }
}

@media (hover: hover) {
  .error__text-link:active {
    color: $white-color;
  }
  .error__text-link:disabled {
    color: $black-color;
  }
  .error__card:hover {
    z-index: 5;
  }
}
</style>
