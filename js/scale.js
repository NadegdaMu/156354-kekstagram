'use strict';
(function () {
  var imagePreview = document.querySelector('.img-upload__preview');

  // реализация прибавления и уменьшения масштаба фотографии
  var RESIZE_MAX = 100;
  var RESIZE_MIN = 25;
  var RESIZE_STEP = 25;
  var imgUploadElement = document.querySelector('.img-upload__overlay');
  var plusScaleElement = imgUploadElement.querySelector('.resize__control--plus');
  var minusScaleElement = imgUploadElement.querySelector('.resize__control--minus');
  var valueScaleElement = imgUploadElement.querySelector('.resize__control--value');
  var scaleValueNumber = parseInt(valueScaleElement.value, 10);

  var changesScaleStyle = function () {
    var styleScaleValue = scaleValueNumber / 100;
    imagePreview.style.transform = 'scale' + '(' + styleScaleValue + ')';
  };

  var onPlusClickHandler = function () {
    if (scaleValueNumber < RESIZE_MAX) {
      if (scaleValueNumber === RESIZE_MAX) {
        plusScaleElement.setAttribute('disabled', true);
      }
      scaleValueNumber += RESIZE_STEP;
      valueScaleElement.value = scaleValueNumber + '%';
      changesScaleStyle();
    }
  };

  var onMinusClickHandler = function () {
    if (scaleValueNumber > RESIZE_MIN) {
      if (scaleValueNumber === RESIZE_MIN) {
        minusScaleElement.setAttribute('disabled', true);
      }
      scaleValueNumber -= RESIZE_STEP;
      valueScaleElement.value = scaleValueNumber + '%';
      changesScaleStyle();
    }
  };

  plusScaleElement.addEventListener('click', onPlusClickHandler);
  minusScaleElement.addEventListener('click', onMinusClickHandler);
})();
