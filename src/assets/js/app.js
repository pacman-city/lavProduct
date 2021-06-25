document.addEventListener('DOMContentLoaded', () => {

  const hamburgerBtn = document.querySelector('.hamburger');
  const header = document.querySelector('.header');
  const toggleMenu = function() {
    this.classList.toggle('is-active');
    header.classList.toggle('menu-open');
  }

  hamburgerBtn.addEventListener('click', toggleMenu);

  ////////////////////////////////////////////////////////////////
  const accordionLinks = document.querySelectorAll('.faq__accordion li');

  const toggleAccordionLinks = function() {
    accordionLinks.forEach(link => (link === this) ? link.classList.add('open') : link.classList.remove('open'));
  }

  accordionLinks.forEach(link => link.addEventListener('click', toggleAccordionLinks));

})