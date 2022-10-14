<template>
  <ul v-if="cards" class="special-cards block-wrapper">
    <li 
      class="special-cards__item card"
      v-for="(el, id) in cards"
      :key="id"
      ref="card"
    >
      <!-- <div class="card__image block-wrapper" ref="imageBlock">
        <div class="card__mask" ref="imageMask"></div>
        <img :src="`${getApiUrl()}${el?.attributes?.Offer?.Offer_small_photo?.data?.attributes?.url}`" alt="mainImage" ref="imageBg" />
      </div> -->

      <NuxtLink class="card__link" :to="localePath(`/special-offers/${el?.attributes?.Slug}`)">
        <p class="card__title h3 block-wrapper" ref="title">{{el?.attributes?.Offer?.Offer_title}}</p>

        <div class="card__img block-wrapper">
          <img
            :src="`${getApiUrl()}${el?.attributes?.Offer?.Offer_cover_photo?.data?.attributes?.url}`"
            :alt="`${el?.attributes?.Offer?.Offer_title}-image`" ref="image"
          />
        </div>

        <p class="card__date p1" ref="date">{{el?.attributes?.Offer?.Offer_date}}</p>

        <p class="card__description p1" ref="descr">{{el?.attributes?.Offer?.Description_preview}}</p>
      </NuxtLink>
    </li>
    <li
      v-if="(cards.length % 2) !== 0"
      class="special-cards__item special-cards__item--logo card"
    >
      <NuxtLink class="card__link" :to="localePath(`/`)">
        <svg width="400" height="359" viewBox="0 0 400 359" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.5">
          <path d="M152.63 348.745L199.913 295.564L247.198 348.745H152.63ZM60.9269 289.379V237.41L70.8481 226.255V289.379H80.267V215.657L104.57 188.326L128.867 215.653V289.379H138.286V226.248L148.205 237.406V289.379H157.626V247.999L167.546 259.159V289.379H176.965V269.754L193.466 288.316L136.649 352.219C134.958 354.12 135.218 355.545 135.522 356.226C135.829 356.905 136.724 358.043 139.26 358.043H260.563C261.955 358.043 263.179 357.251 263.754 355.977C264.326 354.705 264.105 353.264 263.175 352.219L206.36 288.313L222.857 269.759V289.377H232.278V259.163L242.197 248.005V289.377H251.616V237.412L261.533 226.255V289.377H270.953V215.658L295.256 188.322L319.552 215.653V289.377H328.974V226.248L338.894 237.406V289.377H348.312V247.999L358.235 259.159V289.377H367.654V269.754L385.028 289.295L385.108 289.383H398L295.449 174.037L295.25 173.814L199.911 281.064L104.763 174.054L104.563 173.83L2.22514 288.942L1.82812 289.389L14.7199 289.383L32.1673 269.759V289.379H41.5868V259.163L51.5056 248.005V289.379H60.9269Z" stroke="black"/>
          <path d="M99.6107 214.176H90.1875V289.38H99.6107V214.176Z" stroke="black"/>
          <path d="M118.947 214.176H109.527V289.38H118.947V214.176Z" stroke="black"/>
          <path d="M280.875 289.379H290.298V214.175H280.875V289.379Z" stroke="black"/>
          <path d="M309.634 214.176H300.215V289.38H309.634V214.176Z" stroke="black"/>
          <path d="M209.179 41.918C212.388 41.918 214.998 39.3089 214.998 36.1003C214.998 32.8893 212.388 30.2803 209.179 30.2803C205.968 30.2803 203.359 32.8893 203.359 36.1003C203.359 39.3089 205.968 41.918 209.179 41.918Z" stroke="black"/>
          <path d="M126.46 163.703L199.908 81.0834L273.364 163.701L199.911 246.318L126.46 163.703ZM199.911 260.816L286.096 163.877L286.255 163.697L206.579 74.0833C234.503 44.1601 257.491 41.6759 261.824 41.482C263.833 41.3755 265.467 40.1264 266.436 37.9345L266.697 37.0407C267.05 35.2484 266.696 34.1099 265.373 32.8271L264.84 32.3799C246.841 17.2822 222.077 15.4482 212.267 15.3607C210.064 15.3418 204.676 15.2543 203.019 15.1203C181.122 13.3408 172.108 6.06477 168.684 1.88598L168.463 1.61682L168.122 1.52872C164.825 0.689414 161.495 0.422087 158.189 0.724898L156.858 0.84785L157.267 2.11783C157.923 4.1592 164.773 22.1498 202.357 25.1602C204.296 25.3168 209.725 25.4195 211.969 25.4569C218.422 25.5657 234.8 26.6014 248.817 33.8004C237.428 37.2493 215.476 47.1791 192.098 75.3056L113.717 163.536L113.559 163.716L199.71 260.593L199.911 260.816Z" stroke="black"/>
          </g>
        </svg>
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
import { animateJS } from "~/plugins/animations";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin";
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export default {
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    fadeCards() {
      const cards = gsap.utils.toArray(".special-cards__item");

      ScrollTrigger.batch(cards, {
        onEnter: element => {
          gsap.fromTo(element, 
            { delay: 0, yPercent: 30 }, 
            { duration: 0.5, yPercent: 0, stagger: 0.25, ease: "Power2.easeOut" }
          );
        },
        once: true,
      });
    },
    drawImage() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".special-cards__item--logo",
          start: 'top center',
        },
      });

      tl.from(
        ".card__link svg path",
        { delay: 0.5, duration: 2.5, drawSVG: '50% 50%' },
      )
    },
  },
  mounted() {
    this.$nextTick(() => {
      // const images = this.$refs.imageMask;

      // images.forEach((el) => {
      //   const tl = gsap.timeline({
      //     scrollTrigger: {
      //       trigger: el.parentNode,
      //       start: 'top bottom',
      //     },
      //   });
  
      //   tl.to( el, { width: 0, duration: 0.75, ease: "Power2.easeOut", });
      // });

      if (this.$refs.imageBg) {
        this.$refs.imageBg.forEach(el => {
          animateJS('scaleFullImage', el);
        });
      }

      if (this.$refs.image) {
        this.$refs.image.forEach(el => {
          animateJS('fadeImage', el);
        });
      }

      if (this.$refs.title) {
        this.$refs.title.forEach(el => {
          animateJS('splitText', el);
        });
      }

      if (this.$refs.date) {
        this.$refs.date.forEach(el => {
          animateJS('splitText', el);
        });
      }

      if (this.$refs.descr) {
        this.$refs.descr.forEach(el => {
          animateJS('splitText', el);
        });
      }

      if (this.$el.querySelector(".special-cards__item--logo")) {
        this.drawImage();
      }

      // this.fadeCards();
    });
  }
};
</script>

