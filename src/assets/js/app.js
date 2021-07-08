import Glide from '@glidejs/glide';
// import customSelect from 'custom-select';
// https://github.com/custom-select/custom-select

import Modal from './modules/modal';


document.addEventListener('DOMContentLoaded', () => {

  const hamburgerBtn = document.querySelector('.hamburger');
  const header = document.querySelector('.header');
  const toggleMenu = function() {
    this.classList.toggle('active');
    header.classList.toggle('menu-open');
  }
  hamburgerBtn.addEventListener('click', toggleMenu);

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
    animationDuration: 700,
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



})