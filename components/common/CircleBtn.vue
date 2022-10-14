<template>
  <!-- <NuxtLink
    v-if="typeBtn === 'link'"
    class="circle-btn"
    :class="{ dark: darkTheme }"
    :to="localePath(`/${linkBtn}`)"
    ref="button"
  >
    <div class="circle-btn__plus-wrap">
      <div class="circle-btn__plus"></div>
    </div>

    <div class="circle-btn__text p2">{{ textBtn }}</div>
  </NuxtLink>
  <button
    v-else
    class="circle-btn"
    :class="{ dark: darkTheme }"
  >
    <div class="circle-btn__plus-wrap">
      <div class="circle-btn__plus"></div>
    </div>

    <div class="circle-btn__text p2">{{ textBtn }}</div>
  </button> -->
  <NuxtLink v-if="typeBtn === 'link'" :to="localePath(`/${linkBtn}`)" class="circle-btn__wrapper" :class="{'circle-btn__wrapper_absolute': absolute}">
    <div class="circle-btn__trigger" ref="trigger" @mouseenter="enterTrigger" @mouseleave="leaveTrigger"></div>
    <div
      class="circle-btn"
      :class="{ dark: darkTheme }"
      ref="button"
    >
      <div class="circle-btn__plus-wrap">
        <div class="circle-btn__plus"></div>
      </div>
      <div class="circle-btn__text p2">{{ textBtn }}</div>
    </div>
  </NuxtLink>

  <button v-else class="circle-btn__wrapper">
    <div class="circle-btn__trigger" ref="trigger" @mouseenter="enterTrigger" @mouseleave="leaveTrigger"></div>
    <div
      class="circle-btn"
      :class="{ dark: darkTheme }"
      ref="button"
    >
      <div class="circle-btn__plus-wrap">
        <div class="circle-btn__plus"></div>
      </div>
      <div class="circle-btn__text p2">{{ textBtn }}</div>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    typeBtn: {
      type: String,
      default: "link",  // "button"
    },
    darkTheme: {
      type: Boolean,
      default: false,
    },
    textBtn: {
      type: String,
      default: "read more",
    },
    linkBtn: {
      type: String,
      default: "",
    },
    absolute: {
      type: Boolean,
      default: false,
    },
  },
  data(){
    return {
      newPosition: {
        x: null,
        y: null
      },
      buttonMove: null
    }
  },
  methods: {
    enterTrigger($event){
      this.newPosition.x = $event.clientX;
      this.newPosition.y = $event.clientY;

      this.magnitBtn();

      document.addEventListener('mousemove', this.mouseMoveHandler);
    },
    mouseMoveHandler($event){
      this.newPosition.x = $event.clientX;
      this.newPosition.y = $event.clientY;
    },
    magnitBtn(){
      const button = this.$refs.button;
      const buttonPos = button.getBoundingClientRect();

      button.style.transform = `translate(${(this.newPosition.x - (buttonPos.left + buttonPos.width / 2)) / 6}px, ${(this.newPosition.y - (buttonPos.top + buttonPos.height / 2)) / 6}px)`;

      this.buttonMove = window.requestAnimationFrame(this.magnitBtn);
    },
    leaveTrigger(){
      const button = this.$refs.button;
      button.style.transform = 'translate(0px, 0px)';

      window.cancelAnimationFrame(this.buttonMove);

      this.buttonMove = null;

      document.removeEventListener('mousemove', this.mouseMoveHandler);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/utilities/indents";

.circle-btn__wrapper{
  cursor: default;
  position: relative;
  display: block;

  width: 135px;
  height: 135px;

  &_absolute{
    position: absolute;
  }

  @include min(lg) {
    width: 159px;
    height: 159px;
  }
  @include min(bg) {
    width: 200px;
    height: 200px;
  }
}
.circle-btn__trigger{
  width: 130%;
  height: 130%;
  position: absolute;
  top: -15%;
  left: -15%;
  z-index: 11;
  border-radius: 50%;
  cursor: pointer;

  display: none;

  @include min(lg){
    display: block;
  }
}

.circle-btn {
  padding: 0;
  width: 135px;
  height: 135px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 50%;
  border: none;
  background-color: $orange-color;
  position: relative;
  z-index: 10;
  // cursor: pointer;

  transition: transform 0.1s ease;
  will-change: transform;

  @include min(lg) {
    width: 159px;
    height: 159px;
  }
  @include min(bg) {
    width: 200px;
    height: 200px;
  }
}
.circle-btn__text {
  margin-bottom: 24px;
  margin-left: 24px;
  padding-right: 16px;
  text-align: left;

  @include min(md) {
    margin-bottom: 28px;
    margin-left: 28px;
  }
  @include min(lg) {
    margin-bottom: 32px;
    margin-left: 32px;
    padding-right: 20px;
  }
  @include min(bg) {
    margin-bottom: 40px;
    margin-left: 40px;
    padding-right: 24px;
  }
}
.circle-btn__plus-wrap {
  width: 13px;
  height: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 30px;
  right: 30px;

  @include min(xl) {
    width: 17px;
    height: 17px;
    top: 32px;
    right: 32px;
  }
  @include min(bg) {
    width: 23px;
    height: 23px;
    top: 40px;
    right: 40px;
  }
}
.circle-btn__plus {
  position: relative;
  width: 13px;
  width: 100%;
  height: 1px;
  background-color: $black-color;
}
.circle-btn__plus::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
  height: 13px;
  background-color: $black-color;

  @include min(xl) {
    height: 17px;
  }
  @include min(bg) {
    height: 23px;
  }
}
.circle-btn.dark {
  background-color: $black-color;

  .circle-btn__text {
    color: #ffffff;
  }
  .circle-btn__plus {
    background-color: #ffffff;
  }
  .circle-btn__plus::before {
    background-color: #ffffff;
  }
}

@keyframes rotate-btn {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}

@media (hover: hover) {
  .circle-btn__wrapper:hover {
    .circle-btn__plus-wrap {
      animation: rotate-btn 0.5s linear;
    }
  }
}
</style>