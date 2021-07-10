import Glide from '@glidejs/glide';

import Modal from './modules/modal';
import updateProductCard from './modules/card';
import {
  createProductCards
} from './modules/card';

document.addEventListener('DOMContentLoaded', () => {

  createProductCards();

  const hamburgerBtn = document.querySelector('.hamburger');
  const hamburgerLayover = document.querySelector('.hamburger-layover');
  const header = document.querySelector('.header');
  const toggleMenu = () => {
    hamburgerBtn.classList.toggle('active');
    hamburgerLayover.classList.toggle('open');
    header.classList.toggle('menu-open');

    document.addEventListener('scroll', () => {
      hamburgerLayover.classList.remove('open');
      header.classList.remove('menu-open');
      hamburgerBtn.classList.remove('active');
      console.log('scroll');
    }, {
      once: true
    })
  }
  hamburgerBtn.addEventListener('click', toggleMenu);
  hamburgerLayover.addEventListener('click', toggleMenu);

  ////////////////////////////////////////////////////////////////
  document.querySelector('.requisites').addEventListener('mouseenter', () => {
    document.querySelector('.icon-map-pin').style = "opacity: 0; transition: opacity 1.5s linear";
  }, {
    once: true
  });

  ////////////////////////////////////////////////////////////////
  document.querySelector('.icon-button-up').addEventListener('click', () => {
    scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    });
  });

  ////////////////////////////////////////////////////////////////
  const accordionLinks = document.querySelectorAll('.faq__accordion li');
  const toggleAccordionLinks = function() {
    accordionLinks.forEach(link => (link === this) ? link.classList.add('open') : link.classList.remove('open'));
  }
  accordionLinks.forEach(link => link.addEventListener('click', toggleAccordionLinks));

  ////////////////////////////////////////////////////////////////
  // header scroll:
  const headerScrollArr = ['catalog', 'cooperation', 'question', 'contact'];
  headerScrollArr.forEach(item => {
    document.querySelector(`[data-scroll-${item}]`).addEventListener('click', () => {
      document.querySelector(`[data-scroll-target-${item}]`).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    })
  })

  ////////////////////////////////////////////////////////////////
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

  document.addEventListener('focus', (e) => console.log(e.target));

  // modal-product:
  const productButton = document.querySelectorAll('[data-product]');
  const productCloseButton = document.querySelector('.product .btn-close');
  const productModal = document.querySelector('.product');

  productButton.forEach(item => item.addEventListener('click', function() {
    windowScroll = window.scrollY;

    updateProductCard(this.getAttribute('data-product'));

    document.querySelector('main').style.display = 'none';
    productModal.style.display = '';

    // ProductSlider.gObject.go(`=1`);
  }));

  productCloseButton.addEventListener('click', () => {
    document.querySelector('main').style.display = '';
    productModal.style.display = 'none';
    scrollTo({
      left: 0,
      top: windowScroll,
      behavior: 'instant'
    });
  })

  const options1 = {
    type: 'slider',
    rewind: false,
    startAt: 0,
    bound: true,
    perView: 3.9,
    swipeThreshold: 40,
    dragThreshold: 80,
    gap: 30,
    animationDuration: 300,
    animationTimingFunc: "ease-out",
    fucusAt: 'center',
    breakpoints: {
      1600: {
        perView: 3.2
      },
      1280: {
        perView: 2.6
      },
      1024: {
        perView: 2.1
      },
      992: {
        perView: 1.9
      },
      768: {
        perView: 1.5
      },
      640: {
        perView: 1.1
      }
    }
  };

  const ProductSlider = new Glide('.product__slider .glide', options1).mount();
  setTimeout(() => document.querySelector('.product').style = 'display:none', 50);

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
    console.log(value);
    accordion.style = `--i:${value + 34}px`;
  };

  window.addEventListener('resize', () => {
    setHeight();
  });

  setHeight();


})