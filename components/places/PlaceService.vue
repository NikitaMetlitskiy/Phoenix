<template>
  <div
    class="place-service container"
    :class="{
      'place-service--spa': isSpa
    }"
  >
    <div v-if="imageBig" class="place-service__big-image">
      <img :src="imageBig" alt="bigImage" />
    </div>

    <div v-if="imageSmall" class="place-service__small-image" ref="smallImageWrapper">
      <img :src="imageSmall" alt="smallImage" ref="smallImage" />

      <CircleBtn
        v-if="circleTypeBtn === 'button'"
        class="place-service__circle-btn"
        :typeBtn="circleTypeBtn"
        :textBtn="circleBtnText"
        :linkBtn="circleBtnLink"
        @click.native="showModal"
      />
      <CircleBtn
        v-else
        class="place-service__circle-btn"
        :textBtn="circleBtnText"
        :linkBtn="circleBtnLink"
      />
    </div>

    <div class="place-service__inner">
      <h2 v-if="title" class="place-service__title h2" ref="title">{{ title }}</h2>

      <div class="place-service__list">
        <div class="place-service__list-top block-wrapper">
          <p v-if="topInfo" class="place-service__list-top-info p1" ref="topInfo">{{ topInfo }}</p>
          <p v-if="topText" class="place-service__list-top-text p1 block-wrapper" ref="topText">{{ topText }}</p>
        </div>

        <p v-if="bottomText" class="place-service__list-bottom-text p1" ref="bottomText">{{ bottomText }}</p>
      </div>
    </div>

    <ModalDelivery :title="dataForm?.Title_background" ref="deliveryForm">
      <QuestionForm
        class="form-block"
        ref="formBlock"
        :formTitle="dataForm?.Title_form"
        :formAccept="$t('accept form')"
        :formBtn="$t('send request')"
        :inputsItems="dataForm?.Form_input"
      />
    </ModalDelivery>
  </div>
</template>

<script>
import CircleBtn from "~/components/common/CircleBtn.vue";
import ModalDelivery from "~/components/common/ModalDelivery.vue";
import QuestionForm from '~/components/form/QuestionForm.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { parallaxImage, animateJS } from "~/plugins/animations";

export default {
  components: { CircleBtn, ModalDelivery, QuestionForm },
  props: {
    imageBig: {
      type: String,
      default: "",
    },
    imageSmall: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    topInfo: {
      type: String,
      default: "",
    },
    topText: {
      type: String,
      default: "",
    },
    bottomText: {
      type: String,
      default: "",
    },
    circleTypeBtn: {
      type: String,
      default: "",
    },
    circleBtnText: {
      type: String,
      default: "",
    },
    circleBtnLink: {
      type: String,
      default: "",
    },
    isSpa: {
      type: Boolean,
      default: false,
    },
    dataForm: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    showModal() {
      document.body.classList.add("lock");
      this.$refs.deliveryForm.$el.classList.add("active");
      this.$refs.deliveryForm.animationBlocks();
      // this.$refs.formBlock.animationForm();

      const form = this.$refs.formBlock.$el;

      gsap.from(form, {
        y: '100vh',
        rotate: '17deg',
        delay: 0.5
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.title) {
        animateJS('splitTitleLeft', this.$refs.title);
      }

      if (this.$refs.topInfo) {
        animateJS('splitText', this.$refs.topInfo);
      }

      if (this.$refs.topText) {
        animateJS('splitText', this.$refs.topText);
      }

      if (this.$refs.bottomText) {
        animateJS('splitText', this.$refs.bottomText);
      }

      if (this.$refs.smallImage && window.innerWidth >= 1024) {
        animateJS('fadeImage', this.$refs.smallImage);
        parallaxImage(this.$refs.smallImage, this.$refs.smallImageWrapper, 40);
      }
    });
  }
};
</script>

<style lang="scss" scoped>

