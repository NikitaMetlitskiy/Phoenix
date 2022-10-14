<template>
  <nav 
    class="header container"
    :class="{
      header_visible: isMenuVisible,
      header_hidden: !isMenuVisible,
      header_fixed: isMenuFixed,
      bg_hidden: isBgHidden,
      dark: isMenuDark,
      grey: isMenuGrey
    }"
    ref="header"
  >
    <div class="header__cover"></div>
    <button
      class="header-burger p1"
      type="button"
      ref="menu_burger"
      @click="toggleMenu"
    >
      <div class="header-burger__btn">
        <span class="header-burger__line header-burger__line--top"></span>
        <span class="header-burger__line header-burger__line--bottom"></span>
      </div>

      <div class="header-burger__text" ref="menu_title">{{ $t("menu") }}</div>
    </button>

    <div
      class="header-additional"
      :class="{
        'hover-nonlinear-white': !darkTheme,
        'hover-nonlinear-dark': darkTheme
      }"
      ref="additional"
      @click="toggleModal"
    >
      <p class="p1">{{ $t("apartments & chalets") }}</p>
      <span></span>
    </div>

    <Logo class="header-logo" :dark="isMenuDark" />

    <div class="menu__app">
      <div class="menu__app-time p1"> {{getCurrentTime}} </div>
      <div class="menu__app-weather p1">
        <span>{{weather.temp}}°C</span>
        <img :src="weather.icon" alt="icon-weather" />
      </div>
    </div>

    <LanguageList class="header-lang" />

    <a class="header-phone" href="#">
      <svg 
        v-if="isMenuDark"
        class="header-phone__svg-dark"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5.12972 1H2.68421C1.75405 1 1 1.75405 1 2.68421C1 10.5906 7.4094 17 15.3158 17C16.246 17 17 16.246 17 15.3158V12.8703C17 12.1433 16.5574 11.4896 15.8825 11.2197L13.5397 10.2825C12.9334 10.04 12.2429 10.1494 11.7413 10.5674L11.1361 11.0718C10.4297 11.6604 9.39107 11.6133 8.74091 10.9631L7.03687 9.25909C6.38671 8.60893 6.33959 7.57027 6.92822 6.86391L7.43257 6.25869C7.8506 5.75706 7.95998 5.06662 7.71747 4.46034L6.78034 2.11753C6.51036 1.44258 5.85666 1 5.12972 1Z" stroke="#363735" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <svg 
        v-else
        class="header-phone__svg-white"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5.12972 1H2.68421C1.75405 1 1 1.75405 1 2.68421C1 10.5906 7.4094 17 15.3158 17C16.246 17 17 16.246 17 15.3158V12.8703C17 12.1433 16.5574 11.4896 15.8825 11.2197L13.5397 10.2825C12.9334 10.04 12.2429 10.1494 11.7413 10.5674L11.1361 11.0718C10.4297 11.6604 9.39107 11.6133 8.74091 10.9631L7.03687 9.25909C6.38671 8.60893 6.33959 7.57027 6.92822 6.86391L7.43257 6.25869C7.8506 5.75706 7.95998 5.06662 7.71747 4.46034L6.78034 2.11753C6.51036 1.44258 5.85666 1 5.12972 1Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>

    <NuxtLink 
      class="header-book a1"
      :class="{
        'hover-linear-dark': isMenuDark,
        'hover-linear-white': !isMenuDark
      }"
      :to="localePath('/choose-apartment')"
      ref="btnBook"
    >{{ $t("book now") }}</NuxtLink>

    <AppMenu ref="menu" />

    <ModalApartments
      :dark="darkTheme"
      ref="modal"
    />
  </nav>
</template>

