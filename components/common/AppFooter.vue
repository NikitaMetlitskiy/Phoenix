<template>
  <footer class="footer">
    <div class="footer__bg">
      <ImageLogo />
    </div>

    <div class="footer__top container">
      <ul
        class="footer__top-list"
        v-for="(item, id) in getFooterData?.Block_menu"
        :key="id"
      >
        <li 
          class="footer__top-list-item footer__top-list-item--caption a1"
          @click="toggleList($event)"
          ref="cardTitle"
        >
          {{item?.Title}}
          <button class="footer__top-list-item--plus" type="button">+</button>
        </li>
        <li
          class="footer__top-list-item p1"
          v-for="(el, id) in item?.Menu_link"
          :key="id"
        >
          <NuxtLink
            v-if="item?.Accommodations"
            class="footer__top-list-link hover-nonlinear-white"
            :to="localePath(`/accommodations/${el?.Slug}`)"
          >
            {{el?.Page_name}}
          </NuxtLink>
          <NuxtLink
            v-else
            class="footer__top-list-link hover-nonlinear-white"
            :to="localePath(`/${el?.Slug}`)"
          >
            {{el?.Page_name}}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <NuxtLink class="footer__booking h1" :to="localePath('/choose-apartment')">
      {{getFooterData?.Button_text}}
    </NuxtLink>

    <div class="footer__bottom container">
      <a
        class="footer__address hover-nonlinear-white p1"
        :href="getData?.Contact?.Location_link"
        target="_blank"
      >{{getData?.Contact?.Location}}</a>

      <div class="footer__contacts">
        <a
          class="footer__contacts-link p1 hover-nonlinear-white"
          :href="`tel:${getData?.Contact?.Contact_block?.Phone}`"
        >{{getData?.Contact?.Contact_block?.Phone}}</a>
        <a
          class="footer__contacts-link p1 hover-nonlinear-white"
          :href="`mailto:${getData?.Contact?.Contact_block?.Email}`"
        >{{getData?.Contact?.Contact_block?.Email}}</a>
      </div>

      <div class="footer__payments">
        <div class="footer__payments-icon block-wrapper">
          <img src="/icons/footer-icon-visa.svg" alt="bank-icon">
        </div>
        <div class="footer__payments-icon block-wrapper">
          <img src="/icons/footer-icon-mc.svg" alt="bank-icon">
        </div>
      </div>

      <div class="footer__copy p1">(c) {{new Date().getFullYear()}} {{$t('phoenix all rights reserved')}}</div>

      <ul class="footer__terms">
        <li class="footer__terms-item p1">
          <NuxtLink
            class="footer__terms-link hover-nonlinear-white"
            :to="localePath(`/privacy-policy`)"
          >{{$t('privacy policy')}}</NuxtLink>
        </li>
        <li class="footer__terms-item p1">
          <NuxtLink
            class="footer__terms-link hover-nonlinear-white"
            :to="localePath(`/terms`)"
          >{{$t('terms & conditions')}}</NuxtLink>
        </li>
        <li class="footer__terms-item p1">
          <a
            class="footer__terms-link hover-nonlinear-white"
            href="http://thefirstthelast.agency/?utm_source=phoenix&utm_medium=article&utm_campaign=promo"
            target="_blank"
          >{{$t('SITE BY the first the last')}}</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import ImageLogo from '~/components/common/ImageLogo.vue';
import { mapGetters } from "vuex";

