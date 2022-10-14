<template>
  <div class="contact-frame">
    <div class="contact-frame__screen">
      <a class="contact-frame__screen-inner" :href="linkAddress" target="_blank">
        <img class="contact-frame__screen-marker" src="/icons/icon-marker.svg" alt="icon-marker" ref="marker">
        <p class="contact-frame__screen-address p1" ref="textAddress">{{bgAddress}}</p>
      </a>
    </div>

    <div class="contact-frame__info">
      <div class="contact-frame__info-contacts">
        <a 
          class="contact-frame__info-phone hover-nonlinear-dark h4"
          :href="`tel:${contactPhone}`"
          ref="phone"
        >{{contactPhone}}</a>
        <a
          class="contact-frame__info-email hover-nonlinear-dark h4"
          :href="`mailto:${contactEmail}`"
          ref="email"
        >{{contactEmail}}</a>

        <div class="contact-frame__info-booking" ref="btn">
          <NuxtLink class="hover-linear-dark a1" :to="localePath(`/${contactBtnLink}`)">{{contactBtnText}}</NuxtLink>
        </div>
      </div>

      <div class="contact-frame__info-social">
        <p class="contact-frame__info-social-text p1" ref="text">{{contactSocialText}}</p>
        <ul class="contact-frame__info-social-list">
          <li 
            class="contact-frame__info-social-item p1"
            v-for="(item, id) in socialItems"
            :key="id"
            ref="link"
          >
            <a class="contact-frame__info-social-link hover-nonlinear-dark" :href="item?.Link" target="_blank">{{item?.Social_title}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { animateJS } from "~/plugins/animations";

export default {
  props: {
    bgAddress: {
      type: String,
      default: "",
    },
    linkAddress: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    contactPhone: {
      type: String,
      default: "",
    },
    contactEmail: {
      type: String,
      default: "",
    },
    contactBtnText: {
      type: String,
      default: "",
    },
    contactBtnLink: {
      type: String,
      default: "",
    },
    contactSocialText: {
      type: String,
      default: "",
    },
    socialItems: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.marker) {
        animateJS('fadeUp', this.$refs.marker);
      }

      if (this.$refs.textAddress) {
        animateJS('fadeUp', this.$refs.textAddress);
      }

      if (this.$refs.phone) {
        animateJS('splitTitleLeft', this.$refs.phone);
      }

      if (this.$refs.email) {
        animateJS('splitTitleLeft', this.$refs.email);
      }

      if (this.$refs.btn) {
        animateJS('fadeUp', this.$refs.btn);
      }

      if (this.$refs.text) {
        animateJS('splitText', this.$refs.text);
      }

      if (this.$refs.link) {
        animateJS('fadeCards', this.$refs.link);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.contact-frame {
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  @include min(tb) {
    width: 479px;
  }
  @include min(md) {
    width: 627px;
  }
  @include min(lg) {
    width: 816px;
  }
  @include min(bg) {
    width: 1116px;
  }
}
.contact-frame__screen {
  height: 295px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-width: 6px 6px 0px;
  border-style: solid;
  border-color: $grey-color;
  background-color: transparent;

  @include min(tb) {
    height: 271px;
  }
  @include min(md) {
    height: 306px;
    flex-direction: row;
  }
  @include min(lg) {
    height: 348px;
    border-width: 8px 8px 0px;
  }
  @include min(xl) {
    height: 388px;
  }
  @include min(bg) {
    height: 516px;
  }
}
.contact-frame__screen-inner {
  display: flex;
}
.contact-frame__screen-marker {
  margin: 0;
  width: 12px;
  height: 23px;
}
.contact-frame__screen-address {
  margin-top: 16px;
  width: 229px;
  text-align: center;

  @include min(md) {
    margin-top: 0;
    margin-left: 20px;
    text-align: left;
  }
  @include min(xl) {
    width: 269px;
  }
}
.contact-frame__info {
  @include pt-darkgreen;
  @include pb-gold;
  padding-left: 16px;
  padding-right: 16px;
  background-color: $grey-color;
  color: $black-color;
}
.contact-frame__info-contacts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}
.contact-frame__info-booking {
  @include mt-gold;

  @include min(tb) {
    margin-top: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
}
.contact-frame__info-social {
  @include mt-crimson;
  display: flex;
  justify-content: space-between;
}
.contact-frame__info-social-text {
  flex: 0 0 40%;

  @include min(md) {
    flex: 0 0 48%;
  }
}
.contact-frame__info-social-list {
  flex: 0 0 40%;
  text-align: right;

  @include min(md) {
    flex: 0 0 48%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
}
.contact-frame__info-social-item {
  @include min(md) {
    &:not(:last-child) {
      margin-right: 13px;
    }
  }
}
</style>