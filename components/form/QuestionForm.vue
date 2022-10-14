<template>
  <form class="question-form" ref="form">
    <div class="form-error" :class="{'active': error}">
      <p class="form-error__text p1">{{$t('oops, somethings went wrong')}}</p>
      <p class="form-error__text p1">{{$t('please, repeat your request later')}}</p>
      <p class="form-error__reset p1" @click="restartForm">OK</p>
    </div>

    <legend v-if="formTitle" class="question-form__title h4" ref="formTitle">{{ formTitle }}</legend>

    <fieldset v-if="inputsItems" class="question-form__info">
      <FormInput
        class="question-form__input"
        v-for="(el, id) in inputsItems"
        :key="id"
        :type="el?.type || 'text'"
        :name="el?.name"
        :placeholder="el?.placeholder || el?.name"
        ref="formItem"
      />
    </fieldset>

    <fieldset class="question-form__accept">
      <p v-if="formAccept" class="question-form__accept-text p1" ref="formAccept">
        {{ formAccept }}
        <nuxt-link
          class="question-form__accept-link"
          :to="localePath(`/privacy-policy`)"
        >
          {{$t('policy')}}
        </nuxt-link>
      </p>

      <button
        v-if="formBtn"
        class="question-form__accept-btn a1 hover-linear-dark"
        type="submit"
        @click="sendForm($event)"
        ref="formBtn"
      >
        {{ formBtn }}
      </button>
    </fieldset>
  </form>
</template>

<script>
import FormInput from "~/components/form/FormInput.vue";
import { animateJS } from "~/plugins/animations";

export default {
  components: { FormInput },
  props: {
    formTitle: {
      type: String,
      default: "",
    },
    formAccept: {
      type: String,
      default: "",
    },
    formBtn: {
      type: String,
      default: "",
    },
    inputsItems: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    error: false,
  }),
  methods: {
    animationForm() {
      const items = this.$el.querySelectorAll(".question-form__input");

      if (this.$refs.formTitle) {
        animateJS('splitTitleRight', this.$refs.formTitle);
      }

      // if (this.$refs.form) {
      //   animateJS('fadeUp', this.$refs.form);
      // }

      if (items) {
        animateJS('fadeUp', items);
      }

      if (this.$refs.formAccept) {
        animateJS('splitText', this.$refs.formAccept);
      }

      if (this.$refs.formBtn) {
        animateJS('fade', this.$refs.formBtn);
      }
    },
    async submitForm() {
      await this.$axios.post("/forms", {
        data: {
          Type_form: this.formTitle,
          Name: this.$el.querySelectorAll(".question-form__input input")[0].value,
          Email: this.$el.querySelectorAll(".question-form__input input")[1].value,
          Phone: this.$el.querySelectorAll(".question-form__input input")[2].value,
          Message: this.$el.querySelectorAll(".question-form__input input")[3].value,
        }})
        .then((response) => {
          if (response.status === 200) {
            this.$router.push(this.localePath(`/thanks`))
          }
        })
        .catch((err) => {
          console.log(err);
          this.error = true;
        });
    },
    async sendForm(e) {
      e.preventDefault();

      if (this.$el.querySelectorAll(".question-form__input.error").length === 0 &&
        this.$el.querySelectorAll(".question-form__input input")[0].value &&
        this.$el.querySelectorAll(".question-form__input input")[1].value &&
        this.$el.querySelectorAll(".question-form__input input")[2].value &&
        this.$el.querySelectorAll(".question-form__input input")[3].value) {
        setTimeout(this.submitForm, 500);

        // Variables write in nuxt.config.js or here
        // TOKEN telegram bot (example, '5659803884:AAFs1Zd3yeFl-lkAz1ZazMHQa0deK5BdsJvs')
        const TOKEN = process.env.TELEGRAM_TOKEN;
        //  Chat_id in telegram group (example, '-1001716220304')
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
        let message = `
          <i>${this.formTitle}</i>\n
          <b>${this.$el.querySelectorAll(".question-form__input input")[0].name}:</b> ${this.$el.querySelectorAll(".question-form__input input")[0].value}
          <b>${this.$el.querySelectorAll(".question-form__input input")[1].name}:</b> ${this.$el.querySelectorAll(".question-form__input input")[1].value}
          <b>${this.$el.querySelectorAll(".question-form__input input")[2].name}:</b> ${this.$el.querySelectorAll(".question-form__input input")[2].value}
          <b>${this.$el.querySelectorAll(".question-form__input input")[3].name}:</b> ${this.$el.querySelectorAll(".question-form__input input")[3].value}
        `;

        const options = {
          method: 'POST',
          url: `https://api.telegram.org/bot${TOKEN}/sendMessage`,
          headers: {accept: 'application/json', 'content-type': 'application/json'},
          data: {
            text: `${message}`,
            parse_mode: 'HTML',
            disable_web_page_preview: false,
            disable_notification: false,
            reply_to_message_id: null,
            chat_id: `${CHAT_ID}`
          }
        };

        this.$axios
          .request(options)
          .then(function (response) {})
          .catch(function (error) {
            console.error(error);
          });
      }
    },
    restartForm() {
      this.error = false;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.animationForm();
    });
  }
};
</script>

<style lang="scss" scoped>
.question-form {
  margin-left: auto;
  margin-right: auto;
  @include pb-gold;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
  background-color: $grey-color;
  color: $black-color;
  position: relative;

  @include min(tb) {
    padding-left: 20px;
    padding-right: 20px;
    width: 480px;
  }
  @include min(md) {
    padding-left: 24px;
    padding-right: 24px;
    width: 627px;
  }
  @include min(lg) {
    width: 816px;
  }
  @include min(xl) {
    padding-left: 32px;
    padding-right: 32px;
  }
  @include min(bg) {
    padding-left: 40px;
    padding-right: 40px;
    width: 1116px;
  }

  &__title {
    @include pt-greenyellow;
  }

  &__info {
    width: 100%;

    @include min(sm) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 24px;
    }
    @include min(xl) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }

  &__input {
    @include mt-crimson;

    @include min(xl) {
      width: 31%;

      &:last-child {
        width: 100%;
      }
    }
  }

  &__accept {
    @include mt-cornflowerblue;

    @include min(sm) {
      display: flex;
      justify-content: space-between;
    }
  }

  &__accept-text {
    width: 199px;
    opacity: 0.5;

    @include min(tb) {
      width: 249px;
    }
    @include min(md) {
      width: 399px;
    }
    @include min(lg) {
      width: 530px;
    }
    @include min(bg) {
      width: 730px;
    }
  }

  &__accept-link {
    display: inline;
    transition: color 0.5s cubic-bezier(.37,.53,.38,1);
  }

  &__accept-btn {
    @include mt-crimson;

    @include min(sm) {
      margin-top: 0;
      align-self: flex-end;
    }
  }
}
.form-error {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  visibility: hidden;

  &.active {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $grey-color;
    color: $black-color;
    z-index: 99;
    visibility: visible;
  }

  &__text {
    @include mb-gold;
  }
  &__reset {
    padding: 10px 20px;
    cursor: pointer;
  }
}

@media (hover: hover) {
  .question-form__accept-link:hover {
    color: #000000;
    transition: color 0.5s cubic-bezier(.37,.53,.38,1);
  }
}
</style>