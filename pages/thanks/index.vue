<template>
  <div class="wrapper">
    <AppHeader />

    <div class="thanks-page page container block-wrapper">
      <div v-if="getChooseData?.Thank_for_request?.Photo?.data?.attributes?.url" class="thanks-page__bg">
        <img :src="`${getApiUrl()}${getChooseData?.Thank_for_request?.Photo?.data?.attributes?.url}`" alt="" ref="bgImage">
      </div>

      <div class="thanks-page__inner">
        <h1
          v-if="getChooseData?.Thank_for_request?.Title"
          class="thanks-page__title h2"
          ref="title"
        >{{getChooseData?.Thank_for_request?.Title}}</h1>

        <p
          v-if="getChooseData?.Thank_for_request?.Description"
          class="thanks-page__text p1"
          ref="text"
        >{{getChooseData?.Thank_for_request?.Description}}</p>

        <div class="thanks-page__link" ref="link">
          <NuxtLink
            class="hover-linear-white a1"
            :to="localePath(`/`)"
          >{{$t('go to main')}}</NuxtLink>
        </div>
      </div>

      <div v-if="getChooseData?.Thank_for_request?.Images?.data[0]?.attributes?.url" class="thanks-page__image thanks-page__image--top block-wrapper">
        <img :src="`${getApiUrl()}${getChooseData?.Thank_for_request?.Images?.data[0]?.attributes?.url}`" alt="" ref="topImage">
      </div>

      <div v-if="getChooseData?.Thank_for_request?.Images?.data[1]?.attributes?.url" class="thanks-page__image thanks-page__image--right block-wrapper">
        <img :src="`${getApiUrl()}${getChooseData?.Thank_for_request?.Images?.data[1]?.attributes?.url}`" alt="" ref="rightImage">
      </div>

      <div v-if="getChooseData?.Thank_for_request?.Images?.data[2]?.attributes?.url" class="thanks-page__image thanks-page__image--left block-wrapper">
        <img :src="`${getApiUrl()}${getChooseData?.Thank_for_request?.Images?.data[2]?.attributes?.url}`" alt="" ref="leftImage">
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "~/components/common/AppHeader.vue";
import AppFooter from "~/components/common/AppFooter.vue";
import { animateJS } from "~/plugins/animations";
import { mapGetters } from "vuex";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  async asyncData({ store }) {
    await store.dispatch("choosePage/getChooseData");
  },
  computed: {
    ...mapGetters("choosePage", ["getChooseData"]),
  },
  data(){
    return {
      timer: 5,
      interval: null
    }
  },
  methods: {
    mobileHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
    goToMain() {
      this.timer -= 1;
      if (this.timer === 0) {
        this.$router.push("/")
      }
    }
  },
  mounted() {
    this.mobileHeight();

    this.interval = setInterval(this.goToMain, 1000);

    this.$nextTick(() => {
      const images = [this.$refs.leftImage, this.$refs.topImage, this.$refs.rightImage];

      animateJS('fade', images);
      animateJS('splitTitleLeft', this.$refs.title);
      animateJS('splitText', this.$refs.text);
      animateJS('splitText', this.$refs.link);
      animateJS('scaleFullImage', this.$refs.bgImage);
    });
  },
  beforeDestroy(){
    clearInterval(this.interval);
  }
};
</script>

<style lang="scss" scoped>

.thanks-page {
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;
  color: #FFFFFF;
}
.thanks-page__bg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
}
.thanks-page__inner {
  margin-top: calc(var(--vh, 1vh) * 32);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 2;

  @include min(tb) {
    margin-top: calc(var(--vh, 1vh) * 34);
  }
  @include min(md) {
    margin-top: calc(var(--vh, 1vh) * 32.7);
  }
  @include min(xl) {
    margin-top: calc(var(--vh, 1vh) * 31.3);
  }
  @include min(bg) {
    margin-top: calc(var(--vh, 1vh) * 37);
  }
}
.thanks-page__title {
  width: 83.5%;

  @include min(tb) {
    width: 51%;
  }
  @include min(md) {
    width: 41%;
  }
  @include min(xl) {
    width: 38.2%;
  }
}
.thanks-page__text {
  @include mt-cornflowerblue;
  width: 100%;

  @include min(tb) {
    width: 51%;
  }
  @include min(md) {
    width: 37.8%;
  }
  @include min(xl) {
    width: 28%;
  }
  @include min(bg) {
    width: 20%;
  }
}
.thanks-page__link {
  @include mt-antiquewhite;
}
.thanks-page__image {
  position: absolute;
  z-index: 1;
}
.thanks-page__image--top {
  width: 70%;
  height: 31.5vh;
  top: calc(var(--vh, 1vh) * 12);
  right: 18px;

  @include min(tb) {
    width: 265px;
    height: 191px;
    top: calc(var(--vh, 1vh) * 14);
    right: 14.7%;
  }
  @include min(md) {
    width: 308px;
    height: 222px;
    top: 85px;
    right: 19.4%;
  }
  @include min(xl) {
    width: 458px;
    height: 330px;
    top: 105px;
    right: 10.2%;
  }
  @include min(bg) {
    width: 653px;
    height: 471px;
    top: 133px;
    right: 15.7%;
  }
}
.thanks-page__image--right {
  width: 48%;
  height: 17.4vh;
  top: calc(var(--vh, 1vh) * 37);
  right: 0;

  @include min(tb) {
    width: 211px;
    height: 122px;
    top: calc(var(--vh, 1vh) * 35.5);
  }
  @include min(md) {
    width: 283px;
    height: 164px;
  }
  @include min(xl) {
    width: 383px;
    height: 222px;
    top: calc(var(--vh, 1vh) * 49);
  }
  @include min(bg) {
    width: 511px;
    height: 296px;
    top: calc(var(--vh, 1vh) * 36);
  }
}
.thanks-page__image--left {
  width: 47%;
  height: 27.5vh;
  bottom: 0;
  left: 0;

  @include min(tb) {
    width: 221px;
    height: 208px;
    left: 40px;
  }
  @include min(md) {
    width: 223px;
    height: 210px;
    left: 48px;
  }
  @include min(xl) {
    width: 319px;
    height: 301px;
    left: 64px;
  }
  @include min(bg) {
    width: 443px;
    height: 418px;
    left: 80px;
  }
}
</style>