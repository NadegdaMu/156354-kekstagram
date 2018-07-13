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
  var setButtonStyle = function () {
    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
    }

    document.activeElement.classList.add('img-filters__button--active');
  };

  // перерисовка блока с фотографиями
  var reRenderUserPhotos = function (reRenderArray) {
    pictureBlock.innerHTML = '';
    pictureBlock.appendChild(pictureTitle);
    pictureBlock.appendChild(imgUpload);

    window.pictures(renderUserPhotos);
    setButtonStyle();
  };

  // Популярные — фотографии в изначальном порядке.
  var popularClickHandler = window.debounce(function () {

    var popular = window.photo.photosArray;
    reRenderPicture(popular);
  });

  // Новые — 10 случайных, не повторяющихся фотографий.
  var newClickHandler = window.debounce(function () {

    var news = [];

    var newsItems = window.utils.getRandomInRange(10, 0, window.photo.photosArray.length - 1);

    for (var i = 0; i < newsItems.length; i++) {
      news.push(window.photo.photosArray[newsItems[i]]);
    }

    reRenderPicture(news);
  });

  // Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
  var discussedClickHandler = window.debounce(function () {

    var discussions = window.photo.photosArray.slice().sort(function (less, more) {
      return more.comments.length - less.comments.length;
    });

    reRenderPicture(discussions);
  });

  buttonPopular.addEventListener('click', popularClickHandler);
  buttonNew.addEventListener('click', newClickHandler);
  buttonDiscussed.addEventListener('click', discussedClickHandler);
})();
