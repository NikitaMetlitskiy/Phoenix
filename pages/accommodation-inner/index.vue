<template>
  <div class="wrapper">
    <AppHeader />

    <div class="accommodation-page page">
      <AccommodationInnerHeader
        :title="accommodationTitle"
        :price="accommodationPrice"
        :text="accommodationText"
        :accommodationBg="accommodationBg"
        :smallImage="accommodationSmallImage"
        :nextItem="accommodationBtnText"
        :nextItemLink="accommodationBtnLink"
        :detailsList="accommodationDetailsList"
      />
      <AccommodationInnerFeatures
        :title="accommodationFeaturesTitle"
        :subTitle="accommodationFeaturesSubtitle"
        :text="accommodationFeaturesText"
        :featuresList="accommodationFeaturesList"
      />
      <AccommodationInnerSlider
        :title="accommodationSliderTitle"
        :featuresList="accommodationSliderImages"
      />
      <AccommodationInnerOffers
        :title="accommodationOffersTitle"
        :button="accommodationOffersBtnText"
        :offersList="accommodationOffersCards"
      />
      <AccommodationInnerMore
        :title="accommodationMoreTitle"
        :moreItemsList="accommodationMoreCards"
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
    accommodationBtnText: "Next room",
    accommodationBtnLink: "",
    accommodationTitle: "Courtyard Standard Room",
    accommodationPrice: "From 150$ night",
    accommodationText: "The chalet can comfortably accommodate 6 people and 2 extra beds on the sofa in the living room at an additional cost",
    accommodationBg: require("~/static/images/accommodation/innerBg.jpg"),
    accommodationSmallImage: require("~/static/images/offers/offerBg.jpg"),
    accommodationDetailsList: [
      {
        name: "Average area:",
        value: "27 sq. m.",
      },
      {
        name: "Bed type:",
        value: "2 Twin / King-size",
      },
      {
        name: "Number of guests:",
        value: "3",
      },
    ],
    accommodationFeaturesTitle: "Premium Chalet welcomes guests with warmth and comfort",
    accommodationFeaturesSubtitle: "There is a private bathroom on each floor",
    accommodationFeaturesText: "Each chalet has a full kitchen combined with a living room where you can relax on the sofa after a delicious dinner",
    accommodationFeaturesList: [
      {
        icon: require("~/static/icons/house.svg"),
        value: "2 Twin / King-size",
      },
      {
        icon: require("~/static/icons/house.svg"),
        value: "Additional seats",
      },
      {
        icon: require("~/static/icons/house.svg"),
        value: "Kitchen",
      },
      {
        icon: require("~/static/icons/house.svg"),
        value: "fridge",
      },
      {
        icon: require("~/static/icons/house.svg"),
        value: "Microwave",
      },
      {
        icon: require("~/static/icons/house.svg"),
        value: "Hair dryer",
      },
      {
        icon: require("~/static/icons/house.svg"),
        value: "Vacuum cleaner",
      },
      {
        icon: require("~/static/icons/house.svg"),
        value: "Kettle",
      },
      {
        icon: require("~/static/icons/house.svg"),
        value: "Dishes",
      },
    ],
    accommodationSliderTitle: "Large living room with access to the terrace to admire the majesty of the mountains",
    accommodationSliderImages: [
      require("~/static/images/offers/offerBg.jpg"),
      require("~/static/images/main/instagram-photo3.jpg"),
      require("~/static/images/about/about-slider2.jpg"),
      require("~/static/images/about/about.jpg"),
      require("~/static/images/accommodation/innerBg.jpg"),
    ],
    accommodationOffersTitle: "Book with special offers",
    accommodationOffersBtnText: "View all",
    accommodationOffersCards: [
      {
        title: "Lorem ipsum dolor",
        image: require("~/static/images/main/relaxation-option1.jpg"),
        text: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        title: "Lorem ipsum dolor",
        image: require("~/static/images/main/relaxation-option2.jpg"),
        text: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        title: "Lorem ipsum dolor",
        image: require("~/static/images/main/relaxation-option3.jpg"),
        text: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        title: "Lorem ipsum dolor",
        image: require("~/static/images/main/relaxation-option4.jpg"),
        text: "Lorem ipsum dolor sit amet, consectetur",
      },
    ],
    accommodationMoreTitle: "Don`t wait any longer",
    accommodationMoreCards: [
      {
        title: "NOMER B8",
        link: "accommodation-inner",
        photo: require("~/static/images/accommodation/example-1.jpg"),
        details: [
          {
            name: "Bed type:",
            value: "2 Twin / King-size",
          },
          {
            name: "Average area:",
            value: "27 sq. m.",
          },
        ],
      },
      {
        title: "NOMER B8",
        link: "accommodation-inner",
        photo: require("~/static/images/accommodation/example-2.jpg"),
        details: [
          {
            name: "Bed type:",
            value: "2 Twin / King-size",
          },
          {
            name: "Average area:",
            value: "27 sq. m.",
          },
        ],
      },
    ],
  }),
};
</script>

<style lang="scss" scoped></style>