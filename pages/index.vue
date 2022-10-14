<template>
  <div class="wrapper">

    <div class="main-page page">
      <AppHeader />
      <MainHeader :data="getDataMain" :weather="getWeather" />
      <MainService :data="getDataAbout" />
      <MainGallery
        :title="getDataAccommodation?.Accommodation_title"
        :titleRooms="getData?.Main_all_accommodations?.Title_left"
        :titleChalets="getData?.Main_all_accommodations?.Title_right"
        :dataRooms="getRooms"
        :dataChalets="getChalets"
      />
      <MainRelaxation :dataCards="getDataSpa" :dataSvg="getDataSvg" />
      <MainRestoBar :data="getDataRestoBar" />
      <MainRelaxationOption :data="getDataSpecials" />
      <MainInstagramPhoto :data="getDataInstagram" />
    </div>

    <AppFooter />
  </div>
</template>

<script>
// import AppMenu from "~/components/common/AppMenu.vue";
import AppHeader from "~/components/common/AppHeader.vue";
import AppFooter from "~/components/common/AppFooter.vue";
import MainHeader from "~/components/main/MainHeader.vue";
import MainGallery from '~/components/main/MainGallery.vue';
import MainRelaxation from '~/components/main/MainRelaxation.vue';
import MainService from '~/components/main/MainService.vue';
import MainRestoBar from '~/components/main/MainRestoBar.vue';
import MainRelaxationOption from '~/components/main/MainRelaxationOption.vue';
import MainInstagramPhoto from '~/components/main/MainInstagramPhoto.vue';
import { mapGetters } from "vuex";

export default {
  components: {
    // AppMenu,
    AppHeader,
    AppFooter,
    MainHeader,
    MainService,
    MainGallery,
    MainRelaxation,
    MainRestoBar,
    MainRelaxationOption,
    MainInstagramPhoto,
  },
  async asyncData({ store }) {
    await store.dispatch("mainPage/getMetaData");
    await store.dispatch("mainPage/getDataMain");
    await store.dispatch("mainPage/getDataAbout");
    await store.dispatch("mainPage/getDataAccommodation");
    await store.dispatch("mainPage/getDataSpa");
    await store.dispatch("mainPage/getDataSvg");
    await store.dispatch("mainPage/getDataRestoBar");
    await store.dispatch("mainPage/getDataSpecials");
    await store.dispatch("mainPage/getDataInstagram");
    await store.dispatch("mainPage/getDataInstaList");
    await store.dispatch("accommodationsPage/getData");
    await store.dispatch("allAccommodations/getAccommodationsData");
  },
  computed: {
    ...mapGetters("mainPage", [
      "getMetaData",
      "getDataMain",
      "getDataAbout",
      "getDataAccommodation",
      "getDataSpa",
      "getDataSvg",
      "getDataRestoBar",
      "getDataSpecials",
      "getDataInstagram",
      "getDataInstaList",
      "getWeather"
    ]),
    ...mapGetters("accommodationsPage", ["getData"]),
    ...mapGetters("allAccommodations", ["getAccommodationsData"]),

    getRooms() {
      return this.getAccommodationsData.filter(item => item?.attributes?.RoomTrue_ChaletFalse === true)
    },
    getChalets() {
      return this.getAccommodationsData.filter(item => item?.attributes?.RoomTrue_ChaletFalse === false)
    },
  },
  head() {
    return {
      title: this.getMetaData?.Meta_tags_main?.Title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getMetaData?.Meta_tags_main?.Description,
        },
        {
          hid: "title",
          name: "title",
          content: this.getMetaData?.Meta_tags_main?.Title,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.getMetaData?.Meta_tags_main?.Title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.getMetaData?.Meta_tags_main?.Description,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: `${this.getApiUrl()}${this.getMetaData?.Meta_tags_main?.Open_graph_photo?.data?.attributes?.url}`,
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
};
</script>

<style lang="scss" scoped></style>