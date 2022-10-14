<template>
  <div class="form-input-wrapper">
    <input
      :type="type"
      :name="name"
      class="form-input p1"
      @blur="blurInput"
    />
    <span
      class="form-input__placeholder p1"
      :class="{ hidden: isPlaceholderHidden }"
    >
      {{ placeholder }}
    </span>
    <span
      class="form-input__error p3"
      :class="{ hidden: isErrorHidden }"
    >
      {{$t('your enter incorrect data')}}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    isPlaceholderHidden: false,
    isErrorHidden: false,
  }),
  methods: {
    blurInput(e) {
      let pattern = null;

      switch (e.target.type) {
        case 'text':
          // pattern = /^[\p{L} ?]+$/gu;
          pattern = /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ0-9-' $]{3,}/i;
          break;
        case 'tel':
          pattern = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,15}(\s*)?$/;
          break;
        case 'email':
          pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          break;
      
        default:
          break;
      }

      if (e.target.value.trim().length !== 0 && pattern.test(e.target.value)) {
        e.target.classList.remove('error');
        e.target.parentNode.classList.remove('error');
        this.isPlaceholderHidden = true;
        this.isErrorHidden = false;
      } else {
        e.target.classList.add('error');
        e.target.parentNode.classList.add('error');
        this.isPlaceholderHidden = true;
        this.isErrorHidden = true;
      }

      if (e.target.value.trim().length === 0) {
        this.isPlaceholderHidden = false;
        this.isErrorHidden = false;
        e.target.classList.remove('error');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/utilities/indents";

.form-input-wrapper {
  position: relative;

  &:after{
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: rgba($black-color, 0.5);
  }
}
.form-input {
  margin: 0;
  padding: 0 0 8px;
  width: 100%;
  display: block;
  outline: 0;
  border: none;
  // border-bottom: 1px solid rgba($black-color, 0.5);
  position: relative;
  z-index: 10;

  &.error {
    border-color: #C20000;
  }
}
.form-input__error {
  font-size: 10px;
  text-align: right;
  color: #C20000;
  opacity: 0;
  position: absolute;
  bottom: 0;
  right: 0;
  transition: opacity 0.3s cubic-bezier(.37,.53,.38,1), 0.2s transform 0.3s cubic-bezier(.37,.53,.38,1);

  &.hidden {
    opacity: 1;
    transform: translateY(100%);
    transition: 0.2s opacity 0.3s cubic-bezier(.37,.53,.38,1), transform 0.3s cubic-bezier(.37,.53,.38,1);
  }
}
.form-input:focus + .form-input__placeholder {
  font-size: 9px;
  line-height: 1;
  transform: translateY(-100%);
  transition: 0.3s ease-in-out;
}
.form-input__placeholder {
  display: block;
  color: $black-color;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  transition: 0.2s ease-in-out;
}
.form-input__placeholder.hidden {
  font-size: 9px;
  line-height: 1;
  transform: translateY(-100%);
}

@media (hover: hover) {
  .form-input:hover {
    cursor: pointer;
  }
}
</style>
