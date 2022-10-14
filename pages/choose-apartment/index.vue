<template>
  <div class="wrapper">

    <div class="choose-page page">
      <AppHeader :darkTheme="true" :greyTheme="true" />
      <p class="choose-page__text p1 container" ref="text">{{ getChooseData?.Main?.Description }}</p>

      <!-- <div class="panel">
        <div class="panel__block">
          <FormDropdown
            class="panel__rooms"
            :current="currentEvent"
            :default="$t('all')"
            :name="currentEvent"
            :options="eventsOptions"
            @setOption="setEvent"
          />

          <div
            class="panel__date"
            :class="{ 'active': open }"
            @click="toggleOpen"
          >
            <p class="p1">
              <span class="panel__date-value" ref="startDate">{{ selectedDates ? formatDate(selectedDates.start) : "перебування" }}</span> 
              <span v-if="selectedDates"> / </span>
              <span class="panel__date-value" ref="finishDate">{{ selectedDates ? formatDate(selectedDates.end) : null }}</span>
            </p>
            <img src="/icons/arrow-down-black.svg" alt="icon-btn" />
          </div>

          <DataPicker
            v-if="open"
            :value="selectedDates"
            @selectedDates="handleDateChange($event)"
            @deleteDate="deleteDate"
            @mobilePopUpClose="popUpClose"
          />

          <div class="panel__available" ref="btn">
            <p class="p1">Відвідувачі</p>

            <div class="panel__available-inner">
              <button class="panel__available--plus p1" @click="removeCounter">-</button>
              <span class="panel__available--counter p1" ref="counter">
                {{ counter >= 10 ? counter : `0${counter}` }}
              </span>
              <button class="panel__available--minus p1" @click="addCounter">+</button>
            </div>
          </div>

          <button class="panel__btn panel__btn--in p1">
            <span>{{$t('book now')}}</span>
            <img src="/icons/icon-search-dark.svg" alt="icon-btn" />
          </button>
        </div>

        <button class="panel__btn panel__btn--out p1">
          <span>{{$t('book now')}}</span>
          <img src="/icons/icon-search.svg" alt="icon-btn" />
        </button>
      </div>

      <div
        v-for="(card, index) in rooms"
        :key="index"
      >
        <ChooseCard
          :class="{
            'left-side': index === 0 || (index % 2 === 0),
            'right-side': index === 1 || (index % 2 !== 0),
          }"
          :gallery="card?.attributes?.Title_with_photo?.Photo_slider?.data"
          :title="card?.name"
          :id="card?.id"
          :text="card?.roomsCount"
          :btnText="$t('book now')"
          :details="card?.placesCount"
          :circleBtnText="$t('book now')"
          :circleBtnLink="'checkout'"
          :price="card?.price"
        />
      </div> -->

      <!-- EasyMS reservation module -->
      <div id="easyms-reservation-module">
          <script type="text/props">
            {
              "moduleKey": "ba00b44d-ef4c-4bf0-b1b0-ae272190b6c8"
            }
          </script>
      </div>
      <script async src="https://my.easyms.co/reservation-module/bundle.js"></script>
      <!-- END of EasyMS reservation module -->

      <!-- <div class="mask-block"></div> -->

      <!-- <div
        v-for="(card, index) in getAccommodationsData"
        :key="index"
      >
        <ChooseCard
          :class="{
            'left-side': index === 0 || (index % 2 === 0),
            'right-side': index === 1 || (index % 2 !== 0),
          }"
          :gallery="card?.attributes?.Title_with_photo?.Photo_slider?.data"
          :title="card?.attributes?.Main_room?.Title_room"
          :text="card?.attributes?.Main_room?.Description_down_photo"
          :btnText="$t('book now')"
          :details="card?.attributes?.Main_room?.Includes"
          :circleBtnText="$t('book now')"
          :circleBtnLink="'choose-apartment'"
          :price="card?.attributes?.Main_room?.Price"
        />
      </div> -->
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "~/components/common/AppHeader.vue";
import AppFooter from "~/components/common/AppFooter.vue";
import ChooseCard from "~/components/accommodations/ChooseCard.vue";
import FormDropdown from "~/components/form/FormDropdown.vue";
import DataPicker from "~/components/form/DataPicker.vue";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { animateJS } from "~/plugins/animations";
import moment from "moment";
import { mapGetters, mapState, mapMutations } from "vuex";

