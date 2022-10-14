<template>
  <div class="wrapper">
    <AppHeader />

    <div class="wellness-page page">
      <PlaceHeader
        :title="getData?.Main_wellness?.Title"
        :text="getData?.Main_wellness?.Description"
        :additionalText="getData?.Main_wellness?.Working_hours"
        :headerBg="`${getApiUrl()}${getData?.Main_wellness?.Photo_cover_background?.data?.attributes?.url}`"
        :centerImage="`${getApiUrl()}${getData?.Main_wellness?.Photo_small.data[0]?.attributes?.url}`"
        :leftImage="`${getApiUrl()}${getData?.Main_wellness?.Photo_small?.data[1]?.attributes?.url}`"
        :rightImage="`${getApiUrl()}${getData?.Main_wellness?.Photo_small?.data[2]?.attributes?.url}`"
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
        :isTwoLines="true"
      />
      <PlaceCards :cards="getData?.Wellness_block" :isSpa="true" />
      <PlaceCurrentArticle
        :title="getData?.Massage?.Title"
        :subtitle="getData?.Massage?.Price"
        :textLeft="getData?.Massage?.Photo_description_wellness[0]?.Description"
        :textMain="getData?.Massage?.Photo_description_wellness[1]?.Description"
        :textRight="getData?.Massage?.Photo_description_wellness[2]?.Description"
        :bigImage="`${getApiUrl()}${getData?.Massage?.Photo_description_wellness[0]?.Photo?.data?.attributes?.url}`"
        :smallImage="`${getApiUrl()}${getData?.Massage?.Photo_description_wellness[1]?.Photo?.data?.attributes?.url}`"
        :bottomImage="`${getApiUrl()}${getData?.Massage?.Photo_description_wellness[2]?.Photo?.data?.attributes?.url}`"
      />
      <PlaceSlider :gallery="wellnessSlides" />
      <PlaceService
        v-for="(card, index) in getData?.Additional_services"
        :key="index"
        :class="{
          'left-side': index === 0 || (index % 2 === 0),
          'right-side': index === 1 || (index % 2 !== 0),
        }"
        :imageBig="`${getApiUrl()}${card?.Photo_big?.data?.attributes?.url}`"
        :imageSmall="`${getApiUrl()}${card?.Photo_small?.data?.attributes?.url}`"
        :title="card?.Title"
        :topInfo="card?.Price"
        :topText="card?.Description"
        :isSpa="true"
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
    await store.dispatch("wellnessPage/getData");
  },
  computed: {
    ...mapGetters("wellnessPage", ["getData"]),
    ...mapGetters("mainPage", ["getDataInstagram", "getDataInstaList"]),

    wellnessSlides() {
      let newArr = [];
      this.getData?.Slider_wellness?.Photo?.data.forEach(el => {
        newArr.push(`${this.getApiUrl()}${el?.attributes?.url}`)
      });

      return newArr
    },
  },
  head() {
    return {
      title: this.getData?.Meta_tags_wellness?.Title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getData?.Meta_tags_wellness?.Description,
        },
        {
          hid: "title",
          name: "title",
          content: this.getData?.Meta_tags_wellness?.Title,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.getData?.Meta_tags_wellness?.Title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.getData?.Meta_tags_wellness?.Description,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: `${this.getApiUrl()}${this.getData?.Meta_tags_wellness?.Open_graph_photo?.data?.attributes?.url}`,
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