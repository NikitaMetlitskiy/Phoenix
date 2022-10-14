<template>
  <div class="privacy-info container">
    <h1 v-if="title" class="privacy-info__title h2" ref="title">{{title}}</h1>

    <ul v-if="list" class="privacy-info__content">
      <li 
        v-for="(item, id) in list"
        :key="id"
        class="privacy-info__content-item"
      >
        <p class="privacy-info__content-item-title h4" ref="itemName">{{item?.Title}}</p>
        <div
          class="privacy-info__content-item-value p3"
          v-html="item?.Description"
          ref="itemInfo"
        ></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { animateJS } from "~/plugins/animations";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
    mounted() {
    this.$nextTick(() => {
      animateJS('splitTitleLeft', this.$refs.title);

      if (this.$refs.itemName) {
        this.$refs.itemName.forEach(el => {
          animateJS('splitTitleLeft', el);
        })
      }

      if (this.$refs.itemInfo) {
        this.$refs.itemInfo.forEach(el => {
          animateJS('fade', el);
        })
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/utilities/indents";

.privacy-info {
  margin-top: 64px;
  background-color: $white-color;

  @include min(tb) {
    margin-top: 85px;
  }
  @include min(md) {
    text-align: center;
  }
  @include min(xl) {
    margin-top: 94px;
  }
  @include min(bg) {
    margin-top: 125px;
  }
}
.privacy-info__title {
  @include pt-skyblue;
}
.privacy-info__content {
  @include pb-thistle;
  margin-left: auto;
  margin-right: auto;
  text-align: left;

  @include min(md) {
    width: 83%;
  }
  @include min(xl) {
    width: 63%;
  }
}
.privacy-info__content-item {
  @include mt-antiquewhite;
}
.privacy-info__content-item-title {
  @include mb-gold;
}
.privacy-info__content-item-value {
  opacity: 0.8;

  &:not(:last-child) {
    @include mb-antiquewhite;
  }
}
</style>