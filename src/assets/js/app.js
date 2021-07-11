import Glide from '@glidejs/glide';
import Swiper from 'swiper/swiper-bundle.js';

import Modal from './modules/modal';

import renderProductCards from './modules/card';

document.addEventListener('DOMContentLoaded', () => {

  // hamburger:
  const header = document.querySelector('.header');
  const toggleMenu = () => {
    header.classList.toggle('open');
    document.addEventListener('scroll', () => header.classList.remove('open'), {
      once: true
    });
  }
  document.querySelector('.hamburger').addEventListener('click', toggleMenu);
  document.querySelector('.hamburger-layover').addEventListener('click', toggleMenu);

  ////////////////////////////////////////////////////////////////
  // map:
  document.querySelector('.requisites').addEventListener('mouseenter', () => {
    document.querySelector('.icon-map-pin').style = "opacity: 0; transition: opacity 1.5s linear";
  }, {
    once: true
  });

  ////////////////////////////////////////////////////////////////
  // button up:
  document.querySelector('.icon-button-up').addEventListener('click', () => {
    scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    });
  });

  ////////////////////////////////////////////////////////////////
  // accordion:
  const ardItems = document.querySelectorAll('.faq__accordion p');
  const accordion = document.querySelector('.faq__accordion');

  function setHeight() {
    accordion.style = '';
    const size = [...ardItems].map(item => {
      item.style = 'height: unset';
      const h = item.offsetHeight;
      item.style = '';
      return h;
    });
    const value = Math.max(...size);
    accordion.style = `--i:${value + 34}px`;
  };

  window.addEventListener('resize', () => setHeight());
  setHeight();

  // accordion buttons:
  const accordionLinks = document.querySelectorAll('.faq__accordion li');
  const toggleAccordionLinks = function() {
    accordionLinks.forEach(link => (link === this) ? link.classList.add('open') : link.classList.remove('open'));
  }
  accordionLinks.forEach(link => link.addEventListener('click', toggleAccordionLinks));

  ////////////////////////////////////////////////////////////////
  // header scroll:
  ['catalog', 'cooperation', 'question', 'contact'].forEach(item =>
    document.querySelector(`[data-scroll-${item}]`).addEventListener('click', () =>
      document.querySelector(`[data-scroll-target-${item}]`).scrollIntoView({
        behavior: "smooth",
      })
    ));

  ////////////////////////////////////////////////////////////////
  renderProductCards();

  ////////////////////////////////////////////////////////////////
  // modal:
  new Modal(['commercial', 'partner', 'question', 'call', 'thanks', 'error']);

  ////////////////////////////////////////////////////////////////
  document.querySelectorAll('.sertificate__modal').forEach(item => addSertificateSliders(item));

  const sertificateDiploma = document.querySelector('.sertificate__thumbnail-container div');
  const options = {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    swipeThreshold: 40,
    dragThreshold: 80,
    gap: 30,
    animationDuration: 500,
    animationTimingFunc: "ease-out",
    fucusAt: 'center',
  };

  function addSertificateSliders(item) {
    const slider = item;

    let gObject, gContainer, gTrack, gSlides, gSlidesArr;

    slider.querySelectorAll('img').forEach((item, i) => item.addEventListener('click', function() {
      sertificateDiploma.style = 'transform: none; transition: none';

      gContainer = this.closest('[data-glide]');
      gContainer.classList = 'glide';
      gTrack = gContainer.firstElementChild;
      gTrack.classList = 'glide__track';
      gSlides = gTrack.firstElementChild;
      gSlides.classList = 'glide__slides';
      gSlidesArr = [...gSlides.children];
      gSlidesArr.forEach(item => item.classList = 'glide__slide');

      setTimeout(() => {
        gObject = new Glide(gContainer, options).mount();
        gObject.go(`=${i}`);
      })

      slider.classList.add('open');
    }))

    slider.querySelector('.btn-close').addEventListener('click', () => {
      sertificateDiploma.style = 'transition: none';
      setTimeout(() => sertificateDiploma.style = '');
      slider.classList.remove('open');
      gObject.destroy();
      gContainer.classList = '';
      gTrack.classList = '';
      gSlides.classList = 'sertificate__thumbnails';
      gSlidesArr.forEach(item => item.classList = '');
    })
  }

  const sertificateContainer = document.querySelector('.sertificate__thumbnail-container');
  const sertificatesButtons = document.querySelectorAll('.sertificate__buttons button');

  document.querySelector('[data-btn-diploma]').addEventListener('click', function() {
    sertificatesButtons.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
    sertificateContainer.classList.add('diploma');
  });
  document.querySelector('[data-btn-sertificate]').addEventListener('click', function() {
    sertificatesButtons.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
    sertificateContainer.classList.remove('diploma');
  });




  ////////////////////////////////////////////////////////////////
  // modal sertificates:
  let windowScroll;
  document.querySelector('.licence button').addEventListener('click', () => {
    windowScroll = window.scrollY;
    document.querySelector('main').style.display = "none";
    document.querySelector('.sertificate').classList.add('open');
  });
  document.querySelector('.sertificate__container >.btn-close').addEventListener('click', () => {
    document.querySelector('main').style = "";
    document.querySelector('.sertificate').classList.remove('open');
    scrollTo({
      left: 0,
      top: windowScroll,
      behavior: 'instant'
    });
  });

  ////////////////////////////////////////////////////////////////
  // modal-product:
  const swiperProductButtons = new Swiper(".swiperProductButtons", {
    freeMode: true,
    watchSlidesProgress: true,
    slidesPerView: "auto",
    spaceBetween: 10,
    slidesOffsetAfter: 15,
    slidesOffsetBefore: 15,
    navigation: {
      nextEl: ".product-next",
      prevEl: ".product-prev",
    },
    breakpoints: {
      1200: {
        slidesOffsetAfter: 90,
        slidesOffsetBefore: 90,
        spaceBetween: 30,
      }
    }
  });

  const swiperProduct = new Swiper(".swiperProduct", {
    slidesPerView: 1,
    grabCursor: true,
    effect: "creative",
    spaceBetween: 1630,
    keyboard: true,
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
    thumbs: {
      swiper: swiperProductButtons,
    },
  });

  const productButton = document.querySelectorAll('[data-product]');
  const productCloseButton = document.querySelector('.product .btn-close');
  const productModal = document.querySelector('.product');

  productButton.forEach(item => item.addEventListener('click', function() {
    windowScroll = window.scrollY;

    swiperProduct.slideTo(this.getAttribute('data-product'));

    document.querySelector('main').style.display = 'none';
    productModal.classList.add('open');
  }));


  productCloseButton.addEventListener('click', () => {
    productModal.classList.remove('open');
    document.querySelector('main').style.display = '';
    scrollTo({
      left: 0,
      top: windowScroll,
      behavior: 'instant'
    });
  })









})



// hover intent:

// var opts = {
//   timeout: 500,
//   interval: 50
// };

// var el = document.getElementById('element-id');
// hoverintent(el,
//   function() {
//     // Handler in
//   },
//   function() {
//     // Handler out
//   }).options(opts);