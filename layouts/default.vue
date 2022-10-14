<template>
  <div class="wrapper">
    <div class="preloader">
      <Loader v-if="!removeLoader" :hide="!loading" />
      <Nuxt />
    </div>
    <div class="top-element" ref="topElement"></div>
    <div class="dark-overlay" ref="darkOverlay"></div>
    <div class="white-overlay" ref="whiteOverlay"></div>
  </div>
</template>

<script>
import Loader from "~/pages/loader/index.vue";
import { mapMutations } from "vuex";

export default {
  components: {
    Loader
  },
  async fetch() {
    await this.$store.dispatch("headerAndMenu/getMenuData");
    await this.$store.dispatch("footer/getFooterData");
    await this.$store.dispatch("contactPage/getData");
    await this.$store.dispatch("accommodationsPage/getData");
    await this.$store.dispatch("allAccommodations/getAccommodationsData");
    await this.$store.dispatch("mainPage/getWeatherData");
  },
  watch: {
    "$i18n.locale"() {
      this.$fetch();
    },
    $route (to, from){
      if(from.path !== to.path){
        const {topElement, darkOverlay, whiteOverlay} = this.$refs;
        whiteOverlay.classList.add("active");
        darkOverlay.classList.add("active");
        topElement.classList.add("active");
        whiteOverlay.addEventListener("animationend", () => {
          whiteOverlay.classList.remove("active");
          darkOverlay.classList.remove("active");
          topElement.classList.remove("active");
        })
      }
    }
  },
  data() {
    return {
      loading: true,
      removeLoader: false
    };
  },
  methods: {
    ...mapMutations({
      setCurrentTime: 'mainPage/setCurrentTime'
    }),
    mobileHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
  },
  mounted() {
    this.mobileHeight();

    const body = document.body;
    body.style.overflow = "hidden";

    setTimeout(() => {
      this.loading = false;
      body.removeAttribute("style");
    }, 3300);
    setTimeout(() => {
      this.removeLoader = true;
    }, 6300);
    
    setInterval(this.setCurrentTime, 1000);
  },
};
</script>

<style lang="scss" scoped>
.preloader {
  min-height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
}
.white-overlay{
  visibility: hidden;
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #f8f8f8;

  &.active{
    animation: whiteOverlay 0.8s forwards ease-in;
  }
}
.dark-overlay{
  visibility: hidden;
  z-index: 9000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: black;
  opacity: 0;

  &.active{
    animation: darkOverlay 0.8s forwards ease-in;
  }
}
.top-element{
  visibility: hidden;
  z-index: 9000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: #f8f8f8;
  
  &.active{
    animation: topElement 0.8s forwards ease-in;
  }
}

@keyframes whiteOverlay{
  0%{
    visibility: hidden;
    transform: translateY(110%);
  }
  1%{
    visibility: visible;
    transform: translateY(110%);
  }
  65%{
    visibility: visible;
    transform: translateY(0%);
  }
  100%{
    visibility: visible;
    transform: translateY(0%);
  }
}
@keyframes topElement{
  0%{
    visibility: hidden;
    transform: translateY(-110%);
  }
  1%{
    visibility: visible;
    transform: translateY(-110%);
  }
  65%{
    visibility: visible;
    transform: translateY(0%);
  }
  100%{
    visibility: visible;
    transform: translateY(0%);
  }
}

@keyframes darkOverlay{
  0%{
    visibility: hidden;
    opacity: 0;
  }
  1%{
    visibility: visible;
    opacity: 0;
  }
  65%{
    visibility: visible;
    opacity: 0.5;
  }
  100%{
    visibility: visible;
    opacity: 0.5;
  }
}
</style>
