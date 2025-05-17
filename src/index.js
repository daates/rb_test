import './styles/main.scss';
import data from './assets/data/cards.json'
import { createVideoPlayer } from './components/VideoPlayer/video-player';
import { createPtoductCards } from './components/ProductCards/product-cards'
import { initSliderForSection3 } from './components/ProductCards/slider/init-slider'

export function renderMainPage() {
  const app = document.querySelector('#app');
  const urlVideo = 'https://youtu.be/B9VRvOKKwfs?si=TFCC7pFdKWTDPDP6';

  const videoElement = createVideoPlayer(urlVideo);
  app.appendChild(videoElement);
  
  const productCards = createPtoductCards(data);
  app.appendChild(productCards);

  initSliderForSection3();
}


document.addEventListener('DOMContentLoaded', renderMainPage);