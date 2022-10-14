<template>
  <div class="form-dropdown__option p1" tabindex="0" @click="clickHandler">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  methods: {
    clickHandler(e) {
      document.querySelectorAll(".form-dropdown__option").forEach(el => el.classList.remove('active'));
      e.currentTarget.classList.add('active');

      this.$emit("setOption", this.text);
    },
  },
};
</script>

<style lang="scss" scoped>

.form-dropdown__option {
  padding-left: 20px;
  padding-right: 20px;
  color: $black-color;
  background-color: #FFFFFF;
  opacity: 0.6;
  outline: none;
  position: relative;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 11px;
  }

  &.active {
    opacity: 1;
    background: url('~/static/icons/icon-check.svg') no-repeat center right 20px / contain;
  }
}
.form-dropdown__option:hover,
.form-dropdown__option:focus {
  opacity: 1;
}
</style>
