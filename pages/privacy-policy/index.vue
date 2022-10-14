<template>
  <div class="wrapper">
    <AppHeader :darkTheme="true" />

    <div class="privacy-page page">
      <PrivacyInfo
        :title="getData?.Main_privacy?.Title"
        :list="getData?.Main_privacy?.Content_privacy_policy"
      />
      <PrivacyForm
        :bgImage="`${getApiUrl()}${getData?.Main_privacy?.Form_privacy?.Photo_cover_background?.data?.attributes?.url}`"
        :title="getData?.Main_privacy?.Form_privacy?.Title_background"
      >
        <QuestionForm
          class="privacy-page__form-block"
          :formTitle="getData?.Main_privacy?.Form_privacy?.Form_title"
          :formAccept="$t('accept form')"
          :formBtn="getData?.Main_privacy?.Form_send_btn"
          :inputsItems="getData?.Main_privacy?.Form_input"
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
    await store.dispatch("privacyPage/getData");
  },
  computed: {
    ...mapGetters("privacyPage", ["getData"]),
  },
  head() {
    return {
      title: this.getData?.Meta_tags_privacy_policy?.Title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getData?.Meta_tags_privacy_policy?.Description,
        },
        {
          hid: "title",
          name: "title",
          content: this.getData?.Meta_tags_privacy_policy?.Title,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.getData?.Meta_tags_privacy_policy?.Title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.getData?.Meta_tags_privacy_policy?.Description,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: `${this.getApiUrl()}${this.getData?.Meta_tags_privacy_policy?.Open_graph_photo?.data?.attributes?.url}`,
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
      let skewSetter = gsap.quickSetter(".privacy-page__form-block", "skewY", "deg");
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