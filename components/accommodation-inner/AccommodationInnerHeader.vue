<template>
  <div class="accommodation-header container">
    <div v-if="accommodationBg" class="accommodation-header__bg block-wrapper">
      <div class="accommodation-header__bg-cover"></div>
      <img :src="accommodationBg" alt="headerImg" ref="imageBg" />
    </div>

    <div class="accommodation-header__inner" ref="headerInner">
      <div v-if="nextItemLink" class="p1-light" ref="link">
        <NuxtLink
          class="accommodation-header__link hover-nonlinear-white"
          :to="localePath(`/accommodations/${nextItemLink}`)"
        >
          {{nextItem}}
        </NuxtLink>
      </div>
      <h1 v-if="title" class="accommodation-header__title h2" ref="title">{{title}}</h1>
      <p v-if="price" class="accommodation-header__price" ref="price">
        <span class="p1">{{$t('from')}}</span>
        <span class="accommodation-header__price-num h4">{{price}}₴</span>
        <span class="p1">{{$t('night')}}</span>
      </p>

      <ul v-if="detailsList" class="accommodation-header__list">
        <li 
          class="accommodation-header__list-item p1-light"
          v-for="(item, id) in detailsList"
          :key="id"
          ref="card"
        >
          <span class="accommodation-header__list-item-name">{{item?.Include_description}}</span>
          <span class="accommodation-header__list-item-colon">:</span>
          <span class="accommodation-header__list-item-value">{{item?.Include}}</span>
        </li>
      </ul>
    </div>

    <p v-if="text" class="accommodation-header__text p1-light" ref="text">{{text}}</p>

    <div v-if="smallImage" class="accommodation-header__image" ref="smallImageWrapper">
      <img :src="smallImage" alt="image" ref="smallImage" />

      <CircleBtn
        class="accommodation-header__circle-btn"
        ref="headerBtn"
        :textBtn="circleBtnText"
        :linkBtn="circleBtnLink"
        :absolute="true"
      />
    </div>
  </div>
</template>

<script>
import CircleBtn from "~/components/common/CircleBtn.vue";
import { parallaxImage, animateJS } from "~/plugins/animations";

export default {
  components: { CircleBtn },
  props: {
    title: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    accommodationBg: {
      type: String,
      default: "",
    },
    smallImage: {
      type: String,
      default: "",
    },
    nextItem: {
      type: String,
      default: "",
    },
    nextItemLink: {
      type: String,
      default: "'accommodations'",
    },
    circleBtnText: {
      type: String,
      default: "",
    },
    circleBtnLink: {
      type: String,
      default: "",
    },
    detailsList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    mobileHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    listItemsWidth(){
      const listNamesWidth = [];
      const listNames = document.querySelectorAll(".accommodation-header__list-item-name");
      listNames.forEach(item => {
        listNamesWidth.push(item.getBoundingClientRect().width);
      });

      const maxWidth = window.innerWidth >= 1024 ? `${Math.max(...listNamesWidth)}px` : 'auto';

      document.documentElement.style.setProperty('--listNameWidth', maxWidth);
    }
  },
  mounted() {
    this.mobileHeight();
    this.listItemsWidth();

    if (window.innerWidth < 768) {
      this.$refs.headerInner.append(this.$refs.headerBtn.$el);
    }

    this.$nextTick(() => {
      animateJS('scaleFullImage', this.$refs.imageBg);
      animateJS('splitTitleLeft', this.$refs.title);
      animateJS('splitText', this.$refs.link);
      animateJS('splitText', this.$refs.price);
      animateJS('splitText', this.$refs.text);
      animateJS('fade', this.$refs.card);

      parallaxImage(this.$refs.smallImage, this.$refs.smallImageWrapper, 25);
    });
  }
};
</script>

<style lang="scss" scoped>

