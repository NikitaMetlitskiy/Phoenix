<template>
  <div class="wrapper page-loader show" v-if="loading" :class="{ 'hide' : !loading }"></div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      // isPageChange: null,
    };
  },
  methods: {
    start() {
      // this.isPageChange = false;
      this.loading = true;
      document.body.style.overflow = "hidden";
    },

    finish() {
      setTimeout(() => {
        // this.isPageChange = true;
        this.loading = false;
        document.body.removeAttribute("style");
      }, 1500);
    },

    mobileHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
  },
  mounted() {
    this.mobileHeight();
  },
};
</script>

<style lang="scss" scoped>

.page-loader {
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  min-height: calc(var(--vh, 1vh) * 100);
  background-color: $black-color;
  overflow: hidden;
  visibility: hidden;
  opacity: 0;

  &.show {
    visibility: visible;
    opacity: 1;
    transition: all 0.5s cubic-bezier(.37,.53,.38,1);
  }
  &.hide{
    visibility: hidden;
    opacity: 0;
    display: none;
  }
}
</style>
