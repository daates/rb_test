import './card-item-vertical.scss';
import html from './card-item-vertical.html';
import { createButtonRequest } from '../../ButtonRequest/button-request'

export function createVerticalCard(data) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  const card = template.content.firstElementChild;

  card.querySelector('.card-item-vertical__title').textContent = data.title;

  card.querySelector('.card-item-vertical__price').textContent = data.price;

  card.style.setProperty('--bg-url', `url(${data.image})`);

  const button = createButtonRequest();
  card.querySelector('.card-item-vertical__footer').appendChild(button);

  data.badges.forEach(item => {
    const p = document.createElement('p');
    p.classList.add('card-item-vertical__bages');
    p.textContent = item.text;
    p.style.backgroundColor = item.color;
    card.querySelector('.card-item-vertical__stocks').appendChild(p);

  });

  return card;
}
