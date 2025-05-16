import './product-cards.scss'
import { createLargeCard } from "./CardItemLarge/card-item-large"
import { createVerticalCard } from "./CardItemVertical/card-item-vertical"
import html from "./product-cards.html"

export function createPtoductCards(data) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  const container = template.content.firstElementChild;

  const section1 = container.querySelector('.product-cards__section-1');
  const section2 = container.querySelector('.product-cards__section-2');
  const section3 = container.querySelector('.product-cards__section-3');

  data.forEach(card => {
    let cardElement;

    switch (card.type) {
      case "large":
        cardElement = createLargeCard(card);
        break;
      case 'vertical':
        cardElement = createVerticalCard(card);
        break;
      default:
        return;
    }

    if (card.section === "1") section1.appendChild(cardElement);
    else if (card.section === "2") section2.appendChild(cardElement);
    else if (card.section === "3") section3.appendChild(cardElement);
  });

  return container;
}