<template>
  <div class="form-dropdown p1" :class="{ dark: dark }" ref="selectWrapper">
    <div class="form-dropdown__icon" :class="{ active: isOptionsVisible }">
      <img src="/icons/arrow-down-black.svg" alt="icon-btn" />
    </div>
    <div
      class="form-dropdown__current p1"
      tabindex="0"
      @focus="focusOption"
      @blur="blurOption"
    >
      {{ current }}
    </div>
    <FormDropdownOptions :isVisible="isOptionsVisible">
      <FormDropdownOption
        v-for="(option, index) in options"
        :key="index"
        :class="{ 'active': index === 0 }"
        :text="option"
        @setOption="setOption"
        @focus.native="focusOption"
        @blur.native="blurOption"
      />
    </FormDropdownOptions>
    <input
      v-model="current"
      type="text"
      :name="name"
      class="form-dropdown__input"
      ref="select"
    />
  </div>
</template>

<script>
import FormDropdownOptions from "./FormDropdownOptions.vue";
import FormDropdownOption from "./FormDropdownOption.vue";

export default {
  components: {
    FormDropdownOptions,
    FormDropdownOption,
  },
  props: {
    current: {
      type: String,
      default: "",
    },
    default: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: "",
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isOptionsVisible: false,
  }),

  methods: {
    setOption(option) {
      this.$emit("setOption", option);
      this.blurOption();
    },
    focusOption() {
      this.isOptionsVisible = true;
    },
    blurOption() {
      this.isOptionsVisible = false;
    },
  },
  mounted() {
    this.current ? this.current : this.current = this.default;
  }
};
</script>

<style lang="scss" scoped>

.form-dropdown {
  position: relative;
}
.form-dropdown__current {
  outline: none;
  cursor: pointer;
}
.form-dropdown__icon {
  position: absolute;
  right: 20px;

  & > img {
    transform: translateY(75%);
    transition: 0.3s ease-in-out;
    transform-origin: center center;
  }
}
.form-dropdown__icon.active {
  & > img {
    transform: translateY(75%) rotate(180deg);
    transition: 0.3s ease-in-out;
  }
}
.form-dropdown__input {
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  position: absolute;
  z-index: 1;
}
</style>
