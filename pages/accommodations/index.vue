<template>
  <div class="wrapper">
    <AppHeader :darkTheme="true" />

    <div class="accommodations-page page">
      <div class="accommodations-page__nav">
        <button 
          class="accommodations-page__nav-btn accommodations-page__nav-btn--rooms"
          :class="{'active': show === 'rooms'}"
          @click="changeView('rooms')"
          ref="btnLeft"
        >
          <h1 class="accommodations-page__nav-btn-value h2">{{ getData?.Main_all_accommodations?.Title_left }}</h1>
          <sup class="accommodations-page__nav-btn-number p1">
            {{ getRooms.length > 9 ? getRooms.length : `0${getRooms.length}`}}
          </sup>
        </button>

        <div class="accommodations-page__nav-decor" ref="line">
          <svg width="18" height="46" viewBox="0 0 18 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 45L17 1" stroke="#363735" stroke-width="1.5"/>
          </svg>
        </div>

        <button
          class="accommodations-page__nav-btn accommodations-page__nav-btn--chalets"
          :class="{'active': show === 'chalets'}"
          @click="changeView('chalets')"
          ref="btnRight"
        >
          <h1 class="accommodations-page__nav-btn-value h2">{{ getData?.Main_all_accommodations?.Title_right }}</h1>
          <sup class="accommodations-page__nav-btn-number p1">
            {{ getChalets.length > 9 ? getChalets.length : `0${getChalets.length}` }}
          </sup>
        </button>
      </div>

      <p class="accommodations-page__text p1 container" ref="text">{{ getData?.Main_all_accommodations?.Description }}</p>

      <Rooms
        class="accommodations-page__rooms"
        :class="{ 'active': show === 'rooms' }"
      >
        <!-- <div
          class="block-wrapper"
          v-for="(card, index) in getRooms"
          :key="index"
        > -->
          <AccommodationCard
            v-for="(card, index) in getRooms"
            :key="index"
            :class="{
              'left-side': index === 0 || (index % 2 === 0),
              'right-side': index === 1 || (index % 2 !== 0),
            }"
            :imageBig="`${getApiUrl()}${card?.attributes?.Main_room?.Room_cover_background?.data?.attributes?.url}`"
            :imageSmall="`${getApiUrl()}${card?.attributes?.Main_room?.Room_cover_small?.data?.attributes?.url}`"
            :title="card?.attributes?.Main_room?.Title_room"
            :btnText="$t('read more')"
            :btnLink="`${card?.attributes?.Slug}`"
            :details="card?.attributes?.Main_room?.Includes"
            :circleBtnText="$t('book now')"
            :circleBtnLink="'choose-apartment'"
            :current="show === 'rooms' ? show : 'hidden'"
          />
        <!-- </div> -->
      </Rooms>

      <Chalets
        class="accommodations-page__chalets"
        :class="{ 'active': show === 'chalets' }"
      >
        <AccommodationCard
          v-for="(card, index) in getChalets"
          :key="index"
          :class="{
            'left-side': index === 0 || (index % 2 === 0),
            'right-side': index === 1 || (index % 2 !== 0),
          }"
          :imageBig="`${getApiUrl()}${card?.attributes?.Main_room?.Room_cover_background?.data?.attributes?.url}`"
          :imageSmall="`${getApiUrl()}${card?.attributes?.Main_room?.Room_cover_small?.data?.attributes?.url}`"
          :title="card?.attributes?.Main_room?.Title_room"
          :btnText="$t('read more')"
          :btnLink="`${card?.attributes?.Slug}`"
          :details="card?.attributes?.Main_room?.Includes"
          :circleBtnText="$t('book now')"
          :circleBtnLink="'choose-apartment'"
          :current="show === 'chalets' ? show : 'hidden'"
        />
      </Chalets>

      <AccommodationsBook
        ref="book"
        :image="`${getApiUrl()}${getData?.Additional_block?.Photo?.data?.attributes?.url}`"
        :title="getData?.Additional_block?.Title"
        :text="getData?.Additional_block?.Description"
        :circleBtnText="$t('read more')"
        :circleBtnLink="'choose-apartment'"
      />
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "~/components/common/AppHeader.vue";
import AppFooter from "~/components/common/AppFooter.vue";
import Rooms from "~/components/accommodations/Rooms.vue";
import Chalets from "~/components/accommodations/Chalets.vue";
import AccommodationCard from "~/components/accommodations/AccommodationCard.vue";
import AccommodationsBook from "~/components/accommodations/AccommodationsBook.vue";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin";
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
import { mapGetters } from "vuex";