<style lang="scss" scoped>
.special-cards {
  @include min(md) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(552px, 1fr);
  }
  @include min(lg) {
    grid-auto-rows: minmax(640px, 1fr);
  }
  @include min(xl) {
    grid-auto-rows: minmax(744px, 1fr);
  }
  @include min(bg) {
    grid-auto-rows: minmax(960px, 1fr);
  }
}
.special-cards__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @include min(md) {
    height: 552px;
    justify-content: space-between;

    &:nth-of-type(odd) {
      flex-direction: row;

      .card__mask {
        right: 0;
      }
    }
    &:nth-of-type(even) {
      flex-direction: row-reverse;

      .card__mask {
        left: 0;
      }
    }
  }
  @include min(lg) {
    height: 640px;
  }
  @include min(xl) {
    height: 744px;
  }
  @include min(bg) {
    height: 960px;
  }

  &:nth-of-type(1n) {
    background-color: $grey-color;
    color: $black-color;
  }
  &:nth-of-type(2n) {
    background-color: #6A7C6F;
    color: $white-color;
  }
  &:nth-of-type(3n) {
    background-color: #BF9963;
    color: $white-color;
  }
  &:nth-of-type(4n) {
    background-color: $black-color;
    color: $white-color;
  }
  &:nth-of-type(5n) {
    background-color: #444F47;
    color: $white-color;
  }

  &.special-cards__item--logo {
    display: none;
    
    @include min(md) {
      display: unset;
      background-color: #D6BF9D;
    }
  }
  &.special-cards__item--logo img,
  &.special-cards__item--logo svg {
    margin: auto;
    object-fit: unset;

    @include min(md) {
      width: 282px;
      height: 254px;
    }
    @include min(lg) {
      width: 336px;
      height: 300px;
    }
    @include min(xl) {
      width: 396px;
      height: 357px;
    }
    @include min(bg) {
      width: 496px;
      height: 448px;
    }
  }
}
.card {
  position: relative;
}
.card__image {
  display: none;

  @include min(md) {
    width: 50%;
    height: 100%;
    display: unset;
    background-color: inherit;
    position: relative;
  }
}
.card__mask {
  width: 10%;
  height: 100%;
  background-color: inherit;
  position: absolute;
  z-index: 2;
  top: 0;
}
.card__link {
  @include pt-antiquewhite;
  @include pb-antiquewhite;
  padding-left: 18px;
  padding-right: 18px;
  width: 100%;
  height: 100%;
  text-align: center;

  @include min(md) {
    padding-left: 48px;
    padding-right: 48px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  @include min(lg) {
    padding-left: 80px;
    padding-right: 80px;
  }
  @include min(xl) {
    padding-left: 128px;
    padding-right: 128px;
  }
  @include min(bg) {
    padding-left: 140px;
    padding-right: 140px;
  }
}
.card__title {
  margin-bottom: 32px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  @include min(sm) {
    width: 60%;
  }
  @include min(tb) {
    margin-bottom: 48px;
  }
  @include min(md) {
    margin-bottom: auto;
    width: 100%;
  }
}
.card__img {
  margin: 0 auto;
  width: 187px;
  height: 216px;

  @include min(sm) {
    width: 290px;
    height: 369px;
  }
  @include min(md) {
    width: 170px;
    height: 201px;
  }
  @include min(lg) {
    width: 240px;
    height: 290px;
  }
  @include min(xl) {
    width: 290px;
    height: 339px;
  }
  @include min(bg) {
    width: 380px;
    height: 444px;
  }
}
.card__date {
  @include mt-gold;
}
.card__description {
  @include mt-cornflowerblue;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  @include min(sm) {
    width: 60%;
  }
  @include min(md) {
    width: 100%;
  }
}
</style>