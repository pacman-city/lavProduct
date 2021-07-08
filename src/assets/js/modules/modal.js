import axios from 'axios';
// // https://github.com/custom-select/custom-select
// import customSelect from 'custom-select';
// https://www.npmjs.com/package/focus-trap
import * as focusTrap from 'focus-trap'


class Modal {
  constructor(selectors) {
    this.tanksModal = document.querySelector('[data-modal-thanks]');
    this.errorModal = document.querySelector('[data-modal-error]');
    this.closeBtns = document.querySelectorAll('[data-close]');
    this.forms = document.querySelectorAll('form');
    this.allModals = this.getModals(selectors);

    this.trap = focusTrap.createFocusTrap(this.allModals);

    this.selectsContainer = document.querySelector('.modal-order__flavours');
    this.image = document.querySelector('.modal-order__item img');
    this.orderItem = document.querySelector('.modal-order__item');

    // binding:
    this.onOverlay = this.onOverlay.bind(this);
    this.onKeyboard = this.onKeyboard.bind(this);
    this.closeModal = this.closeModal.bind(this);

    // Open modal:
    selectors.forEach(item => {
      for (let btn of document.querySelectorAll(`[data-${item}]`)) {
        btn.addEventListener('click', () => {
          document.querySelector(`[data-modal-${item}]`).classList.add('open');
          this.trap.activate();
          document.body.style.overflow = 'hidden';
        });
      }
    });

    this.closeBtns.forEach(item => item.addEventListener('click', this.closeModal));
    document.addEventListener('keydown', this.onKeyboard);
    this.allModals.forEach(item => item.addEventListener('click', this.onOverlay));
    this.forms.forEach(item => this.bindPostData(item));

    // focus management - select (form - choose):
    const chooseOptions = document.querySelectorAll('.choose .custom-select-option');
    chooseOptions.forEach(item => item.setAttribute('tabindex', 0));
    chooseOptions.forEach(item => item.addEventListener('focus', function() {
      this.classList.add('choose-selected');
    }));
    chooseOptions.forEach(item => item.addEventListener('blur', function() {
      this.classList.remove('choose-selected');
    }));
  }

  onKeyboard(e) {
    e.code === 'Escape' && this.closeModal();
  }

  onOverlay(e) {
    (!e.target.closest('.modal__container')) && this.closeModal();
  }

  getModals(selectors) {
    let items = [];
    selectors.forEach(item => {
      const element = document.querySelector(`[data-modal-${item}]`);
      element && items.push(element);
    });
    return items;
  }

  bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      if (e.target.className === 'cattering') {
        const selected = document.querySelector('#cattering-select').value || 'not selected';
        const time = document.querySelector('input[type="range"]').value;
        formData.append('hookah quantity', selected);
        formData.append('event duration', `${time} hours`);
      }

      form.reset();
      document.body.style.cursor = "wait";
      axios.post("./mail.php", formData)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.closeModal();
            this.tanksModal.classList.add('open');
            this.trap.activate();
            document.body.style.overflow = 'hidden';
          } else {
            this.closeModal();
            this.errorModal.classList.add('open');
            this.trap.activate();
            document.body.style.overflow = 'hidden';
          }
        })
        .catch(error => {
          this.closeModal();
          console.log(error);
          this.errorModal.classList.add('open');
          this.trap.activate();
          document.body.style.overflow = 'hidden';
        });
    });
  }

  closeModal() {
    document.body.style.overflow = '';
    document.body.style.cursor = "";
    this.allModals.forEach(item => (item) && item.classList.remove('open'));
    this.trap.deactivate();
  }
}

export default Modal;