export default {
  components: {
    AppHeader,
    AppFooter,
    Rooms,
    Chalets,
    AccommodationCard,
    AccommodationsBook,
  },
  data: () => ({
    show: null,
  }),
  async asyncData({ store }) {
    await store.dispatch("accommodationsPage/getData");
    await store.dispatch("allAccommodations/getAccommodationsData");
  },
  computed: {
    ...mapGetters("accommodationsPage", ["getData"]),
    ...mapGetters("allAccommodations", ["getAccommodationsData"]),

    getRooms() {
      return this.getAccommodationsData.filter(item => item.attributes.RoomTrue_ChaletFalse === true)
    },
    getChalets() {
      return this.getAccommodationsData.filter(item => item.attributes.RoomTrue_ChaletFalse === false)
    },
  },
  head() {
    return {
      title: this.getData?.Meta_tags_accommodation?.Title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getData?.Meta_tags_accommodation?.Description,
        },
        {
          hid: "title",
          name: "title",
          content: this.getData?.Meta_tags_accommodation?.Title,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.getData?.Meta_tags_accommodation?.Title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.getData?.Meta_tags_accommodation?.Description,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: `${this.getApiUrl()}${this.getData?.Meta_tags_accommodation?.Open_graph_photo?.data?.attributes?.url}`,
        },
        {
          hid: "og:url",
          name: "og:url",
          content: process.env.hostUrl + this.$route.fullPath,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${process.env.hostUrl}` + `${this.$route.fullPath}`
        }
      ]
    };
  },
  methods: {
    changeView(value) {
      if(this.show === value) return;
      this.show = value;
      this.$router.push(this.localePath(`/accommodations?part=${this.show}`))

      this.$el.querySelectorAll('.accommodations-page__nav-btn').forEach(btn => btn.disabled = true);

      gsap.timeline()
        .from(this.$refs.line, {
          duration: 0.75,
          rotate: -360,
          ease: "Power2.easeInOut",
        });

      this.fadeItems();
      this.$refs.book.animateBookCard();

      setTimeout(() => {
        this.$el.querySelectorAll('.accommodations-page__nav-btn').forEach(btn => btn.disabled = false);
      }, 1000);
    },
    fadeItems() {
      let cards = gsap.utils.toArray(".accommodations-card");

      cards.forEach(element => {
        gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
          }
        })
        // .fromTo(element, 
        .to(element, 
        // { opacity: 0, y: 200 },
        { duration: 1.5, opacity: 1, y: 0, transformOrigin: "50%", ease: "Power3.easeOut" })
      });

      this.animateCard();

      setTimeout(() => {
        gsap.set(".accommodations-card", {clearProps: true});
          ScrollTrigger.getAll().forEach(st => st.refresh());
          ScrollTrigger.refresh();
      }, 1501);
    },
    animateCard() {
      let cards = gsap.utils.toArray(".accommodations-card");

      cards.forEach(element => {
        const splitLeft = new SplitText(element.querySelector('.accommodations-card__title'), { type: 'lines', linesClass: 'wrapper-char' }).lines;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top bottom+=50px',
          }
        })
        tl.from(splitLeft, { delay: 0.1, duration: 0.9, x: -100, opacity: 0, stagger: 0.1, ease: "Power4.easeInOut" }, "first")
          .fromTo(element.querySelectorAll('.accommodations-card__list-item'), { autoAlpha: 0, opacity: 0, yPercent: 110 }, { duration: 1, autoAlpha: 1, opacity: 1, yPercent: 0, stagger: 0.2, ease: "Power4.easeInOut" }, "first")
          .fromTo(element.querySelector('.accommodations-card__btn'), { opacity: 0, yPercent: 110 }, { opacity: 1, yPercent: 0, stagger: 0.2, ease: "Power4.easeInOut" }, "first")
          .from(element.querySelector('.accommodations-card__vector path'), { opacity: 0, stagger: 0.2, ease: "Power4.easeInOut" }, "first")
          .fromTo(element.querySelector('.accommodations-card__big-image img'), { scale: 0.85 }, { duration: 1, scale: 1, stagger: 0.25, ease: "Power2.easeOut" }, "first")
          .fromTo(element.querySelector('.accommodations-card__small-image img'), { scale: 0.85 }, { duration: 1, scale: 1, stagger: 0.25, ease: "Power2.easeOut" }, "first")
      });

      setTimeout(() => {
        gsap.set(".accommodations-card", {clearProps: true});
          ScrollTrigger.getAll().forEach(st => st.refresh());
          ScrollTrigger.refresh();
      }, 1001);
    }
  },
  mounted() {
    if (this.$route.query.part === "rooms") {
      this.show = "rooms";
    } else {
      this.show = "chalets";
    }

    this.$nextTick(() => {
      this.fadeItems();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".accommodations-page__nav",
        }
      });
      const splitLeft = new SplitText(this.$refs.btnLeft, { type: 'lines', linesClass: 'wrapper-char' }).lines;
      const splitRight = new SplitText(this.$refs.btnRight, { type: 'lines', linesClass: 'wrapper-char' }).lines;

      tl.from(".accommodations-page__nav-decor svg path", { duration: 1, drawSVG: '50% 50%' }, "first")
        .from(splitLeft, { delay: 0.1, duration: 0.9, x: -100, opacity: 0, stagger: 0.1, ease: "Power4.easeInOut" }, "first")
        .from(splitRight, { delay: 0.1, duration: 0.9, x: 100, opacity: 0, stagger: 0.1, ease: "Power4.easeInOut" }, "first")
        .from(this.$refs.text, 
          { delay: 0.3, duration: 1, opacity: 0, yPercent: 70, stagger: 0.2, ease: "Power4.easeInOut" },
        "first")
        // .fromTo(".accommodations-card", 
        // { opacity: 0, y: 200 },
        // { delay: 0.5, duration: 1, opacity: 1, y: 0, transformOrigin: "50%", ease: "Power3.easeOut" }, "first");

      this.animateCard();
    });
  }
};
</script>

<style lang="scss" scoped>

.accommodations-page {
  padding-top: 64px;
  position: relative;

  @include min(tb) {
    padding-top: 85px;
  }
  @include min(xl) {
    padding-top: 94px;
  }
  @include min(bg) {
    padding-top: 125px;
  }
}
.accommodations-page__nav {
  @include mt-thistle;
  @include mb-aquamarine;
  display: flex;
  flex-direction: column;
  align-items: center;

  @include min(md) {
    width: 100%;
    min-height: 42px;
    flex-direction: row;
    justify-content: center;
  }
  @include min(xl) {
    min-height: 56px;
  }
  @include min(xl) {
    min-height: 70px;
  }
}
.accommodations-page__nav-btn {
  display: flex;
  line-height: 1;
  position: relative;

  @include min(md) {
    position: static;
    align-items: center;
    position: relative;
  }

  &.active {
    .accommodations-page__nav-btn-value {
      color: $black-color;
      -webkit-text-stroke-width: 0;
      transition: 0.4s cubic-bezier(.37,.53,.38,1);
    }
    .accommodations-page__nav-btn-number {
      opacity: 1;
      transition: 0.4s cubic-bezier(.37,.53,.38,1);
    }
  } 
}
.accommodations-page__nav-btn--rooms {
  @include min(md) {
    position: absolute;
    left: 50%;
    transform: translateX(-112%);

    .accommodations-page__nav-btn-value {
      margin-right: 60px;
    }
  }
  @include min(xl) {
    .accommodations-page__nav-btn-value {
      margin-right: 100px;
    }
  }
  @include min(bg) {
    .accommodations-page__nav-btn-value {
      margin-right: 177px;
    }
  }
}
.accommodations-page__nav-btn--chalets {
  @include min(md) {
    flex-direction: row-reverse;
    position: absolute;
    right: 50%;
    transform: translateX(112%);

    .accommodations-page__nav-btn-value {
      margin-left: 60px;
    }
  }
  @include min(xl) {
    .accommodations-page__nav-btn-value {
      margin-left: 100px;
    }
  }
  @include min(bg) {
    .accommodations-page__nav-btn-value {
      margin-left: 177px;
    }
  }
}
.accommodations-page__nav-btn-value {
  color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: rgba($black-color, 0.5);
  transition: 0.4s cubic-bezier(.37,.53,.38,1);

  @include min(md) {
    transform: translateY(-20%);
  }
}
.accommodations-page__nav-btn-number {
  display: inline-block;
  transform: translateY(10px);
  opacity: 0.3;
  transition: 0.4s cubic-bezier(.37,.53,.38,1);

  position: absolute;
  top: 0;
  left: calc(100% + 8px);

  @include min(md) {
    position: static;
    top: unset;
    left: unset;
    transform: translateY(0);
  }
}
.accommodations-page__nav-decor {
  margin-left: auto;
  margin-right: auto;
  margin-top: 37px;
  margin-bottom: 24px;
  width: 16px;
  height: 36px;
  object-fit: unset;

  @include min(tb) {
    margin-top: 27px;
    margin-bottom: 27px;
  }
  @include min(md) {
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 40px;
    margin-right: 40px;
    height: 44px;
    position: absolute;
  }
  @include min(xl) {
    margin-left: 54px;
    margin-right: 54px;
  }
  @include min(bg) {
    margin-left: 78px;
    margin-right: 78px;
    width: 22px;
    height: 56px;
  }
}
.accommodations-page__text {
  @include mb-cornflowerblue;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  @include min(sm) {
    width: 70%;
  }
  @include min(md) {
    width: 50%;
  }
  @include min(xl) {
    width: 43%;
  }
}
.accommodations-page__rooms,
.accommodations-page__chalets {
  display: none;

  &.active {
    display: unset;
  }
}
</style>
