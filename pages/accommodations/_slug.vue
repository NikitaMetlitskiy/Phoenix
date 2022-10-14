<template>
  <div class="wrapper">
    <AppHeader />

    <div class="accommodation-page page">
      <AccommodationInnerHeader
        :title="getInnerData[0]?.attributes?.Main_room?.Title_room"
        :price="getInnerData[0]?.attributes?.Main_room?.Price"
        :text="getInnerData[0]?.attributes?.Main_room?.Description_down_photo"
        :accommodationBg="`${getApiUrl()}${getInnerData[0]?.attributes?.Main_room?.Room_cover_background?.data?.attributes?.url}`"
        :smallImage="`${getApiUrl()}${getInnerData[0]?.attributes?.Main_room?.Room_cover_small?.data?.attributes?.url}`"
        :nextItem="$t('next')"
        :nextItemLink="nextItem"
        :detailsList="getInnerData[0]?.attributes?.Main_room?.Includes"
        :circleBtnText="$t('book now')"
        :circleBtnLink="'choose-apartment'"
      />
      <AccommodationInnerFeatures
        :title="getInnerData[0]?.attributes?.Benefits_room?.Title"
        :text="getInnerData[0]?.attributes?.Benefits_room?.Description_right_1"
        :subTitle="getInnerData[0]?.attributes?.Benefits_room?.Description_right_2"
        :featuresList="getInnerData[0]?.attributes?.Benefits_room?.Benefit"
      />
      <AccommodationInnerSlider
        :title="getInnerData[0]?.attributes?.Title_with_photo?.Title"
        :featuresList="apartmentsSlides"
      />
      <AccommodationInnerOffers
        :title="getInnerData[0]?.attributes?.Special_offers?.Title"
        :buttonText="$t('view all')"
        :buttonLink="'special-offers'"
        :offersList="sortedSpecialOffers"
      />
      <AccommodationInnerMore
        :title="getInnerData[0]?.attributes?.More_accommodations?.Title"
        :circleBtnText="$t('book now')"
        :circleBtnLink="'choose-apartment'"
        :moreItemsList="checkMoreItems"
      />
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "~/components/common/AppHeader.vue";
import AppFooter from "~/components/common/AppFooter.vue";
import AccommodationInnerHeader from '~/components/accommodation-inner/AccommodationInnerHeader.vue';
import AccommodationInnerFeatures from '~/components/accommodation-inner/AccommodationInnerFeatures.vue';
import AccommodationInnerSlider from '~/components/accommodation-inner/AccommodationInnerSlider.vue';
import AccommodationInnerOffers from '~/components/accommodation-inner/AccommodationInnerOffers.vue';
import AccommodationInnerMore from '~/components/accommodation-inner/AccommodationInnerMore.vue';
import { mapGetters } from "vuex";

export default {
  components: {
    AppHeader,
    AppFooter,
    AccommodationInnerHeader,
    AccommodationInnerFeatures,
    AccommodationInnerSlider,
    AccommodationInnerOffers,
    AccommodationInnerMore
  },
  data: () => ({
    checkMoreItems: null,
  }),
  async asyncData({ store, params }) {
    await store.dispatch("accommodationSlug/getInnerData", params.slug);
    await store.dispatch("allAccommodations/getAccommodationsData");
    await store.dispatch("mainPage/getDataSpecials");
    await store.dispatch("allOffers/getOffersData");
  },
  computed: {
    ...mapGetters("accommodationSlug", ["getInnerData"]),
    ...mapGetters("allAccommodations", ["getAccommodationsData"]),
    ...mapGetters("mainPage", ["getDataSpecials"]),
    ...mapGetters("allOffers", ["getOffersData"]),

    apartmentsSlides() {
      let newArr = [];

      if (this.getInnerData[0]?.attributes?.Title_with_photo?.Photo_slider?.data) {
        this.getInnerData[0]?.attributes?.Title_with_photo?.Photo_slider?.data.forEach(el => {
          newArr.push(`${this.getApiUrl()}${el?.attributes?.url}`)
        });
      }

      return newArr
    },

    moreItems() {
      function RandArray(array){
        let rand = Math.random()*array.length | 0;
        let rValue = array[rand];
        return rValue;
      }

      let leftItem = RandArray(this.getAccommodationsData.filter(item => item?.attributes?.Slug !== this.getInnerData[0]?.attributes?.Slug));
      let rightItem = RandArray(this.getAccommodationsData.filter(item => item?.attributes?.Slug !== this.getInnerData[0]?.attributes?.Slug && item?.attributes?.Slug !== leftItem?.attributes?.Slug));

      return [leftItem, rightItem]
    },

    nextItem() {
      let nextIndex = this.getAccommodationsData.findIndex(item => item?.attributes?.Slug === this.getInnerData[0]?.attributes?.Slug) + 1;

      if (nextIndex >= this.getAccommodationsData.length) {
        nextIndex = 0;
      }
      
      return this.getAccommodationsData[nextIndex]?.attributes?.Slug
    },
    sortedSpecialOffers(){
      const offers = [...this.getOffersData];
      const sortedOffers = offers?.slice(-3)?.reverse();
      return sortedOffers;
    }
  },
  head() {
    return {
      title: this.getInnerData?.attributes?.Meta_tags_one_accommodation?.Title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getInnerData?.attributes?.Meta_tags_one_accommodation?.Description,
        },
        {
          hid: "title",
          name: "title",
          content: this.getInnerData?.attributes?.Meta_tags_one_accommodation?.Title,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.getInnerData?.attributes?.Meta_tags_one_accommodation?.Title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.getInnerData?.attributes?.Meta_tags_one_accommodation?.Description,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: `${this.getApiUrl()}${this.getInnerData?.attributes?.Meta_tags_one_accommodation?.Open_graph_photo?.data?.attributes?.url}`,
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
  mounted(){
    this.checkMoreItems = this.moreItems;
  }
};
</script>

<style lang="scss" scoped></style>