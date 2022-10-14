<template>
  <NuxtLink :to="localePath(`/`)" class="logo">
    <img v-if="dark" :src="`${getApiUrl()}${getMenuData?.Header_and_menu?.Logo_dark?.data?.attributes?.url}` || `/icons/Logo-dark.svg`" alt="logo">
    <img v-else :src="`${getApiUrl()}${getMenuData?.Header_and_menu?.Logo?.data?.attributes?.url}` || `/icons/Logo.svg`" alt="logo">
  </NuxtLink>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters("headerAndMenu", ["getMenuData"]),
  },
};
</script>

<style lang='scss' scoped>
@import "~/assets/scss/utilities/indents";

.logo {
  margin: 0 auto;
  width: 142px;
  height: 36px;
  transition: opacity 0.5s cubic-bezier(.37,.53,.38,1);
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  z-index: 99;

  &:hover{
    @media(hover: hover){
      opacity: 0.6;
    }
  }

  img,
  svg {
    width: 100%;
    height: 100%;
    object-fit: unset;
    object-position: unset;
  }

  @include min(tb) {
    width: 128px;
    height: 33px;
    top: 24px;
  }
  @include min(md) {
    width: 144px;
    height: 37px;
  }
  @include min(xl) {
    width: 152px;
    height: 40px;
    top: 32px;
  }
  @include min(bg) {
    width: 210px;
    height: 55px;
    top: 40px;
  }
}

.main-page .header .logo {
  pointer-events: none;
  // opacity: 1;

  &:hover{
    @media(hover: hover){
      opacity: 1;
    }
  }
}
</style>
