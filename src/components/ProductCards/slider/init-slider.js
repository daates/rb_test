let sliderInitialized = false;

export function initSliderForSection3() {
  const slider = document.querySelector('.section-3-tracker');
  if (!slider) return;

  const slides = slider.querySelectorAll('.card-item-vertical');
  if (!slides.length) return;

  let slideWidth = 0;
  let slideIndex = 0;
  let allowSwipe = true;
  let isSwipe = false;
  let isScroll = false;
  let transition = true;
  let posX1 = 0, posX2 = 0, posY1 = 0, posY2 = 0, posInit = 0, posFinal = 0;
  let swipeStartTime, swipeEndTime;
  let nextTrf = 0, prevTrf = 0, lastTrf = 0;
  let posThreshold = 0;

  const trfRegExp = /([-0-9.]+(?=px))/;

  const getEvent = () => (event.type.search('touch') !== -1 ? event.touches[0] : event);

  const setTransform = (transform, compareTransform) => {
    if (transform >= compareTransform && transform > compareTransform) {
      slider.style.transform = `translate3d(${compareTransform}px, 0px, 0px)`;
    }
    allowSwipe = false;
  };

  const slide = () => {
    if (transition) {
      slider.style.transition = 'transform .5s';
    }
    slider.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

    slides.forEach((slide, index) => {
        slide.classList.add('fade-slide');
        if (index === slideIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    const dots = document.querySelectorAll('#section-3-dots .dot');
        dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === slideIndex);
    });
  };

  const swipeStart = () => {
    let evt = getEvent();

    if (!allowSwipe) return;

    swipeStartTime = Date.now();
    transition = true;
    nextTrf = (slideIndex + 1) * -slideWidth;
    prevTrf = (slideIndex - 1) * -slideWidth;
    posInit = posX1 = evt.clientX;
    posY1 = evt.clientY;
    slider.style.transition = '';

    document.addEventListener('touchmove', swipeAction);
    document.addEventListener('mousemove', swipeAction);
    document.addEventListener('touchend', swipeEnd);
    document.addEventListener('mouseup', swipeEnd);

    slider.classList.remove('grab');
    slider.classList.add('grabbing');
  };

  const swipeAction = () => {
    let evt = getEvent(),
        style = slider.style.transform,
        transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;
    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    if (!isSwipe && !isScroll) {
      if (Math.abs(posY2) > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      if (slideIndex === 0 && posInit < posX1) {
        setTransform(transform, 0);
        return;
      }
      if (slideIndex === slides.length - 1 && posInit > posX1) {
        setTransform(transform, lastTrf);
        return;
      }
      if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
        transition = false;
        swipeEnd();
        allowSwipe = true;
        return;
      }

      slider.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }
  };

  const swipeEnd = () => {
    posFinal = posInit - posX1;
    isScroll = false;
    isSwipe = false;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    slider.classList.add('grab');
    slider.classList.remove('grabbing');

    if (!allowSwipe) {
      allowSwipe = true;
      return;
    }

    swipeEndTime = Date.now();
    if (Math.abs(posFinal) > posThreshold || swipeEndTime - swipeStartTime < 300) {
      if (posInit < posX1) slideIndex--;
      else if (posInit > posX1) slideIndex++;
    }

    if (posInit !== posX1) {
      allowSwipe = false;
      slide();
    }
  };

  const enableSlider = () => {
    if (sliderInitialized) return;
    sliderInitialized = true;

    slideIndex = 0;
    slideWidth = slides[0].offsetWidth;
    lastTrf = (slides.length - 1) * slideWidth;
    posThreshold = slideWidth * 0.35;

    slider.style.transform = 'translate3d(0px, 0px, 0px)';
    slider.classList.add('grab');
    slider.addEventListener('touchstart', swipeStart);
    slider.addEventListener('mousedown', swipeStart);
    slider.addEventListener('transitionend', () => allowSwipe = true);

    const dotsContainer = document.getElementById('section-3-dots');
    dotsContainer.innerHTML = ''; 

    for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);

    dot.addEventListener('click', () => {
        slideIndex = i;
        slide();
    });
}

  };

  const disableSlider = () => {
    if (!sliderInitialized) return;
    sliderInitialized = false;

    slider.removeEventListener('touchstart', swipeStart);
    slider.removeEventListener('mousedown', swipeStart);
    slider.style.transition = '';
    slider.style.transform = 'translate3d(0px, 0px, 0px)';
    slider.classList.remove('grab');
    slider.classList.remove('grabbing');

    slides.forEach((slide) => {
        slide.classList.remove('fade-slide');
        slide.classList.remove('active');
    });
  };

  const checkScreen = () => {
    if (window.innerWidth <= 768) {
      enableSlider();
    } else {
      disableSlider();
    }
  };

  checkScreen();

  window.addEventListener('resize', checkScreen);
}
