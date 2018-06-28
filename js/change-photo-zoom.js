'use strict';
(function () {
// реализация прибавления и уменьшения масштаба фотографии
var maxValueResizeImg = 100;
var minValueResizeImg = 25;
var stepValueResizeImg = 25;
var imgUploadElement = document.querySelector('.img-upload__overlay');
var plusScale = imgUploadElement.querySelector('.resize__control--plus');
var minusScale = imgUploadElement.querySelector('.resize__control--minus');
var valueScale = imgUploadElement.querySelector('.resize__control--value');
var scaleValueNumber = parseInt(valueScale.value, 10);

function changesScaleStyle() {
  var styleScaleValue = scaleValueNumber / 100;
  window.imagePreview.style.transform = 'scale' + '(' + styleScaleValue + ')';
}

var onPlusClickHandler = function () {
  if (scaleValueNumber < maxValueResizeImg) {
    if (scaleValueNumber === maxValueResizeImg) {
      plusScale.setAttribute('disabled', true);
    }
    scaleValueNumber += stepValueResizeImg;
    valueScale.value = scaleValueNumber + '%';
    changesScaleStyle();
  }
};

var onMinusClickHandler = function () {
  if (scaleValueNumber > minValueResizeImg) {
    if (scaleValueNumber === minValueResizeImg) {
      minusScale.setAttribute('disabled', true);
    }
    scaleValueNumber -= stepValueResizeImg;
    valueScale.value = scaleValueNumber + '%';
    changesScaleStyle();
  }
};

plusScale.addEventListener('click', onPlusClickHandler);
minusScale.addEventListener('click', onMinusClickHandler);
})();