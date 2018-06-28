'use strict';
(function () {
  // при выборе эффекта к основной фотографии применяется класс соответствующего эффекта
  window.imagePreview = document.querySelector('.img-upload__preview');
  var baseClassImagePreview = window.imagePreview.classList.item(0);

  var generateEffects = function (element, effectname, defaultfilter) {
    var effect = document.querySelector('#effect-' + effectname);
    effect.addEventListener('click', function () {
      if (effect === 'none') {
        element.classList = [];
        element.style.filter = '';
        element.classList.add(baseClassImagePreview);
        element.classList.add('effects__preview--' + effectname);
        document.querySelector('.scale__line').classList.add('visually-hidden');
      } else {
        element.classList = [];
        element.style.filter = '';
        element.classList.add(baseClassImagePreview);
        element.classList.add('effects__preview--' + effectname);
        sliderElement.style.left = '100%';
        sliderLevel.style.width = '100%';
        element.style.filter = defaultfilter;
      }
    });
    return true;
  };

  var effectsList = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
  var effectsDefStyle = ['', 'grayscale(1)', 'sepia(1)', 'invert(100)', 'blur(3)', 'brightness(3)'];

  for (var i = 0; i < effectsList.length; i++) {
    generateEffects(window.imagePreview, effectsList[i], effectsDefStyle[i]);
  }

  // функция интенсивности эффекта
  var step = null;
  var effectMethodsList =
  {
    'effects__preview--chrome': 1,
    'effects__preview--sepia': 1,
    'effects__preview--marvin': 100,
    'effects__preview--phobos': 3,
    'effects__preview--heat': 3
  };

  var generatesDepthEffect = function (sliderLevel) {
    for (var key in effectMethodsList) {
      if (key === window.imagePreview.classList[1]) {
        applyingMethodsEffect(key, sliderLevel);
        step = effectMethodsList[key] * sliderLevel;
        break;
      }
    }
  };

  // функция генерирующая глубину эффекта
  var applyingMethodsEffect = function (filterName) {

    if (filterName === ('effects__preview--chrome')) {
      window.imagePreview.style.filter = 'grayscale(' + step + ')';
    } else if (filterName === ('effects__preview--sepia')) {
      window.imagePreview.style.filter = 'sepia(' + step + ')';
    } else if (filterName === ('effects__preview--marvin')) {
      window.imagePreview.style.filter = 'invert(' + step + '%)';
    } else if (filterName === ('effects__preview--phobos')) {
      window.imagePreview.style.filter = 'blur(' + step + 'px)';
    } else if (filterName === ('effects__preview--heat')) {
      window.imagePreview.style.filter = 'brightness(' + step + ')';
    }
  };


  // реализация ползунка эффектов
  var startSlideX = 400;
  var sliderElement = document.querySelector('.scale__pin');
  var sliderLine = document.querySelector('.scale__line');
  var sliderLevel = document.querySelector('.scale__level');
  var sliderValue = document.querySelector('.scale__value');

  sliderLine.addEventListener('mousedown', startSlide, false);
  sliderLine.addEventListener('mouseup', stopSlide, false);

  function startSlide(event) {
    var setPerc = ((((event.clientX - startSlideX) / sliderLine.offsetWidth)));
    sliderLine.addEventListener('mousemove', moveSlide, false);
    sliderElement.style.left = (setPerc * 100) + '%';
    sliderLevel.style.width = (setPerc * 100) + '%';
    sliderValue.value = parseInt(setPerc * 100, 10);
    generatesDepthEffect(setPerc);
  }

  function moveSlide(event) {
    var setPerc = ((((event.clientX - startSlideX) / sliderLine.offsetWidth)));
    if (setPerc > 1 || setPerc < 0) {
      stopSlide(event);
    }
    sliderElement.style.left = (setPerc * 100) + '%';
    sliderLevel.style.width = (setPerc * 100) + '%';
    sliderValue.value = parseInt(setPerc * 100, 10);
    generatesDepthEffect(setPerc);
  }

  function stopSlide(event) {
    var setPerc = ((((event.clientX - startSlideX) / sliderLine.offsetWidth)));
    sliderLine.removeEventListener('mousemove', moveSlide, false);
    sliderElement.style.left = (setPerc * 100) + '%';
    sliderLevel.style.width = (setPerc * 100) + '%';
    sliderValue.value = parseInt(setPerc * 100, 10);
    generatesDepthEffect(setPerc);
  }
})();
