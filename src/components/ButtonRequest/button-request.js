import './button-request.scss';
import html from './button-request.html';
import { createRequestForm } from '../RequesForm/request-form'

export function createButtonRequest() {
  const template = document.createElement('template');
  template.innerHTML = html.trim();

  const button = template.content.firstElementChild;
  const form = createRequestForm();

  button.addEventListener('click', () => {
      form.open();
    });

  return button;
}
