'use strict';

(function () {
  var pictureBlock = document.querySelector('.pictures');
  var pictureTitle = document.querySelector('.pictures__title');
  var imgUpload = document.querySelector('.img-upload');

  var buttonPopular = document.querySelector('#filter-popular');
  var buttonNew = document.querySelector('#filter-new');
  var buttonDiscussed = document.querySelector('#filter-discussed');
  var filterButtons = document.querySelectorAll('.img-filters__button');

  // стили для кнопок
  var setButtonStyle = function (evt) {
    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
    }

    evt.target.classList.add('img-filters__button--active');
  };

  // перерисовка блока с фотографиями
  var reRenderUserPhotos = function (reRenderArray) {
    pictureBlock.innerHTML = '';
    pictureBlock.appendChild(pictureTitle);
    pictureBlock.appendChild(imgUpload);

    for (var i = 0; i < reRenderArray.length; i++) {
      pictureBlock.appendChild(window.renderUserPhotos(reRenderArray[i]));
    }

  };

  // Популярные — фотографии в изначальном порядке.
  var popularClickHandler = window.debounce(function (evt) {

    var popular = window.photo.photosArray;
    setButtonStyle(evt);
    reRenderUserPhotos(popular);
  });

  // Новые — 10 случайных, не повторяющихся фотографий.
  var newClickHandler = window.debounce(function (evt) {

    var news = window.photo.photosArray.slice().sort(window.utils.shuffle).slice(0, 10);
    setButtonStyle(evt);
    reRenderUserPhotos(news);
  });

  // Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
  var discussedClickHandler = window.debounce(function (evt) {
    var discussions = window.photo.photosArray.slice().sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    setButtonStyle(evt);
    reRenderUserPhotos(discussions);
  });

  buttonPopular.addEventListener('click', popularClickHandler);
  buttonNew.addEventListener('click', newClickHandler);
  buttonDiscussed.addEventListener('click', discussedClickHandler);
})();