export default {
  components: {
    AppHeader,
    AppFooter,
    ChooseCard,
    FormDropdown,
    DataPicker,
  },
  data: () => ({
    counter: 1,
    currentEvent: "Всі",
    eventsOptions: [ "Всі", "Кімнати", "Шале" ],
    open: false,
    selectedDates: null,
    rooms: null,
  }),
  async asyncData({ store }) {
    await store.dispatch("allAccommodations/getAccommodationsData");
    await store.dispatch("choosePage/getChooseData");
  },
  computed: {
    ...mapGetters("allAccommodations", ["getAccommodationsData"]),
    ...mapGetters("choosePage", ["getChooseData"]),
  },
  head() {
    return {
      title: this.getChooseData?.Meta_tags_accommodation?.Title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getChooseData?.Meta_tags_accommodation?.Description,
        },
        {
          hid: "title",
          name: "title",
          content: this.getChooseData?.Meta_tags_accommodation?.Title,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.getChooseData?.Meta_tags_accommodation?.Title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.getChooseData?.Meta_tags_accommodation?.Description,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: `${this.getApiUrl()}${this.getChooseData?.Meta_tags_accommodation?.Open_graph_photo?.data?.attributes?.url}`,
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
    fadeItems() {
      let cards = gsap.utils.toArray(".choose-card");

      cards.forEach(element => {
        gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top bottom+=50px',
          }
        })
        .from(element, {
          duration: 1.5,
          opacity: 0,
          y: 200,
          transformOrigin: "50%",
          ease: "Power3.easeOut",
        })
      });
    },
    setConnectionType(option) {
      this.currentConnection = option;
    },
    setEvent(option) {
      this.currentEvent = option;
    },
    toggleOpen() {
      this.open = !this.open;
    },
    handleDateChange(range) {
      this.selectedDates = range;
      this.open = false;
    },
    deleteDate() {
      this.selectedDates = null;
    },
    backdropClick(e) {
      if (e.target.closest(".date-picker") || e.target.closest(".panel__date")) {
        this.open = true;
      } else {
        this.open = false;
      }
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    popUpClose() {
      this.open = false;
    },
    addCounter() {
      this.counter++
    },
    removeCounter() {
      this.counter <= 1 ? this.counter = 1 : this.counter--;
    },
  },
  mounted() {
    document.addEventListener("click", (e) => {
      if (this.open === true && !e.target.closest(".panel__date") && !e.target.closest(".date-picker")) {
        this.popUpClose();
      }
    });

    this.$nextTick(() => {
      if (this.$refs.text) {
        animateJS('splitText', this.$refs.text);
      }

      this.fadeItems();
    });
  },
};
</script>

<style lang="scss" scoped>

#easyms-reservation-module {
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  position: relative;
  z-index: 10;
}
// .mask-block {
//   @include mb-thistle;
//   width: 100%;
//   height: 28px;
//   background-color: #f2f2f2;
//   position: absolute;
//   left: 0;
//   bottom: 0;
//   z-index: 91;
// }

