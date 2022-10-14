<template>
  <div class="wrapper">
    <AppHeader />

    <div class="restaurant-page page">
      <PlaceHeader
        :title="getData?.Main_restobar?.Title"
        :text="getData?.Main_restobar?.Description"
        :additionalText="getData?.Main_restobar?.Working_hours"
        :headerBg="`${getApiUrl()}${getData?.Main_restobar?.Photo_cover_background?.data?.attributes?.url}`"
        :centerImage="`${getApiUrl()}${getData?.Main_restobar?.Photo_small?.data[0]?.attributes?.url}`"
        :leftImage="`${getApiUrl()}${getData?.Main_restobar?.Photo_small?.data[1]?.attributes?.url}`"
        :rightImage="`${getApiUrl()}${getData?.Main_restobar?.Photo_small?.data[2]?.attributes?.url}`"
      />
      <PlaceAbout
        :subtext="getData?.Information?.Description_left_under_photo"
        :title1="getData?.Information?.Title_1"
        :title2="getData?.Information?.Title_2"
        :title3="getData?.Information?.Title_3"
        :infoText="getData?.Information?.Description_left_1"
        :infoTitle="getData?.Information?.Description_left_2"
        :mainImage="`${getApiUrl()}${getData?.Information?.Photo_big?.data?.attributes?.url}`"
        :smallImage="`${getApiUrl()}${getData?.Information?.Photo_small?.data?.attributes?.url}`"
      />
      <PlaceCards :cards="restobarCards" :isRestaurant="true" />
      <PlaceCurrentArticle
        :title="getData?.Breakfasts?.Title"
        :subtitle="getData?.Breakfasts?.Working_hours"
        :textLeft="getData?.Breakfasts?.Photo_description_block[0]?.Description"
        :textMain="getData?.Breakfasts?.Photo_description_block[1]?.Description"
        :textRight="getData?.Breakfasts?.Photo_description_block[2]?.Description"
        :bigImage="`${getApiUrl()}${getData?.Breakfasts?.Photo_description_block[0]?.Photo?.data?.attributes?.url}`"
        :smallImage="`${getApiUrl()}${getData?.Breakfasts?.Photo_description_block[1]?.Photo?.data?.attributes?.url}`"
        :bottomImage="`${getApiUrl()}${getData?.Breakfasts?.Photo_description_block[2]?.Photo?.data?.attributes?.url}`"
      />
      <PlaceSlider :gallery="restobarSlides" />
      <PlaceService
        class="left-side"
        :imageBig="`${getApiUrl()}${getData?.Delivery_restobar?.Photo_big?.data?.attributes?.url}`"
        :imageSmall="`${getApiUrl()}${getData?.Delivery_restobar?.Photo_small?.data?.attributes?.url}`"
        :title="getData?.Delivery_restobar?.Title"
        :topInfo="getData?.Delivery_restobar?.Working_hours"
        :topText="getData?.Delivery_restobar?.Description"
        :bottomText="getData?.Delivery_restobar?.Description_right_small"
        :circleTypeBtn="'button'"
        :circleBtnText="$t('book now')"
        :dataForm="getData?.Form_delivery"
      />
      <MainInstagramPhoto :data="getDataInstagram" />
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "~/components/common/AppHeader.vue";
import AppFooter from "~/components/common/AppFooter.vue";
import PlaceHeader from "~/components/places/PlaceHeader.vue";
import PlaceAbout from "~/components/places/PlaceAbout.vue";
import PlaceCards from "~/components/places/PlaceCards.vue";
import PlaceCurrentArticle from "~/components/places/PlaceCurrentArticle.vue";
import PlaceSlider from "~/components/places/PlaceSlider.vue";
import PlaceService from "~/components/places/PlaceService.vue";
import MainInstagramPhoto from '~/components/main/MainInstagramPhoto.vue';
import { mapGetters } from "vuex";

export default {
  components: {
    AppHeader,
    AppFooter,
    PlaceHeader,
    PlaceAbout,
    PlaceCards,
    PlaceCurrentArticle,
    PlaceSlider,
    PlaceService,
    MainInstagramPhoto,
  },
  async asyncData({ store }) {
    await store.dispatch("mainPage/getDataInstagram");
    await store.dispatch("mainPage/getDataInstaList");
    await store.dispatch("restaurantPage/getData");
  },
  computed: {
    ...mapGetters("restaurantPage", ["getData"]),
    ...mapGetters("mainPage", ["getDataInstagram", "getDataInstaList"]),

    restobarCards() {
      return [this.getData?.Restaurant_block, this.getData?.Bar]
    },
    restobarSlides() {
      let newArr = [];
      this.getData?.Slider_restobar?.Photo?.data.forEach(el => {
        newArr.push(`${this.getApiUrl()}${el?.attributes?.url}`)
      });

      return newArr
    },
  },
  head() {
    return {
      title: this.getData?.Meta_tags_restobar?.Title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getData?.Meta_tags_restobar?.Description,
        },
        {
          hid: "title",
          name: "title",
          content: this.getData?.Meta_tags_restobar?.Title,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.getData?.Meta_tags_restobar?.Title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.getData?.Meta_tags_restobar?.Description,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: `${this.getApiUrl()}${this.getData?.Meta_tags_restobar?.Open_graph_photo?.data?.attributes?.url}`,
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