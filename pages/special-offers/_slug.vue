<template>
  <div class="wrapper">
    <AppHeader :darkTheme="true" />

    <div class="offer-page page">
      <OfferHeader
        :title="getOfferData[0]?.attributes?.Offer?.Offer_title"
        :date="getOfferData[0]?.attributes?.Offer?.Offer_date"
        :offerBg="`${getApiUrl()}${getOfferData[0]?.attributes?.Offer?.Offer_cover_photo?.data?.attributes?.url}`"
        :linkToAll="$t('go to all specials')"
        ref="offerHeader"
      />
      <OfferInfo
        :title="getOfferData[0]?.attributes?.Offer?.Offer_title"
        :date="getOfferData[0]?.attributes?.Offer?.Offer_date"
        :text1="getOfferData[0]?.attributes?.Offer?.Offer_description"
        :listTitle="getOfferData[0]?.attributes?.Offer?.Description_block?.Title"
        :text2="getOfferData[0]?.attributes?.Offer?.Description_block?.Description"
        :listSlider="offerSlides[`${getOfferData[0]?.id}`]"
        :text3="getOfferData[0]?.attributes?.Offer?.Description_block?.Description_under_slider"
        ref="offerInfo"
      />
      <div class="test" v-for="(offer, index) in offers" :key="index">
        <OfferHeader
          :title="offer?.attributes?.Offer?.Offer_title"
          :date="offer?.attributes?.Offer?.Offer_date"
          :offerBg="`${getApiUrl()}${offer?.attributes?.Offer?.Offer_cover_photo?.data?.attributes?.url}`"
          :linkToAll="$t('go to all specials')"
          :ref="`offerHeader_${offer.alterId}`"
        />
        <OfferInfo
          :title="offer?.attributes?.Offer?.Offer_title"
          :date="offer?.attributes?.Offer?.Offer_date"
          :text1="offer?.attributes?.Offer?.Offer_description"
          :listTitle="offer?.attributes?.Offer?.Description_block?.Title"
          :text2="offer?.attributes?.Offer?.Description_block?.Description"
          :listSlider="offerSlides[`${offer?.id}`]"
          :text3="offer?.attributes?.Offer?.Description_block?.Description_under_slider"
          :notFirst="true"
          :ref="`offerInfo_${offer.alterId}`"
        />
      </div>
      <!-- <OfferScrollNext
        :offerBg="`${getApiUrl()}${nextOffer?.attributes?.Offer?.Offer_cover_photo?.data?.attributes?.url}`"
        :title="nextOffer?.attributes?.Offer?.Offer_title"
        :linkText="$t('scroll to next offer')"
        :linkValue="`${nextOffer?.attributes?.Slug}`"
        :date="nextOffer?.attributes?.Offer?.Offer_date"
      /> -->
    </div>
  </div>
</template>

<script>
import AppHeader from "~/components/common/AppHeader.vue";
import OfferHeader from '~/components/offer-inner/OfferHeader.vue';
import OfferInfo from '~/components/offer-inner/OfferInfo.vue';
// import OfferScrollNext from '~/components/offer-inner/OfferScrollNext.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { mapGetters } from "vuex";

