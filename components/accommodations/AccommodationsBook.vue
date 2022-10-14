<template>
  <div class="accommodations-book container">
    <div class="accommodations-book__bg block-wrapper">
      <img :src="image" alt="bgImage" ref="imageBg" />
    </div>

    <div class="accommodations-book__inner">
      <p class="accommodations-book__title h2" ref="title">{{ title }}</p>

      <div class="accommodations-book__bottom">
        <p class="accommodations-book__text p1 decor-text" ref="text">{{ text }}</p>

        <div class="accommodations-book__line block-wrapper">
          <svg width="1171" height="10" viewBox="0 0 1171 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="book-line">
              <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M1164 0.997678L1170.67 4.84668L1164 8.69568V0.997678ZM1154.06 4.18001L1160.7 4.18001V5.51335H1154.06V4.18001ZM1140.77 4.18001H1147.41V5.51335H1140.77V4.18001ZM1127.48 4.18001L1134.13 4.18001V5.51335H1127.48V4.18001ZM1114.19 4.18001H1120.84V5.51335L1114.19 5.51335V4.18001ZM1100.91 4.18001L1107.55 4.18001V5.51335L1100.91 5.51335V4.18001ZM1087.62 4.18001H1094.26V5.51335L1087.62 5.51335V4.18001ZM1074.33 4.18001H1080.97V5.51335L1074.33 5.51335V4.18001ZM1061.04 4.18001L1067.69 4.18001V5.51335L1061.04 5.51335V4.18001ZM1047.76 4.18001H1054.4V5.51335H1047.76V4.18001ZM1034.47 4.18001L1041.11 4.18001V5.51335H1034.47V4.18001ZM1021.18 4.18001H1027.82V5.51335H1021.18V4.18001ZM1007.89 4.18001L1014.54 4.18001V5.51335H1007.89V4.18001ZM994.604 4.18001H1001.25V5.51335H994.604V4.18001ZM981.316 4.18001L987.96 4.18001V5.51335H981.316V4.18001ZM968.028 4.18001H974.672V5.51335L968.028 5.51335V4.18001ZM954.74 4.18001L961.384 4.18001V5.51335L954.74 5.51335V4.18001ZM941.452 4.18001H948.096V5.51335L941.452 5.51335V4.18001ZM928.164 4.18001H934.808V5.51335L928.164 5.51335V4.18001ZM914.876 4.18001L921.52 4.18001V5.51335L914.876 5.51335V4.18001ZM901.589 4.18001H908.232V5.51335L901.589 5.51335V4.18001ZM888.301 4.18001L894.945 4.18001V5.51335H888.301V4.18001ZM875.013 4.18001H881.657V5.51335H875.013V4.18001ZM861.725 4.18001L868.369 4.18001V5.51335H861.725V4.18001ZM848.437 4.18001H855.081V5.51335H848.437V4.18001ZM835.149 4.18001L841.793 4.18001V5.51335H835.149V4.18001ZM821.861 4.18001H828.505V5.51335H821.861V4.18001ZM808.573 4.18001L815.217 4.18001V5.51335L808.573 5.51335V4.18001ZM795.285 4.18001H801.929V5.51335L795.285 5.51335V4.18001ZM781.997 4.18001H788.641V5.51335L781.997 5.51335V4.18001ZM768.709 4.18001L775.353 4.18001V5.51335L768.709 5.51335V4.18001ZM755.422 4.18001H762.066V5.51335L755.422 5.51335V4.18001ZM742.134 4.18001L748.778 4.18001V5.51335H742.134V4.18001ZM728.846 4.18001H735.49V5.51335H728.846V4.18001ZM715.558 4.18001L722.202 4.18001V5.51335H715.558V4.18001ZM702.27 4.18001H708.914V5.51335H702.27V4.18001ZM688.982 4.18001L695.626 4.18001V5.51335H688.982V4.18001ZM675.694 4.18001H682.338V5.51335H675.694V4.18001ZM662.406 4.18001L669.05 4.18001V5.51335H662.406V4.18001ZM649.118 4.18001H655.762V5.51335L649.118 5.51335V4.18001ZM635.831 4.18001L642.474 4.18001V5.51335L635.831 5.51335V4.18001ZM622.543 4.18001H629.187V5.51335L622.543 5.51335V4.18001ZM609.255 4.18001H615.899V5.51335L609.255 5.51335V4.18001ZM595.967 4.18001L602.611 4.18001V5.51335L595.967 5.51335V4.18001ZM582.679 4.18001H589.323V5.51335H582.679V4.18001ZM569.391 4.18001L576.035 4.18001V5.51335H569.391V4.18001ZM556.104 4.18001H562.747V5.51335H556.104V4.18001ZM542.816 4.18001L549.46 4.18001V5.51335H542.816V4.18001ZM529.528 4.18001H536.172V5.51335H529.528V4.18001ZM516.24 4.18001L522.884 4.18001V5.51335H516.24V4.18001ZM502.952 4.18001H509.596V5.51335L502.952 5.51335V4.18001ZM489.664 4.18001L496.308 4.18001V5.51335L489.664 5.51335V4.18001ZM476.377 4.18001H483.02V5.51335L476.377 5.51335V4.18001ZM463.089 4.18001H469.733V5.51335L463.089 5.51335V4.18001ZM449.801 4.18001L456.445 4.18001V5.51335L449.801 5.51335V4.18001ZM436.513 4.18001H443.157V5.51335L436.513 5.51335V4.18001ZM423.225 4.18001L429.869 4.18001V5.51335H423.225V4.18001ZM409.937 4.18001H416.581V5.51335H409.937V4.18001ZM396.649 4.18001L403.293 4.18001V5.51335H396.649V4.18001ZM383.362 4.18001H390.006V5.51335H383.362V4.18001ZM370.074 4.18001L376.718 4.18001V5.51335H370.074V4.18001ZM356.786 4.18001H363.43V5.51335H356.786V4.18001ZM343.498 4.18001L350.142 4.18001V5.51335L343.498 5.51335V4.18001ZM330.21 4.18001H336.854V5.51335L330.21 5.51335V4.18001ZM316.922 4.18001H323.566V5.51335L316.922 5.51335V4.18001ZM303.635 4.18001L310.278 4.18001V5.51335L303.635 5.51335V4.18001ZM290.347 4.18001H296.991V5.51335L290.347 5.51335V4.18001ZM277.059 4.18001L283.703 4.18001V5.51335H277.059V4.18001ZM263.771 4.18001H270.415V5.51335H263.771V4.18001ZM250.483 4.18001L257.127 4.18001V5.51335H250.483V4.18001ZM237.195 4.18001H243.839V5.51335H237.195V4.18001ZM223.907 4.18001L230.551 4.18001V5.51335H223.907V4.18001ZM210.62 4.18001H217.264V5.51335H210.62V4.18001ZM197.332 4.18001L203.976 4.18001V5.51335H197.332V4.18001ZM184.044 4.18001H190.688V5.51335L184.044 5.51335V4.18001ZM170.756 4.18001L177.4 4.18001V5.51335L170.756 5.51335V4.18001ZM157.468 4.18001H164.112V5.51335L157.468 5.51335V4.18001ZM144.18 4.18001H150.824V5.51335L144.18 5.51335V4.18001ZM130.893 4.18001L137.537 4.18001V5.51335L130.893 5.51335V4.18001ZM117.605 4.18001H124.249V5.51335H117.605V4.18001ZM104.317 4.18001L110.961 4.18001V5.51335H104.317V4.18001ZM91.0291 4.18001H97.673V5.51335H91.0291V4.18001ZM77.7412 4.18001L84.3852 4.18001V5.51335H77.7412V4.18001ZM64.4534 4.18001H71.0974V5.51335H64.4534V4.18001ZM51.1656 4.18001L57.8095 4.18001V5.51335H51.1656V4.18001ZM37.8776 4.18001H44.5217V5.51335L37.8776 5.51335V4.18001ZM24.5899 4.18001L31.2338 4.18001V5.51335L24.5899 5.51335V4.18001ZM11.3021 4.18001H17.946V5.51335L11.3021 5.51335V4.18001ZM1.33466 4.18001H4.65803V5.51335H1.33466V4.18001Z" fill="white"/>
            </clipPath>
            <line opacity="0.4" y1="5" x2="1171" y2="5" stroke="#FFFFFF" stroke-width="10" clip-path="url(#book-line)" ref="line"/>
          </svg>
        </div>
      </div>

      <CircleBtn
        class="accommodations-book__circle-btn"
        :textBtn="circleBtnText"
        :linkBtn="circleBtnLink"
      />
    </div>
  </div>
