<template>
  <div class="accommodation-more">
    <p v-if="title" class="accommodation-more__title h2 block-wrapper" ref="title">{{ title }}</p>

    <CircleBtn
      v-if="circleBtnText"
      class="accommodation-more__circle-btn"
      :textBtn="circleBtnText"
      :linkBtn="circleBtnLink"
    />

    <div v-if="moreItemsList" class="accommodation-more__cards">
      <NuxtLink 
        class="accommodation-more__cards-item accommodation-card block-wrapper"
        v-for="(item, id) in moreItemsList"
        :key="id"
        :to="localePath(`/accommodations/${item?.attributes?.Slug}`)"
      >
        <div class="accommodation-header__bg"  ref="cardImage">
          <img
            :src="`${getApiUrl()}${item?.attributes?.Main_room?.Room_cover_background?.data?.attributes?.url}`"
            :alt="`${item?.attributes?.Main_room?.Title_room}-bg`"
          />
        </div>

        <p class="accommodation-card__title h4" ref="cardTitle">{{item?.attributes?.Main_room?.Title_room}}</p>

        <ul class="accommodation-card__list">
          <li 
            class="accommodation-card__list-item"
            v-for="(el, index) in item?.attributes?.Main_room?.Includes"
            :key="index"
            ref="cardItem"
          >
            <p class="accommodation-card__list-item-name p3">{{el?.Include_description}}</p>
            <p class="accommodation-card__list-item-value p3">{{el?.Include}}</p>
          </li>
        </ul>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { animateJS } from "~/plugins/animations";
import CircleBtn from "~/components/common/CircleBtn.vue";

export default {
  components: { CircleBtn },
  props: {
    title: {
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
    moreItemsList: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.$nextTick(() => {
      animateJS('scaleFullImage', this.$refs.cardImage);
      animateJS('splitTitleLeft', this.$refs.cardTitle);
      animateJS('fadeCards', this.$refs.cardItem);
    });
  }
};
</script>

<style lang="scss" scoped>

.accommodation-more {
  @include pt-thistle;
}
.accommodation-more__title {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  max-width: 300px;

  @include min(tb) {
    width: 400px;
    max-width: unset;
  }
  @include min(md) {
    width: 460px;
  }
  @include min(xl) {
    width: 507px;
  }
  @include min(bg) {
    width: 676px;
  }
}
.accommodation-more__circle-btn {
  @include mb-skyblue;
  margin-top: -12px;
  margin-left: auto;
  margin-right: auto;

  @include min(tb) {
    margin-top: -22px;
  }
  @include min(md) {
    margin-top: -17px;
  }
  @include min(xl) {
    margin-top: -31px;
  }
}
.accommodation-more__cards {
  display: flex;
  flex-direction: column;

  @include min(tb) {
    flex-direction: row;
    justify-content: space-between;
  }
}
.accommodation-card {
  @include pb-cornflowerblue;
  padding-left: 18px;
  padding-right: 18px;
  height: 304px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  color: #FFFFFF;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    z-index: 5;
    top: 24px;
    right: 24px;
    display: none;
    width: 24px;
    height: 24px;
    background: transparent url('~/static/icons/icon-angle.svg') no-repeat center center / cover;
    opacity: 0;
    transition: all 0.3s cubic-bezier(.37,.53,.38,1);
  }

  &::after {
    content: "";
    position: absolute;
    z-index: 6;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
  }

  @include min(sm) {
    height: 400px;
  }
  @include min(tb) {
    padding-left: 24px;
    padding-right: 24px;
    width: 50%;
    height: 311px;
  }
  @include min(md) {
    padding-left: 32px;
    padding-right: 32px;
    height: 530px;

    &::before {
      display: block;
    }
  }
  @include min(lg) {
    padding-left: 48px;
    padding-right: 48px;
    height: 624px;

    &::before {
      top: 32px;
      right: 32px;
    }
  }
  @include min(xl) {
    padding-left: 64px;
    padding-right: 64px;
    height: 744px;

    &::before {
      top: 48px;
      right: 48px;
    }
  }
  @include min(bg) {
    padding-left: 80px;
    padding-right: 80px;
    height: 982px;

    &::before {
      width: 32px;
      height: 32px;
      top: 64px;
      right: 64px;
    }
  }
}
.accommodation-header__bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  img {
    transition: transform 1s cubic-bezier(.37,.53,.38,1);
  }
}
.accommodation-card__title {
  margin-top: auto;
  position: relative;
  z-index: 2;
}
.accommodation-card__list {
  @include mt-gold;
  position: relative;
  z-index: 2;
}
.accommodation-card__list-item {
  display: flex;
  text-transform: uppercase;

  &:not(:last-child) {
    @include mb-olive;
  }
}
.accommodation-card__list-item-name {
  padding-right: 5px;
  line-height: 1.2;

  @include min(tb) {
    font-size: 14px;
  }
  @include min(bg) {
    font-size: 16px;
  }
}
.accommodation-card__list-item-value {
  line-height: 1.2;

  @include min(tb) {
    font-size: 14px;
  }
  @include min(bg) {
    font-size: 16px;
  }
}

@media (hover: hover) {
  .accommodation-card:hover {
    &::before {
      opacity: 1;
      transition: opacity 0.5s cubic-bezier(.37,.53,.38,1);
    }
    .accommodation-header__bg img {
      transform: scale(1.05);
      transition: transform 1s cubic-bezier(.37,.53,.38,1);
    }
  }
}
</style>