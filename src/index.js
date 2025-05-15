import './styles/main.scss';
import { createVideoPlayer } from './components/video-player/video-player';
//import { createProductCard } from './components/product-card/product-card';

export function renderMainPage() {
  const app = document.querySelector('#app');
if (!app) {
    console.error("Элемент с id 'cards' не найден в DOM");
    return;
  }
  app.appendChild(createVideoPlayer());

//   const cardContainer = document.createElement('div');
//   cardContainer.classList.add('card-section');

//   const products = [
//     { title: 'Горошек стручковый, 1 кг', price: '570 ₽', label: 'Товар дня', discount: '-20%', tagColor: 'orange', image: 'peas.jpg' },
//     { title: 'Голубика лесная, 200 г', price: '140 ₽', label: 'Распродажа', discount: '-31%', tagColor: 'purple', image: 'blueberry.jpg' },
//   ];

//   products.forEach(product => {
//     const card = createProductCard(product);
//     cardContainer.appendChild(card);
//   });

//   app.appendChild(cardContainer);
}


document.addEventListener('DOMContentLoaded', renderMainPage);