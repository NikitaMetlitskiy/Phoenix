<template>
  <div class="main-relaxation">
    <div class="container">
      <div class="main-relaxation__title h2" ref="title">{{dataCards?.SPA_title}}</div>
    </div>

    <div class="main-relaxation__cards">
      <div class="main-relaxation__cards-line main-relaxation__cards-line_top" ref="lineTop"></div>
      <div class="main-relaxation__cards-line main-relaxation__cards-line_bottom" ref="lineBottom"></div>
      <div class="main-relaxation__cards-line main-relaxation__cards-line_center" ref="lineCenter"></div>
      <div class="main-relaxation__card">
        <div class="main-relaxation__card-title h4" ref="cardTitleLeft">{{dataCards?.Spa_left?.SPA_wellness}}</div>
        <div class="main-relaxation__card-img-wrap block-wrapper">
          <img :src="`${getApiUrl()}${dataCards?.Spa_left?.Photo_left?.data?.attributes?.url}`" alt="img" ref="cardImageLeft" />
        </div>
        <div class="main-relaxation__card-text p1" ref="cardTextLeft">{{dataCards?.Spa_left?.Description_left}}</div>
      </div>
      <div class="main-relaxation__cards-line main-relaxation__cards-line_center-mobile" ref="lineCenterMob"></div>
      <div class="main-relaxation__card main-relaxation__card_right">
        <div class="main-relaxation__card-title h4" ref="cardTitleRight">{{dataCards?.Spa_right?.SPA_pool}}</div>
        <div class="main-relaxation__card-img-wrap block-wrapper">
          <img :src="`${getApiUrl()}${dataCards?.Spa_right?.Photo_right?.data?.attributes?.url}`" alt="img" ref="cardImageRight" />
        </div>
        <div class="main-relaxation__card-text p1" ref="cardTextRight">{{dataCards?.Spa_right?.Description_right}}</div>
      </div>
    </div>

    <div class="main-relaxation__img-wrap">
      <img :src="`${getApiUrl()}${dataSvg?.SVG?.data?.attributes?.url}`" alt="img" ref="imageBg"/>
    </div>

    <div class="main-relaxation__text container h4" ref="text">{{dataSvg?.Title_under_svg}}</div>
  </div>
</template>

<script>
import { animateJS } from "~/plugins/animations";

export default {
  props: {
    dataCards: {
      type: Object,
      default: () => {},
    },
    dataSvg: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.imageBg) {
        animateJS('scaleFullImage', this.$refs.imageBg);
      }

      if (this.$refs.title) {
        animateJS('splitTitleLeft', this.$refs.title);
      }

      if (this.$refs.text) {
        animateJS('splitTitleLeft', this.$refs.text);
      }

      if (this.$refs.lineTop) {
        animateJS('line-hr', this.$refs.lineTop);
      }

      if (this.$refs.lineBottom) {
        animateJS('line-hr', this.$refs.lineBottom);
      }

      if (this.$refs.lineCenter) {
        animateJS('line-vr', this.$refs.lineCenter);
      }
      if (this.$refs.lineCenterMob) {
        animateJS('line-hr', this.$refs.lineCenterMob);
      }

      const titles = [this.$refs.cardTitleLeft, this.$refs.cardTitleRight];
      const texts = [this.$refs.cardTextLeft, this.$refs.cardTextRight];
      const images = [this.$refs.cardImageLeft, this.$refs.cardImageRight];
      if (titles) {
        animateJS('splitTitleLeft', titles);
      }
      if (texts) {
        animateJS('splitText', texts);
      }
      if (images) {
        animateJS('fadeImage', images);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/utilities/indents";

.main-relaxation {
  @include pt-aquamarine;
  @include pb-aquamarine;
  background-color: #fff;
}
.main-relaxation__title {
  @include mb-coral;
  width: 100%;

  @include min(tb) {
    max-width: 74%;
  }  
  @include min(md) {
    max-width: 80%;
  }
}
.main-relaxation__cards {
  position: relative;
  @include min(tb) {
    display: flex;
  }
}
.main-relaxation__cards-line{
  position: absolute;
  width: 100%;
  height: 1px;
  border-top: 1px dashed rgba(54, 55, 53, .1);
  left: 0;

  &_top{
    top: 0;
  }
  &_bottom{
    bottom: 0;
  }
  &_center{
    top: 0;
    left: 50%;
    height: 100%;
    width: 1px;
    border-top: none;
    border-left: 1px dashed rgba(54, 55, 53, .1);
    display: none;

    @include min(tb){
      display: block;
    }
  }
  &_center-mobile{
    position: relative;
    @include min(tb){
      display: none;
    }
  }
}
.main-relaxation__card {
  @include pt-crimson;
  @include pb-crimson;
  padding-left: 18px;
  padding-right: 18px;
  // border-top: 1px dashed rgba(54, 55, 53, .1);

  @include min(tb) {
    width: 50%;
    padding-left: 48px;
    padding-right: 48px;
    // border-bottom: 1px dashed rgba(54, 55, 53, .1);
  }  
  @include min(md) {
    padding-left: 56px;
    padding-right: 56px;
  }  
  @include min(bg) {
    padding-left: 80px;
    padding-right: 80px;
  }

  &_right {
    // @include min(tb) {
    //   border-left: 1px dashed rgba(54, 55, 53, .1);
    // }

    .main-relaxation__card-img-wrap {
      @include min(md) {
        height: 462px;
      }
      @include min(xl) {
        height: 702px;
      }
      @include min(bg) {
        height: 936px;
      }
    }
  }
}
// .main-relaxation__card + .main-relaxation__card {
//   border-bottom: 1px dashed rgba(54, 55, 53, .1);
// }
.main-relaxation__card-title {
  @include mb-crimson;
}
.main-relaxation__card-img-wrap {
  width: 100%;
  height: 451px;

  @include min(tb) {
    height: 373px;
  }  
  @include min(md) {
    height: 518px;
  }  
  @include min(xl) {
    height: 793px;
  }  
  @include min(bg) {
    height: 1057px;
  }
}
.main-relaxation__card-text {
  @include mt-crimson;

  @include min(xl) {
    width: 82%;
  }
}
.main-relaxation__img-wrap {
  @include mt-aquamarine;
  margin-left: auto;
  margin-right: auto;
  width: 163px;
  height: 92px;
  display: block;

  @include min(md) {
    width: 192px;
    height: 108px;
  }  
  @include min(bg) {
    width: 249px;
    height: 140px;
  }

  img {
    object-fit: unset
  }
}
.main-relaxation__text {
  @include mt-cornflowerblue;
  text-align: center;

  @include min(md){
    max-width: 75vw;
  }
  @include min(xl){
    max-width: 65vw;
  }
  @include min(bg){
    max-width: 1260px;
  }
}
</style> 