.place-service {
  @include mt-aquamarine;
  @include mb-aquamarine;
  background-color: #f8f8f8;
  position: relative;

  @include min(md) {
    display: flex;
    justify-content: space-between;
  }
}
.place-service.place-service--spa {
  .place-service__list-top-info {
    @include min(md) {
      margin-left: 0;
    }
  }
  .place-service__circle-btn {
    display: none;
  }
}
.place-service__big-image {
  height: 204px;
  position: relative;
  z-index: 1;

  @include min(sm) {
    height: 300px;
  }
  @include min(tb) {
    height: 412px;
  }
  @include min(md) {
    width: 57.75%;
    height: 321px;
  }
  @include min(xl) {
    width: 55.9%;
    height: 438px;
  }
  @include min(bg) {
    height: 590px;
  }
}
.place-service__small-image {
  margin-top: -68px;
  position: relative;
  z-index: 5;

  img {
    display: none;
  }

  @include min(md) {
    margin-top: 0;
    width: 223px;
    height: 261px;
    position: absolute;
    left: 42.2%;
    top: 212px;

    img {
      display: block;
    }
  }
  @include min(xl) {
    width: 236px;
    height: 276px;
    top: 276px;
    left: 50.45%;
  }
  @include min(bg) {
    width: 320px;
    height: 367px;
    top: 364px;
  }

  img {
    display: none;

    @include min(md) {
      display: block;
    }
  }
}
.place-service__circle-btn {
  margin-left: auto;
  margin-right: 4px;

  @include min(tb) {
    margin-right: 16px;
  }
  @include min(md) {
    margin: 0;
    position: absolute;
    z-index: 6;
    top: 36px;
    right: -56px;
  }
  @include min(xl) {
    top: -41px;
    right: -41px;
  }
  @include min(bg) {
    top: -44px;
    right: -51px;
  }
}
.place-service__inner {
  margin-top: -52px;
  @include min(md) {
    margin-top: 0px;
    width: 32.4%;
    min-height: 473px;
  }
  @include min(xl) {
    width: 36.9%;
    min-height: 552px;
  }
  @include min(bg) {
    min-height: 731px;
  }
}
.place-service__title {
  @include mt-cornflowerblue;

  @include min(md) {
    margin-top: 0;
  }
}
.place-service__list {
  @include mt-cornflowerblue;
  display: flex;
  flex-wrap: wrap;
  position: relative;

  @include min(xl) {
    flex-wrap: nowrap;
    flex-direction: column;
  }
}
.place-service__list-top {
  width: 100%;
  display: flex;
  flex-direction: column-reverse;

  @include min(tb) {
    width: 571px;
  }
  @include min(md) {
    width: 100%;
  }
  @include min(xl) {
    flex-direction: row;
    justify-content: space-between;
  }
}
.place-service__list-top-info {
  @include mt-antiquewhite;
  width: 32%;

  @include min(tb) {
    width: 115px;
  }
  @include min(md) {
    margin-left: 88px;
    width: 153px;
    padding-right: 50px;
  }
  @include min(xl) {
    margin-left: 0;
    margin-top: 0;
  }
  @include min(bg) {
    width: 208px;

    padding-right: 80px;
  }
}
.place-service__list-top-text {
  @include min(xl) {
    width: 66%;
  }
}
.place-service__list-bottom-text {
  @include mt-antiquewhite;
  margin-left: auto;
  width: 46%;
  justify-self: flex-end;

  position: absolute;
  bottom: 0;
  right: 0;

  @include min(tb) {
    // margin-left: 176px;
    width: 156px;
    right: unset;
    left: 175px;
  }
  @include min(md) {
    position: static;
    left: unset;
    bottom: unset;
    margin-top: 149px;
    margin-left: 88px;
  }
  @include min(xl) {
    max-width: 66%;
    margin-top: 210px;
    margin-left: 34%;
  }
  @include min(bg) {
    margin-top: 303px;
    width: 210px;
  }
}
.form-block {
  transform: rotate(2deg);
}

.place-service.right-side {
  @include min(md) {
    flex-direction: row-reverse;

    .place-service__small-image {
      left: unset;
      right: 43%;
    }
    .place-service__circle-btn {
      left: -57px;
      right: unset;
    }
    .place-service__list-top {
      width: 316px;
      flex-direction: column-reverse;
    }
    .place-service__list-top-info {
      @include mt-antiquewhite;
    }
  }
  @include min(xl) {
    .place-service__small-image {
      right: 50.4%;
    }
    .place-service__list-top {
      width: 100%;
    }
  }
}
</style>