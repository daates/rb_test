import './video-player.scss';
import html from './video-player.html';

function getIframeSrc(url) {
  if (/youtu\.?be/.test(url)) {
    const id = extractYouTubeId(url);
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }
  if (/vimeo\.com/.test(url)) {
    const id = extractVimeoId(url);
    if (!id) return null;
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }
  if (/rutube\.ru/.test(url)) {
    const id = extractRutubeId(url);
    if (!id) return null;
    return `https://rutube.ru/play/embed/${id}`;
  }
  if (/vkvideo\.ru\/video/.test(url)) {
    return url;
  }
  return null;
}

function extractYouTubeId(url) {
  if (url.includes('watch?v=')) {
    return url.split('watch?v=')[1].split('&')[0];
  }
  return url.split('/').pop();
}

function extractVimeoId(url) {
  return url.split('/').pop();
}

function extractRutubeId(url) {
  const match = url.match(/video\/([a-z0-9-]+)/i);
  return match ? match[1] : null;
}

export function createVideoPlayer(videoUrl) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  const videoPlayer = wrapper.firstElementChild;

  const preview = videoPlayer.querySelector('.video-player__preview');
  const button = videoPlayer.querySelector('.video-player__button');
  const iframe = videoPlayer.querySelector('.video-player__iframe');

  button.addEventListener('click', () => {
    const src = getIframeSrc(videoUrl);
    if (!src) {
      alert('Неподдерживаемый формат или ссылка');
      return;
    }
    preview.style.display = 'none';
    button.style.display = 'none';

    iframe.src = src;
    iframe.style.display = 'block';
  });

  return videoPlayer;
}

