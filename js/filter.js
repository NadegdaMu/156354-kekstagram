'use strict';
(function () {
  // при выборе эффекта к основной фотографии применяется класс соответствующего эффекта
  var imagePreview = document.querySelector('.img-upload__preview');
  var baseClassImagePreview = imagePreview.classList.item('.img-upload__preview');
  var slider = document.querySelector('.scale');
  var sliderLine = slider.querySelector('.scale__line');
  var sliderPin = slider.querySelector('.scale__pin');
  var sliderLevel = slider.querySelector('.scale__level');
  var sliderValue = document.querySelector('.scale__value');
  var MIN_LEVEL_SLIDER = 0;

  var generateEffects = function (element, effectname, defaultfilter) {
    var effect = document.querySelector('#effect-' + effectname);
    effect.addEventListener('click', function () {
      element.classList = [];
      element.style.filter = '';
      element.classList.add(baseClassImagePreview);
      element.classList.add('effects__preview--' + effectname);
      if (effect === 'none') {
        document.querySelector('.img-upload__scale').classList.add('visually-hidden');
      } else {
        sliderPin.style.left = '100%';
        sliderLevel.style.width = '100%';
        element.style.filter = defaultfilter;
      }
    });
    return true;
  };

  var effectsList = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
  var effectsDefStyle = ['', 'grayscale(1)', 'sepia(1)', 'invert(100)', 'blur(3)', 'brightness(3)'];

  for (var i = 0; i < effectsList.length; i++) {
    generateEffects(imagePreview, effectsList[i], effectsDefStyle[i]);
  }

  // функция интенсивности эффекта
  var step = null;
  var effectMethodsList = {
    'effects__preview--chrome': 1,
    'effects__preview--sepia': 1,
    'effects__preview--marvin': 100,
    'effects__preview--phobos': 3,
    'effects__preview--heat': 3
  };

  var generatesDepthEffect = function (sliderLevelEffect) {
    for (var key in effectMethodsList) {
      if (key === imagePreview.classList[1]) {
        applyingMethodsEffect(key, sliderLevelEffect);
        step = effectMethodsList[key] * sliderLevelEffect;
        break;
      }
    }
  };

  // функция генерирующая глубину эффекта
  var applyingMethodsEffect = function (filterName) {

    if (filterName === ('effects__preview--chrome')) {
      imagePreview.style.filter = 'grayscale(' + step + ')';
    } else if (filterName === ('effects__preview--sepia')) {
      imagePreview.style.filter = 'sepia(' + step + ')';
    } else if (filterName === ('effects__preview--marvin')) {
      imagePreview.style.filter = 'invert(' + step + '%)';
    } else if (filterName === ('effects__preview--phobos')) {
      imagePreview.style.filter = 'blur(' + step + 'px)';
    } else if (filterName === ('effects__preview--heat')) {
      imagePreview.style.filter = 'brightness(' + step + ')';
    }
  };

  // Получение координат для перемещения пина
  var movePin = function (evt) {
    var sliderLineCoords = sliderLine.getBoundingClientRect();
    var sliderLineLeft = sliderLineCoords.left;
    var sliderLineWidth = sliderLineCoords.width;
    var startCoords = evt.clientX;
    var sliderPinCoordX = startCoords - sliderLineLeft;
    var pinProportionValue = sliderPinCoordX / sliderLineWidth;

    if (sliderPinCoordX < MIN_LEVEL_SLIDER) {
      sliderPinCoordX = MIN_LEVEL_SLIDER;
    } else if (sliderPinCoordX > sliderLineWidth) {
      sliderPinCoordX = sliderLineWidth;
    }

    sliderPin.style.left = sliderPinCoordX + 'px';
    sliderLevel.style.width = sliderPin.style.left;
    sliderValue.value = parseInt(pinProportionValue * 100, 10);
    generatesDepthEffect(pinProportionValue);
  };

  /* События, при которых происходит перемещение */
  var onMouseDown = function () {
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      movePin(moveEvt);
    };

    var onMouseUp = function (upEvt) {
      movePin(upEvt);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  slider.addEventListener('mousedown', onMouseDown);
})();
