<template>
  <div
    class="form-dropdown__options p1"
    :class="{ visible: isVisible }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>

.form-dropdown__options {
  @include pt-darkgreen;
  @include pb-darkgreen;
  width: calc(100% + 20px);
  opacity: 0;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.16);
  border-radius: 6px;
  transition: 0.2s ease-in-out;
  overflow: auto;
  visibility: hidden;
  pointer-events: none;
  position: absolute;
  z-index: 50;
  top: calc(100% + 32px);
  left: -20px;

  @include min(xl) {
    top: calc(100% + 36px);
  }
  @include min(bg) {
    top: calc(100% + 44px);
  }
}
.form-dropdown__options.visible {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}
</style>
