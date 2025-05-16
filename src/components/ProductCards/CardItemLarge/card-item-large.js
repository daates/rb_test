import './card-item-large.scss';
import html from './card-item-large.html';
import { createButtonRequest } from '../../ButtonRequest/button-request'

export function createLargeCard(data) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  const card = template.content.firstElementChild;

  if (data.smallHeight) {
    card.classList.add('card-item-large--small');
  }

  card.querySelector('.card-item-large__title').textContent = data.title;

  card.querySelector('.card-item-large__price').textContent = data.price;

  card.style.backgroundImage = `url(${data.image})`;

  const button = createButtonRequest();
  card.querySelector('.card-item-large__footer-right').appendChild(button);

  data.badges.forEach(item => {
    const p = document.createElement('p');
    p.classList.add('card-item-large__bages');
    p.textContent = item.text;
    p.style.backgroundColor = item.color;
    card.querySelector('.card-item-large__stocks').appendChild(p);

  });

  return card;
}
