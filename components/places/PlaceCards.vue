<template>
  <ul class="place-cards">
    <li
      class="place-cards__item block-wrapper"
      :class="{
        'place-cards__item--restaurant': isRestaurant,
        'place-cards__item--spa': isSpa
      }"
      v-for="(item, index) in cards"
      :key="index"
    >
      <div class="place-cards__image block-wrapper" ref="imageBlock">
        <div class="place-cards__image-mask" ref="imageMask"></div>
        <img :src="`${getApiUrl()}${item?.Photo_big?.data?.attributes?.url}`" alt="mainImage" ref="imageBg" />
        <img v-if="item?.QR" class="place-cards__image-qr" :src="`${getApiUrl()}${item?.QR?.data?.attributes?.url}`" alt="qr-code" ref="imageQR"/>
      </div>

      <div class="place-cards__info container block-wrapper">
        <h2 class="place-cards__info-title h2 block-wrapper" ref="title">{{ item?.Title }}</h2>
        <a 
          v-if="item?.Link_value && isRestaurant"
          class="place-cards__info-subtitle a1"
          :class="{
            'hover-linear-white': isRestaurant && (index === 0 || (index % 2 === 0)),
            'hover-linear-dark': isRestaurant && (index === 1 || (index % 2 !== 0)),
          }"
          :href="`${getApiUrl()}${item?.Link_value?.data?.attributes?.url}`"
          target="_blank"
          download
          ref="textUp"
        >
          {{ item?.Link_name }}
        </a>
        <p v-else class="place-cards__info-subtitle p1" ref="textUp">{{ item?.Link_name || item?.Price }}</p>

        <div class="place-cards__info-image">
          <img :src="`${getApiUrl()}${item?.Photo_small?.data?.attributes?.url}`" alt="smallImage" ref="image" />
        </div>

        <p class="place-cards__info-text p1 block-wrapper" ref="textDown">{{ item?.Description }}</p>
        <p v-if="item?.Book_title" class="place-cards__info-subtext p1 block-wrapper" ref="text">{{ item?.Book_title }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { animateJS } from "~/plugins/animations";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default {
  props: {
    isRestaurant: {
      type: Boolean,
      default: false,
    },
    isSpa: {
      type: Boolean,
      default: false,
    },
    cards: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.$nextTick(() => {
      const images = this.$refs.imageMask;

      images.forEach((el) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el.parentNode,
            start: 'top bottom',
          },
        });
  
        tl.to(
          el, { width: 0, duration: 0.75, ease: "Power2.easeOut", }
        )
      });

      if (this.$refs.imageBg) {
        this.$refs.imageBg.forEach(el => {
          animateJS('scaleFullImage', el);
        });
      }

      if (this.$refs.imageQR) {
        this.$refs.imageQR.forEach(el => {
          animateJS('visibleItem', el);
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

      if (this.$refs.textUp) {
        this.$refs.textUp.forEach(el => {
          animateJS('splitText', el);
        });
      }

      if (this.$refs.textDown) {
        this.$refs.textDown.forEach(el => {
          animateJS('splitText', el);
        });
      }

      if (this.$refs.text) {
        this.$refs.text.forEach(el => {
          animateJS('splitText', el);
        });
      }
    });
  }
};
</script>

<style lang="scss" scoped>

.place-cards__item {
  display: flex;
  flex-direction: column;

  @include min(md) {
    height: 567px;
    justify-content: space-between;
    align-items: center;
  }
  @include min(xl) {
    height: 744px;
  }
  @include min(bg) {
    height: 1004px;
  }
}
.place-cards__item--restaurant {
  &:nth-of-type(odd) {
    background-color: $black-color;
    color: $white-color;

    .place-cards__image-mask {
      background-color: $black-color;
      right: 0;
    }

    @include min(md) {
      flex-direction: row;
    }
    @include min(xl) {
      .place-cards__image-qr {
        left: 64px;
      }
    }
    @include min(bg) {
      .place-cards__image-qr {
        left: 80px;
      }
    }
  }
  &:nth-of-type(even) {
    background-color: $grey-color;
    color: $black-color;

    .place-cards__image-mask {
      background-color: $grey-color;
      left: 0;
    }

    @include min(md) {
      flex-direction: row-reverse;
    }
    @include min(xl) {
      .place-cards__image-qr {
        right: 64px;
      }
    }
    @include min(bg) {
      .place-cards__image-qr {
        right: 80px;
      }
    }
  }
}
.place-cards__item--spa {
  &:nth-of-type(odd) {
    .place-cards__image-mask {
      right: 0;
    }
    @include min(md) {
      flex-direction: row;
    }
    @include min(xl) {
      .place-cards__image-qr {
        left: 64px;
      }
    }
    @include min(bg) {
      .place-cards__image-qr {
        left: 80px;
      }
    }
  }
  &:nth-of-type(even) {
    .place-cards__image-mask {
      left: 0;
    }
    @include min(md) {
      flex-direction: row-reverse;
    }
    @include min(xl) {
      .place-cards__image-qr {
        right: 64px;
      }
    }
    @include min(bg) {
      .place-cards__image-qr {
        right: 80px;
      }
    }
  }
  &:nth-of-type(1n) {
    background-color: $grey-color;
    color: $black-color;

    .place-cards__image-mask {
      background-color: $grey-color;
    }
  }
  &:nth-of-type(2n) {
    background-color: #D6BF9D;
    color: $black-color;

    .place-cards__image-mask {
      background-color: #D6BF9D;
    }
  }
  &:nth-of-type(3n) {
    background-color: $black-color;
    color: $white-color;

    .place-cards__image-mask {
      background-color: $black-color;
    }
  }
  &:nth-of-type(4n + 4) {
    background-color: #6A7C6F;
    color: $black-color;

    .place-cards__image-mask {
      background-color: #6A7C6F;
    }
  }
}
.place-cards__image {
  height: 388px;
  position: relative;

  @include min(sm) {
    height: 540px;
  }
  @include min(tb) {
    height: 794px;
  }
  @include min(md) {
    width: 50%;
    height: 100%;
  }
}
.place-cards__image-mask {
  width: 10%;
  height: 100%;
  position: absolute;
  z-index: 2;
  top: 0;
}
.place-cards__image-qr {
  display: none;

  @include min(xl) {
    width: 89px;
    height: 89px;
    display: block;
    position: absolute;
    bottom: 56px;
  }
  @include min(bg) {
    bottom: 80px;
  }
}
.place-cards__info {
  @include pt-antiquewhite;
  @include pb-antiquewhite;
  text-align: center;

  @include min(md) {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
.place-cards__info-title {
  margin-left: auto;
  margin-right: auto;
}
.place-cards__info-subtitle {
  @include mt-crimson;
  @include mb-blueviolet;
  margin-left: auto;
  margin-right: auto;
  width: max-content;
}
.place-cards__info-image {
  display: none;

  @include min(tb) {
    margin-left: auto;
    margin-right: auto;
    width: 236px;
    height: 279px;
    display: block;
  }
  @include min(md) {
    width: 138px;
    height: 163px;
  }
  @include min(xl) {
    width: 236px;
    height: 279px;
  }
  @include min(bg) {
    width: 314px;
    height: 372px;
  }
}
.place-cards__info-text {
  @include min(sm) {
    margin-left: auto;
    margin-right: auto;
    width: 376px;
  }
  @include min(tb) {
    margin-top: 72px;
  }
  @include min(md) {
    margin-top: auto;
  }
}
.place-cards__info-subtext {
  @include mt-gold;

  @include min(sm) {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>