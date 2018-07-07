'use strict';
(function () {
  var sameUserPhotoElement = document.querySelector('.pictures');
  var sameUserPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  // функция отрисовывающая фотографии
  var renderUserPhotos = function (photo) {
    var userPhotoElement = sameUserPhotoTemplate.cloneNode(true);
    userPhotoElement.querySelector('.picture__img').src = photo.url;
    userPhotoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    userPhotoElement.querySelector('.picture__stat--comments').textContent = photo.comments;
    return userPhotoElement;
  };
  var successHandler = function (data) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (element) {
      fragment.appendChild(renderUserPhotos(element)); // вызов отрисовки фотографий
    })
    sameUserPhotoElement.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // заполнение данными большой фотографии данными
  var bigPicture = document.querySelector('.big-picture');
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

  window.load(successHandler, errorHandler);
})();
