<template>
  <div class="wrapper">
    <AppHeader />

    <div class="checkout-page page container">
      <div class="checkout-page__link-wrapper" ref="link">
        <NuxtLink
          class="checkout-page__link p3 hover-nonlinear-white"
          :to="localePath(`/choose-apartment`)"
        >
          {{ $t('back to search') }}
        </NuxtLink>
      </div>

      <form class="checkout-page__inner checkout-form">
        <fieldset class="checkout-page__block-preview block-preview">
          <div class="block-preview__info">
            <div class="block-preview__info-img block-wrapper">
              <img src="/images/main/main1.jpg" alt="" ref="image">
              <p class="block-preview__info-title h4" ref="title">apartment A-1</p>
              <p class="block-preview__info-details p1" ref="details">
                <span>Check-in/out</span>
                <span>5 June — 10 June</span>
              </p>
            </div>
            <div class="block-preview__info-price" ref="infoPrice">
              <span class="p1">Rooms: 2*240$</span>
              <span class="a1">480$</span>
            </div>
            <div class="block-preview__info-total a1" ref="infoTotal">
              <span>Total:</span>
              <span>720$</span>
            </div>
          </div>

          <div ref="privacy">
            <NuxtLink class="block-preview__text p1" :to="localePath(`/privacy-policy`)">
              {{ getChooseData?.Checkout_form?.Warning_text }}
            </NuxtLink>
          </div>
        </fieldset>

        <fieldset class="checkout-page__block-form block-form">
          <p class="block-form__title h4" ref="formTitle">{{ getChooseData?.Checkout_form?.Form_title }}</p>

          <div class="block-form__input-wrapper">
            <FormInput
              class="block-form__input"
              v-for="(el, id) in getChooseData?.Checkout_form?.Form_input"
              :key="id"
              :type="el?.type || 'text'"
              :name="el?.name"
              :placeholder="el?.placeholder || el?.name"
              ref="formItem"
            />
          </div>
        </fieldset>

        <fieldset class="checkout-page__block-accept block-accept">
          <div class="block-accept__check">
            <label for="privacy">
              <input id="privacy" type="checkbox" @click="activeSubmit($event)" @change="activeAccept($event)" />
              <div class="square"></div>
            </label>
            <p class="p1" for="privacy">{{ getChooseData?.Checkout_form?.Accept_privacy }}</p>
          </div>

          <div class="block-accept__check">
            <label for="mailing">
              <input id="mailing" type="checkbox" @change="activeAccept($event)" />
              <div class="square"></div>
            </label>
            <p class="p1" for="mailing">{{ getChooseData?.Checkout_form?.Accept_mailing }}</p>
          </div>

          <div class="block-accept__btn">
            <button
              class="a1 hover-linear-dark"
              type="submit"
              @submit="sendForm($event)"
              disabled
              ref="btnSubmit"
            >
              {{$t('send request')}}
            </button>
          </div>
        </fieldset>
      </form>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "~/components/common/AppHeader.vue";
import AppFooter from "~/components/common/AppFooter.vue";
import QuestionForm from '~/components/form/QuestionForm.vue';
import FormInput from "~/components/form/FormInput.vue";
import { animateJS } from "~/plugins/animations";
import { mapGetters } from "vuex";