</template>

<script>
import CircleBtn from "~/components/common/CircleBtn.vue";
import { animateJS } from "~/plugins/animations";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


export default {
  components: { CircleBtn },
  props: {
    image: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    circleBtnText: {
      type: String,
      default: "",
    },
    circleBtnLink: {
      type: String,
      default: "",
    }
  },
  methods: {
    animateBookCard() {
      if (this.$refs.imageBg) {
        animateJS('scaleFullImage', this.$refs.imageBg);
        gsap.set(this.$refs.imageBg, {clearProps: true});
      }

      if (this.$refs.title) {
        animateJS('splitTitleLeft', this.$refs.title);
        gsap.set(this.$refs.title, {clearProps: true});
      }

      if (this.$refs.text) {
        animateJS('splitText', this.$refs.text);
        gsap.set(this.$refs.text, {clearProps: true});
      }

      if (this.$refs.line) {
        animateJS('drawSvg', this.$refs.line);
        gsap.set(this.$refs.line, {clearProps: true});
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.animateBookCard();
    });
  }
};
</script>

<style lang="scss" scoped>

.accommodations-book {
  height: 656px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
  }

  @include min(md) {
    height: 637px;
  }
  @include min(xl) {
    height: 744px;
  }
  @include min(bg) {
    height: 990px;
  }
}
.accommodations-book__bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.accommodations-book__inner {
  @include pt-coral;
  @include pb-coral;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}