export default {
  components: {
    AppHeader,
    OfferHeader,
    OfferInfo,
    // OfferScrollNext
  },
  async asyncData({ store, params }) {
    await store.dispatch("offerSlug/getOfferData", params.slug);
    await store.dispatch("allOffers/getOffersData");
  },
  data(){
    return {
      offers: [],
      showedOffers: new Set(),
      currentOffer: undefined,
      cycle: 0,
      animation: null
    }
  },
  computed: {
    ...mapGetters("offerSlug", ["getOfferData"]),
    ...mapGetters("allOffers", ["getOffersData"]),

    offerSlides() {
      let sliders = {};
      this.getOffersData.forEach(offer => {
        let newArr = [];

        if (offer?.attributes?.Offer?.Description_block?.Photo_slider?.data) {
          offer?.attributes?.Offer?.Description_block?.Photo_slider?.data.forEach(el => {
            newArr.push(`${this.getApiUrl()}${el?.attributes?.url}`)
          });
        }

        sliders[`${offer.id}`] = newArr;
      })
      // let newArr = [];

      // if (this.getOfferData[0]?.attributes?.Offer?.Description_block?.Photo_slider?.data) {
      //   this.getOfferData[0]?.attributes?.Offer?.Description_block?.Photo_slider?.data.forEach(el => {
      //     newArr.push(`${this.getApiUrl()}${el?.attributes?.url}`)
      //   });
      // }

      return sliders
    },

    nextOffer() {
      function RandArray(array){
        let rand = Math.random()*array.length | 0;
        let rValue = array[rand];
        return rValue;
      }

      return RandArray(this.getOffersData.filter(item => item?.attributes?.Slug !== this.getOfferData[0]?.attributes?.Slug))
    }
  },
  head() {
    return {
      title: this.getOfferData?.attributes?.Meta_tags_offer?.Title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getOfferData?.attributes?.Meta_tags_offer?.Description,
        },
        {
          hid: "title",
          name: "title",
          content: this.getOfferData?.attributes?.Meta_tags_offer?.Title,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.getOfferData?.attributes?.Meta_tags_offer?.Title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.getOfferData?.attributes?.Meta_tags_offer?.Description,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: `${this.getApiUrl()}${this.getOfferData?.attributes?.Meta_tags_offer?.Open_graph_photo?.data?.attributes?.url}`,
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
    scrollBlock(id = null) {
      const block = id ? this.$refs[`offerInfo_${id}`][0].$el : this.$refs.offerInfo.$el;
      const trigger = id ? this.$refs[`offerHeader_${id}`][0].$el : this.$refs.offerHeader.$el;
      let params = {};

      if(window.innerWidth >= 1024){
          params.pin = true;
      } else {
          params.pin = false;
      }

      // if(block.clientHeight <= window.innerHeight){
      //   this.pushOffer();
      //   this.showedOffers.add(id);
      // }

      this.animation = gsap.to(block, {
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: params.pin,
          pinSpacing: false,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          start: () => "top top",
          end: () => '+=' + (block.clientHeight - trigger.clientHeight),
        },
        onUpdate: () => {
          if(this.animation){
            if(this.currentOffer !== id){
              this.changeURL(id);
            }
            if(this.animation.progress() > 0.8){
              if(!this.offers.length){
                this.pushOffer();
              } else if(id && !this.showedOffers.has(id)){
                this.showedOffers.add(id);
                this.pushOffer();
              }
            }
          }
        }
      });
    },
    pushOffer(){
      const cycle = Math.floor((this.offers.length + 1) / this.getOffersData.length);
      const allOffers = [];

      this.getOffersData.forEach(offer => {
        const item = {};
        item.id = offer.id;
        item.attributes = offer.attributes;
        item.alterId = offer.id + `_cycle${cycle}`;

        allOffers.push(item);
      });

      const availableOffers = allOffers.filter(el => {
        let match = false;
        if(this.offers.length){
          const tempOffers = cycle === 0 ? this.offers : this.offers.slice(cycle * this.getOffersData.length - 1);
          if(tempOffers.length){
            tempOffers.forEach(offer => {
              if(el?.alterId === offer?.alterId || (cycle === 0 && el?.id === this.getOfferData[0]?.id)){
                match = true;
              }
            });
          } else {
            if(el?.id !== this.getOfferData[0]?.id){
              match = true;
            }
          }
        } else {
          if(el?.id === this.getOfferData[0]?.id){
            match = true;
          }
        }
        
        if(!match){
          return el;
        }
      });

      if(availableOffers.length){
        this.offers.push(availableOffers[0]);

        setTimeout(() => {
          this.scrollBlock(availableOffers[0].alterId);
        }, 0);
      }
    },
    changeURL(id){
      if(!id){
        this.currentOffer = null;
        const slug = this.getOfferData[0].attributes.Slug;
        window.history.pushState("", "", `/special-offers/${slug}`);
      } else{
        this.currentOffer = id;
        const offer = this.offers.find(el => {
          if(el?.alterId === id){
            return el;
          }
        });

        if(offer){
          const slug = offer.attributes.Slug;
          window.history.pushState("", "", `/special-offers/${slug}`);
        }
      }
    }
  },
  mounted() {
    if (this.$el.querySelector(".offer-page")) {
      this.scrollBlock();
    }

    // if (window.innerWidth >= 1024) {
      // this.$refs.offerInfo.$el.style.marginTop = `-${this.$refs.offerHeader.$el.offsetHeight}px`
        // `${this.$refs.offerHeader.$el.querySelector(".offer-header__inner").offsetHeight - this.$refs.offerHeader.$el.offsetHeight}px`;

      // this.$refs.offerHeader.$el.querySelector(".offer-header__inner").style.display = "none"
    // }
  },
  beforeDestroy(){
    this.animation.kill();
    this.animation = null;
  }
};
</script>

<style lang="scss" scoped>
.offer-page {
  background-color: $white-color;
}
.test{
  margin-top: 64px;
  @include min(tb) {
    margin-top: 85px;
  }
  @include min(xl) {
    margin-top: 94px;
  }
  @include min(bg) {
    margin-top: 125px;
  }
}
</style>