import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin";
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

gsap.config({
  nullTargetWarn: false,
});
gsap.defaults({
  delay: 0,
  duration: 1,
})

const setDefaultScrollTrigger = (el, animation) => {
  return ScrollTrigger.create({
    trigger: el,
    start: 'top bottom+=50px',
    animation,
  })
}

const splitText = (el, obj) => {
  return new SplitText(el, obj)
}

function animateJS(type, ...args) {
  const tl = gsap.timeline();
  let split;

  switch (type) {
    case 'scaleFullImage':
      tl.fromTo(...args, { scale: 1.15 }, { duration: 1, scale: 1, ease: "Power2.easeInOut" });
      setDefaultScrollTrigger(args, tl);

      return;
    case 'fadeImage':
      tl.fromTo(...args, { scale: 0.85 }, { duration: 1, scale: 1, stagger: 0.25, ease: "Power2.easeOut" });
      setDefaultScrollTrigger(args, tl);

      return;
    case 'splitTitleLeft':
      const [ titleLeft ] = args;
      split = splitText(titleLeft, { type: 'lines', linesClass: 'wrapper-char' }).lines;

      tl.from(
        split, {
          duration: 1,
          x: -100,
          opacity: 0,
          stagger: 0.1,
          ease: "Power4.easeInOut",
        }
      );
      setDefaultScrollTrigger(titleLeft, tl);

      return;
    case 'splitTitleRight':
      const [ titleRight ] = args;
      split = splitText(titleRight, { type: 'lines' }).lines;

      tl.from(
        split, {
          duration: 1,
          x: 100,
          opacity: 0,
          stagger: 0.1,
          ease: "Power4.easeInOut",
        }
      );
      setDefaultScrollTrigger(titleRight, tl);

      return;
    case 'splitText':
      const [ text ] = args;

      tl.from(...args, { opacity: 0, duration: 1, yPercent: 70, stagger: 0.2, ease: "Power4.easeInOut" })
      setDefaultScrollTrigger(text, tl);

      return tl;
    case 'line-hr':
      tl.from(...args, { duration: 2, scaleX: 0, transformOrigin: "left 50%", ease: "Power4.easeInOut" });
      setDefaultScrollTrigger(...args, tl);

      return;
    case 'line-vr':
      tl.from(...args, { duration: 2, scaleY: 0, transformOrigin: "top 50%", ease: "Power4.easeInOut" });
      setDefaultScrollTrigger(...args, tl);

      return;
    case 'fade':
      tl.from(...args, { opacity: 0, stagger: 0.2, ease: "Power4.easeInOut" });
      setDefaultScrollTrigger(...args, tl);

      return;
    case 'fadeUp':
      tl.fromTo(...args, { opacity: 0, yPercent: 110 }, { opacity: 1, yPercent: 0, stagger: 0.2, ease: "Power4.easeInOut" });
      setDefaultScrollTrigger(...args, tl);

      return;
    case 'fadeDown':
      tl.fromTo(...args, { opacity: 0, yPercent: -110 }, { opacity: 1, yPercent: 0, stagger: 0.2, ease: "Power4.easeInOut" });
      setDefaultScrollTrigger(...args, tl);

      return;
    case 'drawSvg':
      tl.fromTo(...args, { drawSVG: '0' }, { duration: 1.5, drawSVG: '100%', ease: "none" });
      setDefaultScrollTrigger(...args, tl);

      return;
    case 'visibleItem':
      tl.fromTo(...args, { opacity: 0, autoAlpha: 0 }, { opacity: 1, autoAlpha: 1, stagger: 0.2, ease: "Power4.easeInOut" });
      setDefaultScrollTrigger(...args, tl);

      return;
    case 'fadeCards':
      tl.from(...args, 
        { autoAlpha: 0, opacity: 0, yPercent: 110, stagger: 0.2, ease: "Power4.easeInOut" }
      );
      setDefaultScrollTrigger(...args, tl);

      return;
  }
}

function parallaxImage(el, screen, value) {
  gsap.to(el, {
    yPercent: -value || -100,
    ease: "none",
    scrollTrigger: {
      trigger: screen,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }, 
  });
}

export { animateJS, parallaxImage };
