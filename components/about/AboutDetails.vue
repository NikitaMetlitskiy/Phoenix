<template>
  <div class="about-details container">
    <div class="about-details__inner" ref="aboutInner">
      <p
        v-if="data?.Description_left"
        class="about-details__text-top h4"
        ref="text1"
      >
        {{ data?.Description_left }}
      </p>

      <div
        v-if="data?.Photo_right?.data?.attributes?.url"
        class="about-details__photo-right"
      >
        <img
          :src="`${getApiUrl()}${data?.Photo_right?.data?.attributes?.url}`"
          alt="photo"
          ref="photoRight"
        />
        <div class="about-details__btn" ref="aboutBtn">
          <CircleBtn
            :typeBtn="'button'"
            :textBtn="$t('be an investor')"
            @click.native="showModal"
          />
        </div>
        <!-- <CircleBtn
        class="about-details__btn"
            ref="aboutBtn"
            :typeBtn="'button'"
            :textBtn="$t('be an investor')"
            @click.native="showModal"
          /> -->
        <!-- :linkBtn="'accommodations?part=rooms'" -->
      </div>
      <div
        v-if="data?.Photo_center?.data?.attributes?.url"
        class="about-details__photo-center"
        ref="photoCenterWrapper"
      >
        <img
          :src="`${getApiUrl()}${data?.Photo_center?.data?.attributes?.url}`"
          alt="photo"
          ref="photoCenter"
        />
      </div>
      <div
        v-if="data?.Photo_left?.data?.attributes?.url"
        class="about-details__photo-left"
        ref="photoLeftWrapper"
      >
        <img
          :src="`${getApiUrl()}${data?.Photo_left?.data?.attributes?.url}`"
          alt="photo"
          ref="photoLeft"
        />
      </div>

      <div class="about-details__text-center h2" ref="aboutTextBottom">
        <span class="about-details__text-center-first" ref="aboutTextBottom1">{{
          data?.Title_1
        }}</span>
        <span
          class="about-details__text-center-second"
          ref="aboutTextBottom2"
          >{{ data?.Title_2 }}</span
        >
      </div>
      <div class="about-details__text-bottom p1" ref="text2">
        {{ data?.Description_under_title }}
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
import QuestionForm from "~/components/form/QuestionForm.vue";
import { animateJS, parallaxImage } from "~/plugins/animations";
import { gsap } from "gsap";

export default {
  components: { CircleBtn, ModalDelivery, QuestionForm },
  props: {
    data: {
      type: Object,
      default: () => {},
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
        y: "100vh",
        rotate: "17deg",
        delay: 0.5,
      });
    },
  },
  mounted() {
    if (window.innerWidth >= 1024) {
      // this.$refs.aboutTextBottom.append(this.$refs.aboutBtn.$el);
      this.$refs.aboutTextBottom.append(this.$refs.aboutBtn);
    }

    this.$nextTick(() => {
      animateJS("splitTitleLeft", this.$refs.aboutTextBottom1);
      animateJS("splitTitleLeft", this.$refs.aboutTextBottom2);
      animateJS("splitTitleLeft", this.$refs.text1);
      animateJS("splitText", this.$refs.text2);
      animateJS("fadeImage", this.$refs.photoRight);
      animateJS("fadeImage", this.$refs.photoCenter);
      animateJS("fadeImage", this.$refs.photoLeft);
      parallaxImage(this.$refs.photoCenter, this.$refs.photoCenterWrapper, 40);
      parallaxImage(this.$refs.photoLeft, this.$refs.photoLeftWrapper, 70);
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/utilities/indents";

.about-details {
  @include pt-thistle;
  @include pb-thistle;
}
.about-details__inner {
  width: 100%;
  height: 100%;
  position: relative;

  @include min(md) {
    min-height: 715px;
  }
  @include min(xl) {
    min-height: 873px;
  }
  @include min(bg) {
    min-height: 1117px;
  }
}
.about-details__text-top {
  @include mb-coral;
  font-size: 26px;

  @include min(tb) {
    width: 396px;
    font-size: 24px;
  }
  @include min(md) {
    padding-top: 92px;
    width: 319px;
  }
  @include min(xl) {
    padding-top: 163px;
  }
  @include min(bg) {
    padding-top: 223px;
    width: 431px;
    font-size: 32px;
  }
}
.about-details__photo-right {
  height: 204px;
  position: relative;

  @include min(460) {
    height: 300px;
  }
  @include min(sm) {
    height: 350px;
  }
  @include min(tb) {
    height: 414px;
  }
  @include min(md) {
    width: 41%;
    height: 255px;
    position: absolute;
    z-index: -1;
    right: -48px;
    top: 100px;
  }
  @include min(lg) {
    height: 325px;
  }
  @include min(xl) {
    width: 43%;
    height: 374px;
    right: -64px;
    top: 159px;
  }
  @include min(bg) {
    width: 44%;
    height: 502px;
    right: -80px;
    top: 212px;
  }
}
.about-details__btn {
  position: absolute;
  right: 4px;
  bottom: -46px;

  @include min(tb) {
    right: 23px;
    bottom: -49px;
  }
  @include min(md) {
    // right: 0;
    right: -115px;
    bottom: -92px;
  }
  @include min(xl) {
    // right: 0;
    right: -202px;
    bottom: -120px;
  }
  @include min(bg) {
    right: -50px;
    bottom: -160px;
  }
}
.about-details__photo-center {
  display: none;

  @include min(md) {
    width: 29%;
    height: 180px;
    display: block;
    position: absolute;
    z-index: -1;
    right: 235px;
    top: 0;
  }
  @include min(lg) {
    height: 220px;
  }
  @include min(xl) {
    width: 34%;
    height: 290px;
    right: 30%;
  }
  @include min(bg) {
    height: 385px;
    right: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
.about-details__photo-left {
  display: none;

  @include min(md) {
    width: 21%;
    height: 258px;
    display: block;
    position: absolute;
    z-index: -1;
    left: 0;
    bottom: 55px;
  }
  @include min(lg) {
    height: 274px;
  }
  @include min(xl) {
    width: 16.4%;
    bottom: 58px;
  }
  @include min(bg) {
    height: 362px;
    bottom: 34px;
  }
}
.about-details__text-center {
  @include mt-skyblue;

  @include min(tb) {
    width: 600px;
  }
  @include min(md) {
    margin-left: 15.6%;
    margin-top: 138px;
    // width: 63%;
    width: 67%;
    position: relative;
  }
  @include min(lg) {
    margin-top: 178px;
    width: 61%;
  }
  @include min(xl) {
    margin-top: 148px;
    margin-left: 14%;
    width: 68%;
  }
  @include min(bg) {
    margin-top: 199px;
    margin-left: 15%;
    width: 71%;
  }
}
.about-details__text-center-second {
  @include min(md) {
    width: 100%;
    display: inline-block;
    margin-left: 115px;
  }
  @include min(xl) {
    margin-left: 202px;
  }
  @include min(bg) {
    margin-left: 266px;
    margin-left: 0;
    padding-left: 266px;
  }
}
.about-details__text-bottom {
  @include mt-coral;

  @include min(tb) {
    width: 455px;
  }
  @include min(md) {
    margin-left: calc(15.6% + 115px);
    width: 340px;
  }
  @include min(xl) {
    margin-left: calc(14% + 202px);
    width: 319px;
  }
  @include min(bg) {
    margin-left: calc(15% + 266px);
    width: 455px;
  }
}
.form-block {
  transform: rotate(2deg);
}
</style>
