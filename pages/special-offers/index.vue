<template>
  <div class="wrapper">
    <AppHeader :darkTheme="true" />

    <div class="special-offers-page page">
      <SpecialOffersTop
        :title="getData?.Main_special_offers?.Title"
        :text="getData?.Main_special_offers?.Description"
      />
      <SpecialOffersCards
        :cards="getOffersData"
      />
      <MainInstagramPhoto :data="getDataInstagram" />
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "~/components/common/AppHeader.vue";
import AppFooter from "~/components/common/AppFooter.vue";
import SpecialOffersTop from '~/components/special-offers/SpecialOffersTop.vue';
import SpecialOffersCards from '~/components/special-offers/SpecialOffersCards.vue';
import MainInstagramPhoto from '~/components/main/MainInstagramPhoto.vue';
import { mapGetters } from "vuex";

export default {
  components: {
    AppHeader,
    AppFooter,
    SpecialOffersTop,
    SpecialOffersCards,
    MainInstagramPhoto
  },
  async asyncData({ store }) {
    await store.dispatch("mainPage/getDataInstagram");
    await store.dispatch("mainPage/getDataInstaList");
    await store.dispatch("specialOffersPage/getData");
    await store.dispatch("allOffers/getOffersData");
  },
  computed: {
    ...mapGetters("specialOffersPage", ["getData"]),
    ...mapGetters("allOffers", ["getOffersData"]),
    ...mapGetters("mainPage", ["getDataInstagram", "getDataInstaList"]),
  },
  head() {
    return {
      title: this.getData?.Meta_tags_special_offer?.Title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getData?.Meta_tags_special_offer?.Description,
        },
        {
          hid: "title",
          name: "title",
          content: this.getData?.Meta_tags_special_offer?.Title,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.getData?.Meta_tags_special_offer?.Title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.getData?.Meta_tags_special_offer?.Description,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: `${this.getApiUrl()}${this.getData?.Meta_tags_special_offer?.Open_graph_photo?.data?.attributes?.url}`,
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