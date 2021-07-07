document.addEventListener('DOMContentLoaded', () => {

  const hamburgerBtn = document.querySelector('.hamburger');
  const header = document.querySelector('.header');
  const toggleMenu = function() {
    this.classList.toggle('active');
    header.classList.toggle('menu-open');
  }
  hamburgerBtn.addEventListener('click', toggleMenu);

  ////////////////////////////////////////////////////////////////
  const accordionLinks = document.querySelectorAll('.faq__accordion li');

  const toggleAccordionLinks = function() {
    accordionLinks.forEach(link => (link === this) ? link.classList.add('open') : link.classList.remove('open'));
  }

  accordionLinks.forEach(link => link.addEventListener('click', toggleAccordionLinks));










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









})