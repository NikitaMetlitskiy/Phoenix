<template>
  <div class="language-list">
    <ul
      class="language-wrapper"
    >
      <li
        v-for="(value, key) in langList"
        :key="key"
        class="language-btn p1"
        :class="{'language-btn--current': value === $i18n.locale}"
      >
        <nuxt-link :to='switchLocalePath(value)'>{{ value }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    langList: ['en', 'ua'],
  }),
};
</script>

<style lang='scss' scoped>
@import "~/assets/scss/utilities/indents";

.language-list {
  pointer-events: none;
  transition: all 0.3s cubic-bezier(.37,.53,.38,1);
}

.language-list:hover {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(.37,.53,.38,1);

  .language-wrapper {
    pointer-events: all;
  }

  .language-btn {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
    z-index: 1;
    transition: visibility 0.3s cubic-bezier(.37,.53,.38,1), transform 0.3s cubic-bezier(.37,.53,.38,1);
  }
}

.language-wrapper {
  display: flex;
  flex-direction: column;
  transform: translateY(25%);
  transition: all 0.3s cubic-bezier(.37,.53,.38,1);
}

.language-btn {
  text-transform: uppercase;
  transform: translateY(-50%);
  order: 2;
  position: relative;
  z-index: -1;
  visibility: hidden;

  &.language-btn--current {
    opacity: 1;
    order: 1;
    transform: translateY(0);
    visibility: visible;
    pointer-events: all;
    z-index: 3;
  }
}
</style>