.accommodations-book__title {
  width: 95%;
  color: $white-color;
  position: relative;
  z-index: 2;

  @include min(sm) {
    width: 80%;
  }
  @include min(md) {
    width: 73%;
  }
  @include min(bg) {
    width: 56%;
  }
}
.accommodations-book__bottom{
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
}
.accommodations-book__text {
  max-width: 121px;
  color: $white-color;
  position: relative;
  z-index: 2;

  @include min(sm) {
    max-width: 170px;
  }
  @include min(tb) {
    max-width: 240px;
  }
  @include min(md) {
    max-width: 270px;
    text-indent: 6ch;
  }
  @include min(bg) {
    max-width: 338px;
  }
}
.accommodations-book__line {
  display: none;

  img, svg {
    height: unset;
    width: unset;
    position: absolute;
    right: 0;
  }

  @include min(md) {
    height: 9px;
    margin-right: 170px;
    display: block;
    position: relative;
    flex-grow: 1;
  }
  @include min(lg) {
    margin-right: 190px;
  }
  @include min(bg) {
    height: 11px;
    margin-left: 40px;
    margin-right: 260px;
  }
}
.accommodations-book__circle-btn {
  position: absolute;
  bottom: 48px;
  right: 0;

  @include min(tb) {
    bottom: 56px;
  }
  @include min(md) {
    bottom: 32px;
  }
  @include min(bg) {
    bottom: 38px;
  }
}
</style>