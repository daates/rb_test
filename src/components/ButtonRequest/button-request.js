import './button-request.scss';
import html from './button-request.html';

export function createButtonRequest() {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}
