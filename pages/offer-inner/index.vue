<template>
  <div class="wrapper">
    <AppHeader :darkTheme="true" />

    <div class="offer-page page">
      <OfferHeader
        :title="offerTitle"
        :date="offerDate"
        :offerBg="offerTopImage"
        :linkToAll="offerBtnAll"
        ref="offerHeader"
      />
      <OfferInfo
        :text1="offerText1"
        :listTitle="offerReasonsTitle"
        :listReasons="offerReasonsItems"
        :text2="offerText2"
        :listSlider="offerImagesItems"
        :text3="offerText3"
        ref="offerInfo"
      />
      <OfferScrollNext
        :offerBg="offerNextImage"
        :title="offerNextTitle"
        :text="offerNextText"
        :date="offerNextDate"
      />
    </div>
  </div>
</template>

<script>
import AppHeader from "~/components/common/AppHeader.vue";
import OfferHeader from '~/components/offer-inner/OfferHeader.vue';
import OfferInfo from '~/components/offer-inner/OfferInfo.vue';
import OfferScrollNext from '~/components/offer-inner/OfferScrollNext.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default {
  components: {
    AppHeader,
    OfferHeader,
    OfferInfo,
    OfferScrollNext
  },
  data: () => ({
    offerTitle: "Breakfast included when booking the Junior Suite",
    offerDate: "20 dec 2021",
    offerTopImage: require("~/static/images/offers/offerBg.jpg"),
    offerBtnAll: "go to all specials",
    offerText1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu dolor pretium potenti amet, facilisis duis ante sit ultrices. Nam rhoncus in sit tincidunt fringilla. Purus in sed pulvinar urna neque laoreet pharetra. Posuere ut amet fermentum volutpat massa risus, commodo diam integer. Arcu gravida scelerisque at velit amet est, enim, cursus quam. Odio pellentesque donec montes, lacus. Lacus egestas arcu viverra pulvinar quam enim, vivamus sed. Pretium ante ut tortor dolor ac quis diam diam. Amet, sollicitudin ac molestie consectetur id. Sit neque, nibh nec eget cursus. Adipiscing ipsum elit tellus at enim aliquam eget. Tincidunt gravida mollis nec placerat lectus mauris eu turpis. Ante consectetur at consequat ac faucibus placerat a scelerisque ornare. Odio aliquet lacus, ac velit.",
    offerText2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu dolor pretium potenti amet, facilisis duis ante sit ultrices. Nam rhoncus in sit tincidunt fringilla. Purus in sed pulvinar urna neque laoreet pharetra. Posuere ut amet fermentum volutpat massa risus, commodo diam integer. Arcu gravida scelerisque at velit amet est, enim, cursus quam. Odio pellentesque donec montes, lacus. Lacus egestas arcu viverra pulvinar quam enim, vivamus sed. Pretium ante ut tortor dolor ac quis diam diam. Amet, sollicitudin ac molestie consectetur id. Sit neque, nibh nec eget cursus. Adipiscing ipsum elit tellus at enim aliquam eget. Tincidunt gravida mollis nec placerat lectus mauris eu turpis. Ante consectetur at consequat ac faucibus placerat a scelerisque ornare. Odio aliquet lacus, ac velit.",
    offerText3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu dolor pretium potenti amet, facilisis duis ante sit ultrices. Nam rhoncus in sit tincidunt fringilla. Purus in sed pulvinar urna neque laoreet pharetra. Posuere ut amet fermentum volutpat massa risus, commodo diam integer. Arcu gravida scelerisque at velit amet est, enim, cursus quam. Odio pellentesque donec montes, lacus. Lacus egestas arcu viverra pulvinar quam enim, vivamus sed. Pretium ante ut tortor dolor ac quis diam diam. Amet, sollicitudin ac molestie consectetur id. Sit neque, nibh nec eget cursus. Adipiscing ipsum elit tellus at enim aliquam eget. Tincidunt gravida mollis nec placerat lectus mauris eu turpis. Ante consectetur at consequat ac faucibus placerat a scelerisque ornare. Odio aliquet lacus, ac velit.",
    offerReasonsTitle: "Lorem ipsum dolor sit amet",
    offerReasonsItems: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "Vivamus vel erat in ante pharetra aliquam ac ac ipsum",
      "nteger tincidunt magna ut ex scelerisque, auctor vehicula nibh ",
      "Etiam lobortis, libero et lobortis cursus, dui diam rutrum mi",
      "Vivamus vel erat in ante pharetra aliquam ac ac ipsum",
      "Donec suscipit arcu mauris, dignissim varius ipsum sagittis eu",
    ],
    offerImagesItems: [
      require("~/static/images/offers/card-1.jpg"),
      require("~/static/images/offers/card-2.jpg"),
      require("~/static/images/offers/card-3.jpg"),
      require("~/static/images/offers/card-4.jpg"),
      require("~/static/images/offers/card-5.jpg"),
    ],
    offerNextImage: require("~/static/images/offers/card-2.jpg"),
    offerNextTitle: "Breakfast included when booking the Junior Suite",
    offerNextText: "scroll to next offer",
    offerNextDate: "20 dec 2021",
  }),
  methods: {
    scrollBlock() {
      const block = this.$refs.offerInfo.$el;

      gsap.to(block, {
        ease: "none",
        scrollTrigger: {
          trigger: this.$refs.offerHeader.$el,
          pin: true,
          pinSpacing: false,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          start: () => "top top",
          end: () => '+=' + (block.clientHeight - this.$refs.offerHeader.$el.clientHeight),
        }
      });
    },
  },
  mounted() {
    if (this.$el.querySelector(".offer-page") && window.innerWidth > 767) {
      this.scrollBlock();
    }

    if (window.innerWidth >= 1024) {
      this.$refs.offerInfo.$el.style.marginTop = 
        `${this.$refs.offerHeader.$el.querySelector(".offer-header__inner").offsetHeight - this.$refs.offerHeader.$el.offsetHeight}px`
    }
  }
};
</script>

<style lang="scss" scoped>
.offer-page {
  background-color: $white-color;
}
</style>