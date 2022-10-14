<template>
  <div class="wrapper">
    <AppHeader />

    <div class="contact-page page block-wrapper">
      <div class="contact-page__bg">
        <img :src="backgroundImage" alt="" ref="imageBg" />
      </div>

      <div class="contact-page__inner container">
        <h1 class="contact-page__title h1" ref="title">{{getData?.Contact?.Title}}</h1>

        <ContactFrame
          :linkAddress="getData?.Contact?.Location_link"
          :bgAddress="getData?.Contact?.Location"
          :contactPhone="getData?.Contact?.Contact_block?.Phone"
          :contactEmail="getData?.Contact?.Contact_block?.Email"
          :contactBtnText="$t('book now')"
          :contactBtnLink="'choose-apartment'"
          :contactSocialText="getData?.Contact?.Contact_block?.Discription_subscribe"
          :socialItems="getData?.Contact?.Social_media"
        />

        <QuestionForm
          class="contact-page__form"
          :formTitle="getData?.Contact?.Form_title"
          :formAccept="$t('accept form')"
          :formBtn="getData?.Contact?.Form_send_btn"
          :inputsItems="getData?.Contact?.Form_input"
        />
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "~/components/common/AppHeader.vue";
import AppFooter from "~/components/common/AppFooter.vue";
import ContactFrame from '~/components/contact/ContactFrame.vue';
import QuestionForm from '~/components/form/QuestionForm.vue';
import VanillaTilt from "vanilla-tilt";
import { animateJS } from "~/plugins/animations";
import { mapGetters } from "vuex";

export default {
  components: {
    AppHeader,
    AppFooter,
    ContactFrame,
    QuestionForm
  },
  async asyncData({ store }) {
    await store.dispatch("contactPage/getData");
  },
  computed: {
    ...mapGetters("contactPage", ["getData"]),
  },
  data: () => ({
    backgroundImage: require("~/static/images/contact/contact-map.jpg"),
  }),
  head() {
    return {
      title: this.getData?.Meta_tags_contact?.Title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getData?.Meta_tags_contact?.Description,
        },
        {
          hid: "title",
          name: "title",
          content: this.getData?.Meta_tags_contact?.Title,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.getData?.Meta_tags_contact?.Title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.getData?.Meta_tags_contact?.Description,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: `${this.getApiUrl()}${this.getData?.Meta_tags_contact?.Open_graph_photo?.data?.attributes?.url}`,
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
  mounted() {
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) && window.innerWidth >= 1024) {
      VanillaTilt.init(this.$refs.imageBg, {
        max: 2,
        "mouse-event-element": ".contact-page",
      });
    }

    this.$nextTick(() => {
      if (this.$refs.title) {
        animateJS('splitTitleLeft', this.$refs.title);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.contact-page {
  background-color: $black-color;
  color: $white-color;
  position: relative;
}
.contact-page__bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  @include min(md) {
    transform: scale(1.12) translateY(-10px);
  }
}
.contact-page__inner {
  margin-top: 64px;
  @include pb-aquamarine;
  border-bottom: 1px solid rgba(#FFFFFF, 0.1);
  position: relative;
  z-index: 2;

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
.contact-page__title {
  @include pt-darkgreen;
  @include mb-antiquewhite;
  text-align: center;
}
.contact-page__form {
  @include mt-gold;
}
</style>