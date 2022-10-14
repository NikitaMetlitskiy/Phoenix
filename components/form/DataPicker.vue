<template>
  <div class="date-picker">
    <div class="desktop-calendar">
      <template class="desktop-calendar p1" v-if="oneData">
        <v-date-picker
          class="no-cursor"
          :select-attribute="selectAttributeOneDate"
          is-inline
          :columns="screens({ default: 1, tablet: 1, laptop: 1, desktop: 1 })"
          mode="date"
          :masks="masks"
          v-model="date"
          @input="chooseOneDate"
          :min-date="new Date()"
        ></v-date-picker>
      </template>

      <template class="desktop-calendar p1" v-else>
        <p class="p2_light night p1">{{ nightsCount }} ночей</p>
        <p @click="$emit('deleteDate'), deleteDate()" class="p2_light delete p1">
          Видалити
        </p>
        <v-date-picker
          :select-attribute="selectAttribute"
          :drag-attribute="selectAttribute"
          class="no-cursor"
          is-inline
          :masks="masks"
          :columns="screens({ default: 1, tablet: 2, laptop: 2, desktop: 2 })"
          is-range
          v-model="range"
          @input="chooseDate"
          @drag="onDrag"
          :dailyInterval="1"
          :min-date="new Date()"
          clearable
        ></v-date-picker>
      </template>
    </div>

    <div class="mobile-calendar">
      <div @click="mobilePopUpClose" class="pop-up_back">
        <svg
          width="5"
          height="8"
          viewBox="0 0 5 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.3"
            d="M1 7.5L4 4L1 0.5"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="back-button a1">назад</div>
        <button type="button" class="close-button a1" @click="mobilePopUpClose">Ok!</button>
      </div>

      <div class="date-choosen">
        <div class="day-start">
          <p v-if="range.start != null" class="day-number">
            {{ formatDate(range.start) }}
          </p>
          <p v-else class="day-number">Дата заїзду</p>
        </div>
        <span class="line"></span>
        <div class="day-end">
          <p v-if="range.end != null" class="day-number">
            {{ formatDate(range.end) }}
          </p>
          <p v-else class="day-number">Дата виїзду</p>
        </div>
      </div>

      <div class="info-wrapper">
        <p class="night-number p2_light">{{ nightsCount }} ночі</p>
        <p @click="$emit('deleteDate'), deleteDate()" class="p2_light">
          Видалити
        </p>
      </div>

      <div class="calendar-wrapper">
        <template v-if="oneData">
          <v-date-picker
            class="no-cursor"
            :select-attribute="selectAttributeOneDate"
            is-inline
            :columns="mobileColumn"
            mode="date"
            :masks="masks"
            v-model="date"
            :min-date="new Date()"
            @dayclick="dayClicked"
          ></v-date-picker>
        </template>

        <template v-else>
          <v-date-picker
            :select-attribute="selectAttribute"
            :drag-attribute="selectAttribute"
            class="no-cursor"
            is-inline
            :masks="masks"
            :columns="mobileColumn"
            is-range
            v-model="range"
            @drag="onDrag"
            :dailyInterval="1"
            :min-date="new Date()"
            clearable
            @dayclick="dayClicked"
          ></v-date-picker>
        </template>

        <div @mouseenter="changeMobileColumn" class="month-more">
          <svg
            width="16"
            height="12"
            viewBox="0 0 9 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path opacity="0.4" d="M8 1L4.5 4.5L1 1" stroke="black" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as moment from "moment";
import "moment/locale/uk";
moment.locale("uk");

export default {
  name: "DatePicker",
  props: {
    value: null,
    oneData: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedDay: null,
      mobileColumn: 3,
      range: {
        start: null,
        end: null,
      },
      date: this.value,
      masks: {
        weekdays: "WW",
      },
    };
  },
  methods: {
    chooseDate(e) {
      if (+this.range.start === +this.range.end) return;

      this.$emit("selectedDates", this.range);
    },
    onDrag(e) {
      if (e && +e.start === +e.end) return;

      this.range = e;
    },
    chooseOneDate() {
      this.$emit("selectedOneDate", this.date);
    },
    deleteDate() {
      this.range = {
        start: null,
        end: null,
      };
      console.log("DELETE");
    },
    screens(args) {
      if (process.client) {
        return this.$screens(args);
      } else {
        return 1; // <-- your default value
      }
    },
    changeMobileColumn() {
      this.mobileColumn = this.mobileColumn + 3;
    },
    formatDate(date) {
      return moment(date).format("D MMMM");
    },
    mobilePopUpClose() {
      this.chooseDate();
      this.$emit("mobilePopUpClose");
    },
    dayClicked(day) {
      if (this.range.start == null) {
        this.range.start = day;
      } else {
        this.range.end = day;
      }
    },
  },
  mounted() {
    if (this.value != null) {
      this.range = this.value;
    }
  },
  computed: {
    nightsCount() {
      if (window.innerWidth <= 650) {
        if (this.range.start && this.range.end) {
          return (
            moment(this.range.end).diff(moment(this.range.start), "days") - 30
          );
        } else {
          return 0;
        }
      } else {
        if (this.range.start && this.range.end) {
          return moment(this.range.end).diff(moment(this.range.start), "days");
        } else {
          return 0;
        }
      }
    },
    selectAttribute() {
      return {
        highlight: {
          start: {
            class: "add_start",
            contentClass: "add_start_content",
          },
          base: {
            class: "add_base",
            contentClass: "add_base_content",
          },
          end: {
            class: "add_end",
            contentClass: "add_end_content",
          },
        },
      };
    },
    selectAttributeOneDate() {
      return {
        highlight: {
          start: {
            class: "add_start",
            contentClass: "add_start_content",
          },
        },
      };
    },
  },
};
</script>

