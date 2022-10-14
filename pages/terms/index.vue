<template>
  <div class="wrapper">
    <AppHeader :darkTheme="true" />

    <div class="terms-page page">
      <PrivacyInfo
        :title="getData?.Main_terms?.Title"
        :list="getData?.Main_terms?.Content_terms_of_use"
      />
      <PrivacyForm
        :bgImage="`${getApiUrl()}${getData?.Main_terms?.Form_terms?.Photo_cover_background?.data?.attributes?.url}`"
        :title="getData?.Main_terms?.Form_terms?.Title_background"
      >
        <QuestionForm
          class="terms-page__form-block"
          :formTitle="getData?.Main_terms?.Form_terms?.Form_title"
          :formAccept="$t('accept form')"
          :formBtn="getData?.Main_terms?.Form_send_btn"
          :inputsItems="getData?.Main_terms?.Form_input"
        />
      </PrivacyForm>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "~/components/common/AppHeader.vue";
import AppFooter from "~/components/common/AppFooter.vue";
import PrivacyInfo from "~/components/privacy/PrivacyInfo.vue";
import PrivacyForm from "~/components/privacy/PrivacyForm.vue";
import QuestionForm from '~/components/form/QuestionForm.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { mapGetters } from "vuex";

export default {
  components: {
    AppHeader,
    AppFooter,
    PrivacyInfo,
    PrivacyForm,
    QuestionForm
  },
  async asyncData({ store }) {
    await store.dispatch("termsPage/getData");
  },
  computed: {
    ...mapGetters("termsPage", ["getData"]),
  },
  head() {
    return {
      title: this.getData?.Meta_tags_terms_of_use?.Title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getData?.Meta_tags_terms_of_use?.Description,
        },
        {
          hid: "title",
          name: "title",
          content: this.getData?.Meta_tags_terms_of_use?.Title,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.getData?.Meta_tags_terms_of_use?.Title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.getData?.Meta_tags_terms_of_use?.Description,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: `${this.getApiUrl()}${this.getData?.Meta_tags_terms_of_use?.Open_graph_photo?.data?.attributes?.url}`,
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
    skewForm() {
      let proxy = { skew: 0 };
      let skewSetter = gsap.quickSetter(".terms-page__form-block", "skewY", "deg");
      let clamp = gsap.utils.clamp(-1.5, 1.5);

      ScrollTrigger.create({
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / -100);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0, duration: 1.2, ease: "Power0.easeNone", overwrite: true, onUpdate: () => skewSetter(proxy.skew)
            });
          }
        }
      });
    }
  },
  mounted() {
    // this.skewForm();
  }
};
</script>

<style lang="scss" scoped></style>