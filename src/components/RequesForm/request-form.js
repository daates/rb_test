import './request-form.scss';
import html from './request-form.html';

export function createRequestForm() {
  let popupOverlay = null;
  let popup = null;

  function open() {
    if (popupOverlay) return;

    popupOverlay = document.createElement('div');
    popupOverlay.className = 'popup-overlay';

    popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = html;

    popupOverlay.appendChild(popup);
    document.body.appendChild(popupOverlay);
    document.body.style.overflow = 'hidden';

    const closeBtn = popup.querySelector('.popup__close');
    const form = popup.querySelector('form');
    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const checkbox = form.querySelector('input[name="agree"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    const nameError = nameInput.nextElementSibling;
    const phoneError = phoneInput.nextElementSibling;

    closeBtn.addEventListener('click', close);
    popupOverlay.addEventListener('click', e => {
      if (e.target === popupOverlay) close();
    });

    function validateName() {
      const value = nameInput.value.trim();
      const isValid = /^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(value);
      nameInput.classList.toggle('input--invalid', !isValid);
      nameError.style.display = isValid ? 'none' : 'block';
      return isValid;
    }

    function validatePhone() {
      let val = phoneInput.value.replace(/[^\d+]/g, '');
      if (!val.startsWith('+7')) val = '+7' + val.replace(/^(\+)?/, '');
      if (val.length > 12) val = val.slice(0, 12);
      phoneInput.value = val;

      const isValid = /^\+7\d{10}$/.test(val);
      phoneInput.classList.toggle('input--invalid', !isValid);
      phoneError.style.display = isValid ? 'none' : 'block';
      return isValid;
    }

    phoneInput.addEventListener('focus', () => {
      if (!phoneInput.value.startsWith('+7')) {
        phoneInput.value = '+7';
        setTimeout(() => {
          phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
        });
      }
    });

    phoneInput.addEventListener('keydown', e => {
      if (phoneInput.selectionStart <= 2 && (e.key === 'Backspace' || e.key === 'Delete')) {
        e.preventDefault();
      }
    });

    function updateSubmitState() {
      const isValid = validateName() && validatePhone() && checkbox.checked;
      submitBtn.disabled = !isValid;
    }

    nameInput.addEventListener('input', () => {
      validateName();
      updateSubmitState();
    });

    phoneInput.addEventListener('input', () => {
      validatePhone();
      updateSubmitState();
    });

    checkbox.addEventListener('change', updateSubmitState);

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (validateName() && validatePhone() && checkbox.checked) {
        alert('Форма успешно отправлена!');
        close();
      }
    });
  }

  function close() {
    if (!popupOverlay) return;
    document.body.removeChild(popupOverlay);
    document.body.style.overflow = '';
    popupOverlay = null;
  }

  return { open, close };
}
