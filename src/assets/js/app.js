document.addEventListener('DOMContentLoaded', () => {

  const hamburgerBtn = document.querySelector('.hamburger');
  const header = document.querySelector('.header');
  const toggleMenu = function() {
    this.classList.toggle('is-active');
    header.classList.toggle('menu-open');
  }

  hamburgerBtn.addEventListener('click', toggleMenu);

})