<style lang="scss">

.desktop-calendar {
  position: relative;

  @include max(tb) {
    display: none;
  }
}
.date-picker {
  position: absolute;
  z-index: 99;
  top: calc(100% + 12px);
  left: 0;

  @include min(tb) {
    width: 592px;
  }
  @include min(md) {
    width: 614px;
  }
  @include min(xl) {
    width: 716px;
  }
  @include min(bg) {
    width: 810px;
  }
  @include max(tb) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    justify-content: center;
    align-items: center;
  }

  // mobile
  &::before {
    content: "";
    @include max(tb) {
      height: 100%;
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 20;
    }
  }

  .night {
    position: absolute;
    top: 32px;
    left: 41px;
    display: flex;
    z-index: 1;
    &.p2_light {
      opacity: 0.8;
    }
  }
  .delete {
    position: absolute;
    top: 30px;
    right: 41px;
    display: flex;
    z-index: 1;
    cursor: pointer;
    &.p2_light {
      opacity: 0.8;
    }
  }
  .vc-container {
    width: 100% !important;
    height: 100%;
    align-items: center;
    border: none !important;
    display: flex;
    cursor: auto !important;
    padding: 36px 26px 32px 26px;
    box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
    border-radius: 6px !important;
  }
  .vc-pane {
    &:first-of-type {
      margin-right: 30px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: 6px;
        right: -30px;
        width: 1px;
        height: 235px;
        background-color: rgba(0, 0, 0, 0.1);
      }
      .vc-header {
        justify-content: flex-end !important;
        .vc-title {
          margin-right: -24px;
          position: relative;
          &::after {
            content: "-";
            position: absolute;
            right: -9px;
            top: -2px;
            font-size: 14px;
          }
        }
      }
    }
    &:last-of-type {
      margin-left: 30px;
      .vc-header {
        justify-content: flex-start !important;
        .vc-title {
          margin-left: -24px;
        }
      }
    }
  }

  .vc-header {
    padding: 0 !important;
    margin-bottom: 46px;
    position: relative !important;
    max-width: 100%;
  }
  .vc-arrow {
    &:hover {
      background-color: white;
    }
  }
  .vc-arrows-container {
    top: 2px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    width: 320px !important;
    padding: 0 !important;
    div {
      background-image: url("~/static/icons/icon-calendar.svg");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      display: block;
      width: 13px !important;
      height: 13px !important;
      transform: rotate(180deg);
      cursor: pointer !important;
      &:last-of-type {
        transform: rotate(360deg);
      }
    }
    .hover\:vc-bg-gray-300:hover {
      background-color: transparent !important;
    }
    .vc-svg-icon {
      display: none !important;
    }
  }

  .vc-title {
    padding: 0 !important;
    font-weight: 450 !important;
    font-size: 10px !important;
    line-height: 140% !important;
    pointer-events: none;
    color: #171717 !important;
    letter-spacing: 0.24em !important;
    text-transform: uppercase !important;
  }

  .vc-weeks {
    padding: 0 !important;
    .vc-weekday {
      margin-bottom: 22px;
      padding: 0;
      cursor: default !important;
      font-weight: 450 !important;
      font-size: 10px !important;
      line-height: 140% !important;
      pointer-events: none;
      color: #171717 !important;
      letter-spacing: 0.24em !important;
      text-transform: uppercase !important;
    }
  }

  .vc-day {
    width: 40px !important;
    min-width: 40px !important;
    height: 40px !important;
    padding: 6px !important;
    &.on-left {
      .add_base {
        &::before {
          display: none !important;
        }
      }
    }
    &.in-next-month {
      display: none;
    }

    .vc-day-content {
      width: 100% !important;
      height: 100% !important;
      vertical-align: middle;
      font-style: normal !important;
      font-weight: 300 !important;
      font-size: 12px !important;
      line-height: 180% !important;
      letter-spacing: 0.06em !important;
      color: rgba(#000000, 0.8) !important;
      opacity: 1 !important;
      background-color: transparent !important;
      visibility: visible !important;
      text-align: center;
      border: 1px solid transparent !important;
      border-radius: 100px !important;
      margin: 0 !important;
      &:hover {
        border: 1px solid rgba(0, 0, 0, 0.1) !important;
      }
    }
    .is-disabled {
      opacity: 0.3 !important;
      pointer-events: none;
    }

    .vc-highlight {
      width: 28px !important;
      height: 28px !important;
      border-radius: 100% !important;
      &.add_start {
        background-color: #f0edea !important;
        border: 1px solid rgba(0, 0, 0, 0.1) !important;

        &::after {
          display: none;
        }
      }
      &.add_end {
        background-color: #f0edea !important;
        border: 1px solid rgba(0, 0, 0, 0.1) !important;
        &::before {
          content: "";
          position: absolute;
          left: -9px;
          top: 50%;
          transform: translateY(-50%);
          width: 38%;
          height: 1px;
          display: inline-block;
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
      &.add_base {
        border-radius: 100% !important;
        margin: unset;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          display: inline-block;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 100%;
        }
        &::before {
          content: "";
          position: absolute;
          left: -13px;
          top: 50%;
          transform: translateY(-50%);
          width: 49%;
          height: 1px;
          display: inline-block;
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
      &.vc-highlight-base-end {
        &.add_base {
          &::before,
          &::after {
            display: none;
          }
        }
      }
    }
  }

  .vc-day-box-right-center {
    display: none !important;
  }

  .vc-highlights {
    border-radius: 50%;
    border: 1px solid rgba(#fff, 0.3);
    display: flex;
    align-items: center;
    overflow: unset !important;
  }
}
.one-data-calendar-wrapper {
  .vc-pane {
    margin: 0 !important;
    &:after {
      display: none;
    }
    &:last-of-type {
      .vc-header {
        justify-content: center !important;
        .vc-title {
          &:after {
            display: none;
          }
        }
      }
    }
  }
  .vc-header {
    margin-bottom: 32px;
  }

  .vc-container {
    padding: 40px 32px 32px 32px;
  }
}

.mobile-calendar {
  @include min(tb) {
    display: none;
  }
  z-index: 99;
  width: calc(100% - 8px);
  position: fixed;
  z-index: 99;
  top: 4px;
  left: 4px;
  padding: 20px 12px 0;
  background-color: rgb(255, 255, 255);

  .pop-up_back {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .back-button {
      margin-left: 5px;
      margin-right: auto;
      opacity: 0.5;
    }
    svg {
      width: 10px;
      height: 18px;
      margin-top: -2px;
      margin-left: 0;
      margin-right: 0;
      transform: rotate(180deg);
    }
    .close-button {
      opacity: 0.5;
    }
  }
  .date-choosen {
    display: flex;
    font-size: 32px;
    margin-top: 12px;
    .day-number {
      display: inline-block;
      font-size: 32px;
      margin-top: 0px;
      position: relative;
      top: 1px;
      font-weight: 500;
      @include max(390) {
        font-size: 28px;
      }
      @include max(360) {
        font-size: 20px;
      }
    }
    .line {
      margin: 24px 14px 0;
      width: 10px;
      height: 1.5px;
      background-color: black;
    }
  }
  .info-wrapper {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    background-color: rgb(255, 255, 255);
  }
  .calendar-wrapper {
    margin-top: 30px;
    border-top: 1px solid rgba(160, 160, 160, 0.1);
    height: 300px;
    display: flex;
    overflow: auto;
    z-index: 99;
    flex-direction: column;
    height: calc(100vh - 293px);

    .month-more {
      height: 30px;
      background-color: white;
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 14px 0;
      width: 100%;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .vc-pane-container {
    padding: 40px 0 10px;
    width: 100%;
  }
  .vc-container {
    box-shadow: unset;
    padding: 0;
    height: unset;
  }
  .vc-arrows-container {
    display: none;
  }
  .vc-pane-layout {
    display: flex;
    flex-direction: column;
  }
  .vc-pane {
    min-width: 100%;
    margin: 0 !important;
    width: 100%;

    &:not(:last-child) {
      padding-bottom: 56px;
    }

    &::after {
      display: none;
    }

    &:first-of-type {
      margin: 0;
    }

    .vc-header {
      justify-content: center !important;
      margin-bottom: 32px;

      &:first-of-type {
        justify-content: center !important;
      }
    }
  }
  .add_base {
    &::before {
      content: "";
      position: absolute;
      left: -22px !important;
      top: 50%;
      transform: translateY(-50%);
      width: 49%;
      height: 1px;
      display: inline-block;
      background-color: rgba(0, 0, 0, 0.1);

      @include max(420) {
        width: 40% !important;
        left: -16px !important;
      }
      @include max(370) {
        width: 34% !important;
        left: -14px !important;
      }
    }
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      right: 0;
      display: inline-block;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 100%;
    }
  }
  .vc-highlight {
    &.add_end {
      &::before {
        left: -19px !important;

        @include max(420) {
          width: 33% !important;
          left: -11px !important;
        }
        @include max(370) {
          width: 21% !important;
          left: -7px !important;
        }
      }
    }
  }
  .vc-title {
    &:after {
      display: none;
    }
  }
}
</style>
