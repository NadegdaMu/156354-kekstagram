'use strict';
(function () {
  var sameUserPhotoElement = document.querySelector('.pictures');


  // вызов заполнения массива объектов данных для фотографий
  window.generateUserPhotos();

  var fragment = document.createDocumentFragment();
  window.userPhotos.forEach(function (element) {
    fragment.appendChild(window.renderUserPhotos(element)); // вызов отрисовки фотографий
  });
  sameUserPhotoElement.appendChild(fragment);

  var bigPicture = document.querySelector('.big-picture');

  // заполнение данными большой фотографии данными
  bigPicture.querySelector('.big-picture__img').src = window.userPhotos[0].url;
  bigPicture.querySelector('.likes-count').textContent = window.userPhotos[0].likes;
  bigPicture.querySelector('.comments-count').textContent = window.userPhotos[0].comments;

  var listComments = document.querySelector('.social__comments');
  var comment = document.createDocumentFragment();
  var newElement = document.createElement('li');
  newElement.className = 'social__comment social__comment--text';
  var newElementImg = document.createElement('img');
  newElementImg.src = 'img/avatar-' + window.getRandomInRange(1, 6) + '.svg';
  newElementImg.alt = 'Аватар комментатора фотографии';
  newElementImg.height = 35;
  newElementImg.width = 35;
  newElement.appendChild(newElementImg);
  newElement.insertAdjacentText = ('beforeend', 'текст комментария');
  comment.appendChild(newElement);
  listComments.appendChild(comment);

  bigPicture.querySelector('.social__caption').textContent = window.userPhotos[0].description;
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__loadmore').classList.add('visually-hidden');
})();