<script>
import Logo from "~/components/common/Logo.vue";
import LanguageList from "~/components/common/LanguageList.vue";
import AppMenu from "~/components/common/AppMenu.vue";
import ModalApartments from "~/components/common/ModalApartments.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Logo,
    LanguageList,
    AppMenu,
    ModalApartments
  },
  data() {
    return {
      isMenuFixed: true,
      isMenuVisible: false,
      isBgHidden: true,
      isMenuDark: null,
      isMenuGrey: null,
    };
  },
  props: {
    darkTheme: {
      type: Boolean,
      default: false,
    },
    greyTheme: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters("mainPage", ["getWeather"]),
    ...mapGetters("mainPage", ["getCurrentTime"]),

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
  },
  methods: {
    scrollMenuShow() {
      let lastScroll = 0;

      window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
          this.isBgHidden = true;
          return;
        }
        if (this.isAnimMenu) {
          return;
        }
        if (currentScroll > lastScroll) {
          this.isMenuVisible = true; // scroll down
          this.isBgHidden = false;
        } else if (currentScroll < lastScroll) {
          this.isMenuVisible = false; // scroll up
        }

        lastScroll = currentScroll;
      });
    },
    toggleMenu() {
      let menu = "menu";
      let close = "close";
      if (this.$i18n.locale === "en") {
        menu = "menu";
        close = "close";
      } else {
        menu = "меню";
        close = "закрити";
      }

      this.$refs.menu_burger.classList.toggle("active");
      this.$refs.menu.$el.classList.toggle("active");
      this.hideScroll();

      if (this.$refs.menu_burger.classList.contains("active")) {
        this.$refs.menu_title.textContent = `${close}`;
        this.$refs.menu.drawImage();
        // this.$refs.menu.currentTime();
        this.isMenuDark = false;
        // this.isMenuGrey = false;
        setTimeout(() => {
          this.$refs.header.classList.add("active");
        }, 0);
      } else {
        this.$refs.menu_title.textContent = `${menu}`;
        this.$refs.menu.disableImage();
        this.isMenuDark = this.darkTheme;
        setTimeout(() => {
          this.$refs.header.classList.remove("active");  
        }, 0);
        // this.isMenuGrey = this.greyTheme;
      }
    },
    hideScroll() {
      const body = document.body;

      if (this.$refs.menu_burger.classList.contains("active")) {
        body.classList.add("lock");
      } else {
        body.classList.remove("lock");
      }
    },
    toggleModal() {
      document.body.classList.toggle("lock");
      this.$refs.modal.$el.classList.toggle('active');
      this.$refs.additional.classList.toggle('active');

      if (this.$refs.modal.$el.classList.contains('active')) {
        this.$refs.modal.animationInfo();
        this.$refs.modal.fadeItems();
        this.$refs.modal.clickOutsideHandler();
      }
    }
  },
  mounted() {
    this.isMenuDark = this.darkTheme;
    this.isMenuGrey = this.greyTheme;

    if (window.pageYOffset == 0) {
      this.isBgHidden = true;
    } else {
      this.isBgHidden = false;
    }

    this.windowWidth = window.innerWidth;
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    this.scrollMenuShow();
    this.hideScroll();
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/utilities/indents";

.header {
  @include pt-crimson;
  @include pb-crimson;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  border-bottom: 1px solid rgba(#FFFFFF, 0.1);
  color: #FFFFFF;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
}
.header.dark,
.header.dark.grey {
  color: $black-color;
  border-bottom: 1px solid rgba($black-color, 0.1);

  .header-burger__line {
    background-color: $black-color;
  }
  .header-book {
    color: $black-color;
  }
  .header-additional span {
    background-image: url("~/static/icons/arrow-down-black.svg");
  }
}
.header_fixed {
  position: fixed;
}
.header_visible {
  background-color: $black-color;
  opacity: 0;
  transform: translateY(-105%);
  transition: background-color 0.3s linear, opacity 0.3s linear, transform 0.3s linear;

  &.dark {
    background-color: $white-color;
  }
  &.dark.grey {
    background-color: #f2f2f2;
  }
}
.header_hidden {
  background-color: $black-color;
  opacity: 1;
  transform: translateY(0);
  transition: background-color 0.3s linear, opacity 0.3s linear, transform 0.3s linear;

  &.dark {
    background-color: $white-color;
  }
  &.dark.grey {
    background-color: #f2f2f2;
  }
}
.bg_hidden {
  background: transparent;
  border: none;
  transition: background-color 0.3s linear, border 0.3s linear;

  &.dark {
    border: none;
  }
}
.header__cover{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 1px);
  background-color: transparent;
  z-index: 99;
  transition: background-color 0.3s linear 0.9s;
}
.header-burger {
  display: flex;
  align-items: center;
  background-color: transparent;
  opacity: 1;
  transition: transform 0.5s cubic-bezier(.37,.53,.38,1), opacity 0.5s cubic-bezier(.37,.53,.38,1);
  position: relative;
  z-index: 100;

  &__btn {
    width: 20px;
    height: 8px;
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @include min(tb) {
      width: 28px;
    }
    @include min(bg) {
      width: 40px;
    }
  }

  &__line {
    display: block;
    width: 100%;
    height: 1px;
    background-color: #FFFFFF;
    transition: all 0.5s cubic-bezier(.37,.53,.38,1);
  }

  &__text {
    margin-left: 8px;
    line-height: 1;

    @include min(tb) {
      margin-left: 16px;
    }
    @include min(md) {
      margin-left: 12px;
    }
    @include min(xl) {
      margin-left: 16px;
    }
  }
}
.header-burger.active {
  opacity: 1;
  transition: opacity 0.2s linear;

  .header-burger__line--top {
    transform: rotate(45deg) translateX(1px) translateY(3.5px);
    transition: transform 0.3s cubic-bezier(.37,.53,.38,1);

    @include min(md) {
      transform: rotate(45deg) translateX(1px) translateY(4px);
    }
  }

  .header-burger__line--bottom {
    transform: rotate(-45deg) translateX(1.5px) translateY(-4px);
    transition: transform 0.3s cubic-bezier(.37,.53,.38,1);

    @include min(md) {
      transform: rotate(-45deg) translateX(0.5px) translateY(-3.5px);
    }
  }
}
.header-additional {
  display: none;
  position: relative;
  cursor: pointer;
  
  opacity: 1;
  visibility: visible;
  transition: opacity 0.5s cubic-bezier(.62,0,.63,.47), visibility 0s linear;
  z-index: 99;

  p {
    line-height: 1;
  }

  span {
    margin-left: 12px;
    display: inline-block;
    width: 9px;
    height: 9px;
    background: transparent url("~/static/icons/arrow-down.svg") no-repeat center center / contain;
    transition: transform 0.5s cubic-bezier(.37,.53,.38,1);
  }

  &.active span {
    transform: rotate(-180deg);
    transition: transform 0.5s cubic-bezier(.37,.53,.38,1);
  }

  @include min(md) {
    margin-left: 48px;
    display: flex;
    align-items: center;
  }
  @include min(xl) {
    margin-left: 70px;
  }
  @include min(bg) {
    margin-left: 120px;
  }
}
.header-lang {
  margin-left: auto;
  align-self: center;
  position: relative;
  z-index: 100;

  &::after {
    content: "|";
    position: absolute;
    top: 25%;
    right: -16px;
    @include min(md) {
      right: -20px;
    }
    @include min(bg) {
      right: -27px;
    }
  }
}
.header-phone {
  margin-left: 32px;
  width: 12px;
  height: 12px;
  opacity: 1;
  position: relative;
  z-index: 100;
  
  svg {
    transition: 0.5s cubic-bezier(.37,.53,.38,1);
  }
  &__svg-dark:hover {
    fill: $black-color;
    transition: 0.5s cubic-bezier(.37,.53,.38,1);
  }
  &__svg-white:hover {
    fill: #FFFFFF;
    transition: 0.5s cubic-bezier(.37,.53,.38,1);
  }

  @include min(md) {
    margin-left: 40px;
  }
  @include min(xl) {
    width: 14px;
    height: 14px;
  }
  @include min(bg) {
    margin-left: 52px;
    width: 16px;
    height: 16px;
  }
}
.header-book {
  display: none;
  color: #FFFFFF;
  position: relative;
  z-index: 100;

  @include min(md) {
    margin-left: 64px;
    display: block;
  }
  @include min(xl) {
    margin-left: 80px;
  }
  @include min(bg) {
    margin-left: 121px;
  }
}

.header-logo{
  opacity: 1;
  visibility: visible;
  transition: opacity 0.5s cubic-bezier(.62,0,.63,.47), visibility 0s linear;
}
.menu__app{
  // @include mt-crimson;
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -41%);
  opacity: 0;
  visibility: hidden;
  z-index: 99;
  transition: opacity 0.5s cubic-bezier(.37,.53,.38,1), visibility 0s linear 0.5s;

  &-time {
    display: none;
    position: relative;

    &::after {
      content: "|";
      position: absolute;
      top: 0;
      right: 0;
    }

    @include min(md) {
      padding-right: 21px;
      display: unset;
    }
    @include min(bg) {
      padding-right: 25px;
    }
  }
  &-weather {
    display: flex;

    @include min(md) {
      padding-left: 20px;
    }
    @include min(bg) {
      padding-left: 24px;
    }
  }
  &-weather img {
    // margin-left: 12px;
    // width: 17px;
    // height: 15px;
    margin-left: 10px;
    width: 25px;
    height: 25px;
    margin-top: -5px;

    @include min(bg) {
      // width: 23px;
      // height: 20px;
      margin-left: 10px;
      width: 30px;
      height: 30px;
      margin-top: -5px;
    }
  }
}

.header.active{
  .header-logo{
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s cubic-bezier(.37,.53,.38,1), visibility 0s linear 0.5s;
  }

  .header-additional{
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s cubic-bezier(.37,.53,.38,1), visibility 0s linear 0.5s;
  }

  .menu__app{
    opacity: 1;
    visibility: visible;
    transition: opacity 0.5s cubic-bezier(.62,0,.63,.47), visibility 0s linear;
  }

  .header__cover{
    background: $black-color;
    transition: background-color 0.3s linear;
  }
}

@media (hover: hover) {}
</style>