export default {
  components: {
    AppHeader,
    AppFooter,
    QuestionForm,
    FormInput
  },
  async asyncData({ store }) {
    await store.dispatch("choosePage/getChooseData");
  },
  computed: {
    ...mapGetters("choosePage", ["getChooseData"]),
  },
  // data: () => ({}),
  methods: {
    activeAccept(e) {
      if (e.currentTarget.checked) {
        e.currentTarget.parentNode.nextElementSibling.style.opacity = "1";
      } else {
        e.currentTarget.parentNode.nextElementSibling.removeAttribute('style');
      }
    },
    activeSubmit(e) {
      e.currentTarget.checked ? this.$refs.btnSubmit.disabled = false : this.$refs.btnSubmit.disabled = true;
    },
    animationForm() {
      const items = this.$el.querySelectorAll(".block-form__input");
      const itemsAccept = this.$el.querySelectorAll(".block-accept__check");

      if (this.$refs.link) {
        animateJS('fade', this.$refs.link);
      }

      if (this.$refs.formTitle) {
        animateJS('splitTitleLeft', this.$refs.formTitle);
      }

      if (items) {
        animateJS('fadeUp', items);
      }

      if (itemsAccept) {
        animateJS('fadeUp', itemsAccept);
      }

      if (this.$refs.btnSubmit.parentNode) {
        animateJS('splitText', this.$refs.btnSubmit.parentNode);
      }

      if (this.$refs.image) {
        animateJS('scaleFullImage', this.$refs.image);
      }

      if (this.$refs.title) {
        animateJS('splitTitleLeft', this.$refs.title);
      }

      if (this.$refs.details) {
        animateJS('fadeUp', this.$refs.details);
      }

      if (this.$refs.infoPrice) {
        animateJS('fadeUp', this.$refs.infoPrice);
      }

      if (this.$refs.infoTotal) {
        animateJS('fadeUp', this.$refs.infoTotal);
      }

      if (this.$refs.privacy) {
        animateJS('fade', this.$refs.privacy);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.animationForm();
    });
  },
};
</script>

<style lang="scss" scoped>

