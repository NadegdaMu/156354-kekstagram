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
  var setButtonStyle = function (event) {
    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
    }

    event.target.classList.add('img-filters__button--active');
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

  // популярные — фотографии в изначальном порядке.
  var popularClickHandler = window.utils.debounce(function (event) {

    var popular = window.photo.photosArray;
    setButtonStyle(event);
    reRenderUserPhotos(popular);
  });

  // новые — 10 случайных, не повторяющихся фотографий.
  var newClickHandler = window.utils.debounce(function (event) {

    var news = window.photo.photosArray.slice().sort(window.utils.shuffle).slice(0, 10);
    setButtonStyle(event);
    reRenderUserPhotos(news);
  });

  // обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
  var discussedClickHandler = window.utils.debounce(function (event) {
    var discussions = window.photo.photosArray.slice().sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    setButtonStyle(event);
    reRenderUserPhotos(discussions);
  });

  buttonPopular.addEventListener('click', popularClickHandler);
  buttonNew.addEventListener('click', newClickHandler);
  buttonDiscussed.addEventListener('click', discussedClickHandler);
})();