.choose-page {
  @include pb-thistle;
  padding-top: 64px;
  background-color: #f2f2f2;
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
.choose-page__text {
  @include mt-thistle;
  @include mb-blueviolet;
  text-align: center;
}
.panel {
  @include mb-cornflowerblue;
  margin-left: 18px;
  margin-right: 18px;
  position: relative;
  z-index: 10;

  @include min(tb) {
    margin-left: 40px;
    margin-right: 40px;
  }
  @include min(md) {
    margin-left: auto;
    margin-right: auto;
    width: 614px;
  }
  @include min(xl) {
    width: 884px;
  }
  @include min(bg) {
    width: 1178px;
  }
}
.panel__block {
  padding-left: 20px;
  padding-right: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: 
    "rooms date"
    "number number";
  background-color: #F4F4F4;
  backdrop-filter: blur(20px);
  border-radius: 12px;

  @include min(tb) {
    padding-left: 24px;
    padding-right: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 68px;
  }
  @include min(bg) {
    padding-left: 32px;
    padding-right: 11px;
  }
}
.panel__rooms {
  @include pt-darkgreen;
  @include mb-darkgreen;
  grid-area: rooms;
  align-self: center;

  @include min(tb) {
    flex: 0 0 30.6%;
  }
  @include min(xl) {
    flex: 0 0 26.2%;
  }
}
.panel__date {
  padding-left: 20px;
  @include pt-darkgreen;
  @include mb-darkgreen;
  grid-area: date;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  cursor: pointer;

  img {
    margin-left: 0;
    margin-right: 0;
    width: 11px;
    height: 7px;
    transition: 0.3s ease-in-out;
    transform-origin: center center;
  }

  &.active {
    img {
      transform: rotate(180deg);
      transition: 0.3s ease-in-out;
    }
  }

  .panel__date-value {
    display: inline-block;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 32px;
    background-color: rgba($black-color, 0.1);
  }

  @include min(tb) {
    padding-right: 20px;
    flex: 0 0 30.6%;
  }
  @include min(xl) {
    flex: 0 0 26.2%;
  }
  @include min(bg) {
    &::before {
      height: 46px;
      top: 20px;
    }
  }
}
.panel__available {
  @include pt-darkgreen;
  @include mb-darkgreen;
  grid-area: number;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba($black-color, 0.1);

  @include min(tb) {
    padding-left: 20px;
    padding-right: 20px;
    flex: 0 0 30.6%;
    border-top: none;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 32px;
      background-color: rgba($black-color, 0.1);
    }
  }
  @include min(xl) {
    flex: 0 0 26.2%;
  }
  @include min(bg) {
    &::before {
      height: 46px;
      top: 20px;
    }
  }
}
.panel__available-inner {
  display: flex;
  align-items: center;

  span {
    margin-left: 4px;
    margin-right: 4px;

    @include min(bg) {
      margin-left: 16px;
      margin-right: 16px;
    }
  }
}
.panel__available--plus,
.panel__available--minus {
  padding-left: 4px;
  padding-right: 4px;
  transform: translateY(-8%);

  @include min(xl) {
    padding-left: 6px;
    padding-right: 6px;
  }
  @include min(bg) {
    padding-left: 8px;
    padding-right: 8px;
    transform: translateY(-15%);
  }
}
.panel__available--counter {
  min-width: 19px;

  @include min(xl) {
    min-width: 22px;
  }
}
.panel__btn {
  @include mt-gold;
  padding: 15px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  background-color: $black-color;
  border-radius: 12px;

  img {
    margin-left: 12px;
    margin-right: 0;
    width: 12px;
    height: 12px;

    @include min(tb) {
      margin-left: auto;
      margin-right: auto;
      width: 14px;
      height: 14px;
    }
    @include min(xl) {
      margin-left: 12px;
      margin-right: 0;
      width: 12px;
      height: 12px;
    }
    @include min(bg) {
      margin-left: 24px;
      width: 16px;
      height: 16px;
    }
  }

  @include min(tb) {
    padding: 0;
    margin-top: 0;
    margin-left: auto;
    width: 42px;
    height: 42px;
    background-color: #FFFFFF;
    border-radius: 29px;
  }
  @include min(xl) {
    padding: 0 12px;
    width: auto;
    height: 50px;
  }
  @include min(bg) {
    padding: 0 24px;
  }
}
.panel__btn--in {
  display: none;

  @include min(tb) {
    display: flex;

    span {
      display: none;
    }
  }
  @include min(xl) {
    span {
      display: unset;
      color: $black-color;
    }
  }
}
.panel__btn--out {
  @include min(tb) {
    display: none;
  }
}
</style>
