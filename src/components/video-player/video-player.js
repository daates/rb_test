import './video-player.scss';
import html from './video-player.html';

export function createVideoPlayer() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  return wrapper.firstElementChild;
}