export default {
  components: { ImageLogo },
  computed: {
    ...mapGetters("footer", ["getFooterData"]),
    ...mapGetters("contactPage", ["getData"]),
  },
  methods: {
    toggleList(event) {
      if (window.innerWidth <= 1024) {
        const items = this.$refs.cardTitle;

        if (event.currentTarget.parentNode.classList.contains("active")) {
          event.currentTarget.parentNode.classList.remove("active");
          event.currentTarget.querySelector('.footer__top-list-item--plus').textContent = "+";
        } else {
          items.forEach((item) => {
            item.querySelector('.footer__top-list-item--plus').textContent = "+";
            item.parentNode.classList.remove("active");
          });
  
          event.currentTarget.querySelector('.footer__top-list-item--plus').textContent = "-";
          event.currentTarget.parentNode.classList.toggle("active");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/utilities/indents";
@import "~/assets/scss/utilities/functions";

.footer {
  @include pt-antiquewhite;
  @include pb-gold;
  background-color: $black-color;
  color: #FFFFFF;
  position: relative;
}
.footer__bg {
  margin: 0 auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  img {
    object-fit: unset;
  }

  @include min(tb) {
    bottom: 112px;
  }
  @include min(md) {
    bottom: 125px;
  }
  @include min(xl) {
    bottom: 146px;
  }
  @include min(bg) {
    bottom: 212px;
  }
}
.footer__top {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;

  @include min(md) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: vw(12px);
  }
  @include min(xl) {
    column-gap: vw(124px);
  }
  @include min(bg) {
    column-gap: vw(165px);
  }
}
.footer__top-list {
  &:not(:last-of-type){
    @include mb-darkgreen;
    border-bottom: 1px solid rgba(#FFFFFF, 0.1);
  }

  @include min(md) {
    &:not(:last-of-type){
      border-bottom: none;
    }
  }

  &.active .footer__top-list-item:not(.footer__top-list-item--caption){
    display: block;
  }
}
.footer__top-list-item {
  &:not(:first-child) {
    @include mb-olive;
  }
  &:last-child {
    margin-bottom: 20px;
  }
  &:not(:first-child) {
    display: none;

    @include min(md) {
      display: block;
    }
  }
}
.footer__top-list-item--caption {
  @include mb-darkgreen;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include min(md) {
    & .footer__top-list-item--plus {
      display: none;
    }
  }
}
.footer__top-list-item--plus {
  @include min(md) {
    display: none;
  }
}
.footer__booking {
  @include mt-crimson;
  display: block;
  text-align: center;
  position: relative;
  z-index: 2;
  transition: opacity 0.5s cubic-bezier(.37,.53,.38,1);
}
.footer__bottom {
  @include mt-antiquewhite;
  text-align: center;
  position: relative;
  z-index: 2;
}
.footer__address {
  opacity: 0.3;
}
.footer__contacts {
  @include mt-olive;
}
.footer__contacts-link {
  opacity: 0.3;
  transition: opacity 0.5s cubic-bezier(.37,.53,.38,1);

  &:not(:last-child) {
    margin-right: 16px;
  }

  @include min(xl) {
    &:not(:last-child) {
      margin-right: 35px;
    }
  }
}
.footer__payments {
  @include mt-blueviolet;
  display: flex;
  justify-content: center;
}
.footer__payments-icon {
  width: 66px;
  height: 43px;
  opacity: 0.3;

  &:not(:last-child) {
    margin-right: 12px;
  }

  img {
    object-fit: unset;
  }
}
.footer__copy {
  @include mt-gold;
  opacity: 0.3;
}
.footer__terms {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @include min(tb) {
    flex-wrap: nowrap;
  }
}
.footer__terms-item {
  &:not(:last-child) {
    margin-right: 12px;
    position: relative;
    &::after {
      content: "/";
      position: absolute;
      right: -8px;
      opacity: 0.3;
    }
  }
}
.footer__terms-link {
  opacity: 0.3;
  transition: opacity 0.5s cubic-bezier(.37,.53,.38,1);
}

@media (hover: hover) {
  .footer__contacts-link:hover,
  .footer__address:hover,
  .footer__terms-link:hover {
    opacity: 1;
    transition: opacity 0.5s cubic-bezier(.37,.53,.38,1);
  }
  .footer__booking:hover {
    opacity: 0.3;
    transition: opacity 0.5s cubic-bezier(.37,.53,.38,1);
  }
}
</style>