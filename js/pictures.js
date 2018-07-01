'use strict';
(function () {
  var sameUserPhotoElement = document.querySelector('.pictures');
  var sameUserPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  // вызов заполнения массива объектов данных для фотографий
  var photos = window.photo.generateUserPhotos();
  // функция отрисовывающая фотографии
  var renderUserPhotos = function (photo) {
    var userPhotoElement = sameUserPhotoTemplate.cloneNode(true);
    userPhotoElement.querySelector('.picture__img').src = photo.url;
    userPhotoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    userPhotoElement.querySelector('.picture__stat--comments').textContent = photo.comments;
    return userPhotoElement;
  };
  var fragment = document.createDocumentFragment();
  photos.forEach(function (element) {
    fragment.appendChild(renderUserPhotos(element)); // вызов отрисовки фотографий
  });
  sameUserPhotoElement.appendChild(fragment);

  var bigPicture = document.querySelector('.big-picture');

  // заполнение данными большой фотографии данными
  bigPicture.querySelector('.big-picture__img').src = photos[0].url;
  bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
  bigPicture.querySelector('.comments-count').textContent = photos[0].comments;

  var listComments = document.querySelector('.social__comments');
  var comment = document.createDocumentFragment();
  var newElement = document.createElement('li');
  newElement.className = 'social__comment social__comment--text';
  var newElementImg = document.createElement('img');
  newElementImg.src = 'img/avatar-' + window.utils.getRandomInRange(1, 6) + '.svg';
  newElementImg.alt = 'Аватар комментатора фотографии';
  newElementImg.height = 35;
  newElementImg.width = 35;
  newElement.appendChild(newElementImg);
  newElement.insertAdjacentText = ('beforeend', 'текст комментария');
  comment.appendChild(newElement);
  listComments.appendChild(comment);

  bigPicture.querySelector('.social__caption').textContent = photos[0].description;
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__loadmore').classList.add('visually-hidden');
})();
