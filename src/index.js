import './styles/main.scss';
import { createVideoPlayer } from './components/video-player/video-player';

export function renderMainPage() {
  const app = document.querySelector('#app');
  const urlVideo = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  const videoElement = createVideoPlayer(urlVideo);
  app.appendChild(videoElement);
}


document.addEventListener('DOMContentLoaded', renderMainPage);