.checkout-page {
  padding-top: 64px;
  color: $white-color;
  background-color: $black-color;
  border-bottom: 1px solid rgba(#FFFFFF, 0.1);
  position: relative;

  @include min(tb) {
    padding-top: 85px;
  }
  @include min(xl) {
    padding-top: 94px;
  }
  @include min(bg) {
    padding-top: 125px;
  }
}
.checkout-page__link-wrapper {
  @include mt-olive;
}
.checkout-page__link {
  padding-left: 14px;
  width: max-content;
  display: block;
  line-height: 1.2;
  opacity: 0.5;
  text-transform: uppercase;
  transition: opacity 0.75s cubic-bezier(.37,.53,.38,1);
  position: relative;

  @include min(xl) {
    padding-left: 18px;
  }
  @include min(bg) {
    padding-left: 22px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-60%);
    width: 7px;
    height: 10px;
    background: transparent url('~/static/icons/icon-arrow-left.svg') no-repeat center center / cover;

    @include min(bg) {
      width: 9px;
      height: 12px;
    }
  }
}
.checkout-page__inner {
  @include mt-antiquewhite;
  @include mb-aquamarine;
  width: 100%;
  display: flex;
  flex-direction: column;

  @include min(md) {
    display: grid;
    grid-template-columns: 58% 36%;
    justify-content: space-between;
    grid-template-areas: 
      "form preview"
      "accept preview";
  }
  @include min(xl) {
    grid-template-columns: 56% 31%;
  }
}
.block-preview {
  @include min(md) {
    grid-area: preview;
  }
}
.block-preview__info {
  background-color: $grey-color;

  @include min(tb) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 
      "main price"
      "main total";
  }
  @include min(md) {
    display: block;
  }
}
.block-preview__info-img {
  @include pb-crimson;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  height: 239px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: #FFFFFF;
  position: relative;

  img {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  }

  @include min(tb) {
    padding-left: 40px;
    padding-right: 40px;
    height: 167px;
    grid-area: main;
  }
  @include min(md) {
    padding-left: 20px;
    padding-right: 20px;
    height: 234px;
  }
  @include min(xl) {
    padding-left: 25px;
    padding-right: 25px;
    height: 283px;
  }
  @include min(bg) {
    padding-left: 32px;
    padding-right: 32px;
    height: 383px;
  }
}
.block-preview__info-title {
  @include mb-gold;
  position: relative;
  z-index: 5;
}
.block-preview__info-details {
  display: flex;
  opacity: 0.7;
  position: relative;
  z-index: 5;

  span + span {
    margin-left: 45px;
  }
}
.block-preview__info-price {
  @include pt-crimson;
  @include pb-darkgreen;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
  color: $black-color;
  border-bottom: 1px solid rgba($black-color, 0.2);

  @include min(tb) {
    grid-area: price;
    align-items: center;
  }
  @include min(xl) {
    margin-left: 25px;
    margin-right: 25px;
  }
  @include min(bg) {
    margin-left: 32px;
    margin-right: 32px;
  }
}
.block-preview__info-total {
  @include pt-crimson;
  @include pb-darkgreen;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
  color: $black-color;

  @include min(tb) {
    grid-area: total;
    align-items: center;
  }
  @include min(xl) {
    margin-left: 25px;
    margin-right: 25px;
  }
  @include min(bg) {
    margin-left: 32px;
    margin-right: 32px;
  }
}
.block-preview__text {
  @include mt-darkgreen;
  @include mb-darkgreen;
  text-indent: 3ch;
  opacity: 0.5;
  transition: opacity 0.75s cubic-bezier(.37,.53,.38,1);
  position: relative;

  &::before {
    content: "/*";
    position: absolute;
    left: 0;
    text-indent: 0ch;
  }
}
.block-form {
  @include pt-antiquewhite;
  @include pb-antiquewhite;
  background-color: $grey-color;
  color: $black-color;

  @include min(md) {
    grid-area: form;
  }
}
.block-form__title {
  @include mb-cornflowerblue;
}
.block-form__title {
  margin-left: 25px;
  margin-right: 25px;

  @include min(tb) {
    margin-left: 40px;
    margin-right: 40px;
  }
  @include min(xl) {
    margin-left: 83px;
    margin-right: 83px;
  }
  @include min(bg) {
    margin-left: 111px;
    margin-right: 111px;
  }
}
.block-form__input-wrapper {
  margin-left: 25px;
  margin-right: 25px;

  @include min(tb) {
    margin-left: 40px;
    margin-right: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  @include min(xl) {
    margin-left: 83px;
    margin-right: 83px;
  }
  @include min(bg) {
    margin-left: 111px;
    margin-right: 111px;
  }
}
.block-form__input {
  height: 27px;

  &:not(:last-child) {
    @include mb-crimson;
  }

  @include min(tb) {
    width: 48%;

    &:last-child {
      width: 100%;
    }
  }
}
.block-accept {
  @include mt-gold;
  padding-left: 25px;
  padding-right: 25px;
  @include pt-antiquewhite;
  @include pb-antiquewhite;
  background-color: $grey-color;
  color: $black-color;

  @include min(tb) {
    padding-left: 40px;
    padding-right: 40px;
  }
  @include min(md) {
    grid-area: accept;
  }
  @include min(xl) {
    padding-left: 83px;
    padding-right: 83px;
  }
  @include min(bg) {
    padding-left: 111px;
    padding-right: 111px;
  }
}
.block-accept__check {
  display: flex;
  align-items: flex-start;

  & + .block-accept__check {
    margin-top: 12px;
  }

  p {
    display: inline;
    opacity: 0.5;
  }

  label {
    display: inline-flex;
    align-items: flex-start;
    position: relative;
  }

  .square {
    margin-right: 12px;
    width: 12px;
    height: 12px;
    border: 1px solid rgba($black-color, 0.5);
    position: relative;
  }

  label div {
    opacity: 0.5;
  }

  input[type="checkbox"] {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    opacity: 0;
    clip: rect (0 0 0 0);

    &:focus + div {
      border-color: rgba($black-color, 1);
    }
    &:checked + div {
      border-color: rgba($black-color, 1);
    }
    &:checked + div::before {
      content: "";
      position: absolute;
      z-index: 5;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      background: url('~/static/icons/icon-close-dark.svg') no-repeat center center / contain;
      opacity: 1;
    }
    &:disabled + div {
      border-color: rgba(0, 0, 0, 0.1);
    }
    &:checked:disabled + div::before {
      opacity: 0.5;
    }
  }
}
.block-accept__btn {
  @include mt-cornflowerblue;
}

@media (hover: hover) {
  .checkout-page__link:hover,
  .block-preview__text:hover {
    opacity: 1;
    transition: opacity 0.75s cubic-bezier(.37,.53,.38,1);
  }
}
</style>