.accommodation-header {
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 + 314px);
  color: #FFFFFF;
  position: relative;

  @include min(tb) {
    height: calc(var(--vh, 1vh) * 100 + 250px);
  }
  @include min(xl) {
    height: calc(var(--vh, 1vh) * 100 + 380px);
  }
  @include min(bg) {
    height: calc(var(--vh, 1vh) * 100 + 387px);
  }
}
.accommodation-header__bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.accommodation-header__bg-cover{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
  z-index: 1;
}
.accommodation-header__inner {
  padding-top: 64px;
  padding-bottom: 48px;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 2;

  @include min(tb) {
    padding-top: 85px;
    @include pb-crimson;
  }
  @include min(xl) {
    padding-top: 94px;
  }
  @include min(bg) {
    padding-top: 125px;
  }
}
.accommodation-header__link {
  @include mt-darkgreen;
  padding-right: 14px;
  width: max-content;
  display: block;
  opacity: 0.5;
  transition: opacity 0.75s cubic-bezier(.37,.53,.38,1);
  position: relative;

  @include min(md) {
    @include mt-cornflowerblue;
    position: absolute;
    right: 0;
  }
  @include min(xl) {
    padding-right: 18px;
  }
  @include min(bg) {
    padding-right: 22px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    right: 0;
    width: 7px;
    height: 10px;
    background: transparent url('~/static/icons/icon-arrow-right.svg') no-repeat center center / cover;

    @include min(xl) {
      top: 4px;
    }
    @include min(bg) {
      top: 5px;
      width: 9px;
      height: 12px;
    }
  }
}
.accommodation-header__title {
  @include mt-cornflowerblue;

  @include min(sm) {
    width: 522px;
  }
  @include min(md) {
    @include mt-darkgreen;
  }
  @include min(xl) {
    width: 732px;
  }
  @include min(bg) {
    width: 1000px;
  }
}
.accommodation-header__price {
  @include mt-cornflowerblue;
}
.accommodation-header__price-num{
  display: inline-block;
  margin: 0 14px;
  @include min(xl){
    margin: 0 12px;
  }
  @include min(bg){
    margin: 0 18px;
  }
}
.accommodation-header__list {
  margin-top: auto;
  // opacity: 0.5;
}
.accommodation-header__list-item {
  &:not(:last-child) {
    @include mb-olive;
  }
}
.accommodation-header__list-item-name {
  min-width: var(--listNameWidth);
  @include min(md) {
    display: inline-block;
  }
}
.accommodation-header__list-item-colon{
  display: inline-block;
  
  @include min(md){
    margin-left: 18px;
    margin-right: 18px;
  }
  @include min(bg){
    margin-left: 24px;
    margin-right: 32px;
  }
}
.accommodation-header__text {
  display: none;

  @include min(tb) {
    @include mb-cornflowerblue;
    width: 339px;
    display: unset;
    position: absolute;
    z-index: 10;
    bottom: 0;
  }
  @include min(md) {
    padding-left: 28px;
    width: 392px;

    &::before {
      content: "/*";
      position: absolute;
      left: 0;
    }
  }
  @include min(xl) {
    width: 570px;
  }
  @include min(bg) {
    width: 750px;
  }
}
.accommodation-header__image {
  width: 269px;
  height: 314px;
  position: absolute;
  z-index: 2;
  right: 0;
  top: calc(var(--vh, 1vh) * 110);

  @include min(tb) {
    width: 320px;
    height: 441px;
    top: calc(var(--vh, 1vh) * 90);
  }
  @include min(md) {
    width: 428px;
    height: 491px;
    top: calc(var(--vh, 1vh) * 83);
  }
  @include min(xl) {
    width: 549px;
    height: 640px;
    top: calc(var(--vh, 1vh) * 86.5);
  }
  @include min(bg) {
    width: 733px;
    height: 853px;
  }
}
.accommodation-header__circle-btn {
  color: $black-color;
  position: absolute;
  z-index: 3;
  bottom: 48px;
  right: 0;

  @include min(tb) {
    top: -54px;
    bottom: unset;
    left: -54px;
    right: unset;
  }
  @include min(md) {
    top: -35px;
    left: -71px;
  }
  @include min(xl) {
    top: -64px;
    left: -61px;
  }
  @include min(bg) {
    top: -90px;
    left: -88px;
  }
}

@media (hover: hover) {
  .accommodation-header__link:hover {
    opacity: 1;
    transition: opacity 0.75s cubic-bezier(.37,.53,.38,1);
  }
}
</style>