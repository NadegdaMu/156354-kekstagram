'use strict';
(function () {
  var sameUserPhotoElement = document.querySelector('.pictures');
  var sameUserPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var bigPicture = document.querySelector('.big-picture');

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
    var firstBigPicture = data.shift();
    data.forEach(function (element) {
      fragment.appendChild(renderUserPhotos(element)); // вызов отрисовки фотографий
    })
    sameUserPhotoElement.appendChild(fragment);
    bigPicture.querySelector('.big-picture__img').src = firstBigPicture.url;
    bigPicture.querySelector('.likes-count').textContent = firstBigPicture.likes;
    bigPicture.querySelector('.comments-count').textContent = firstBigPicture.comments;
    bigPicture.querySelector('.social__caption').textContent = firstBigPicture.description;

  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; width: 600px; margin-top: 300px; margin-left: 335px; text-align: center; background-color: #6cdc09;';
    node.style.position = 'absolute';
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // заполнение данными большой фотографии данными


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


  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__loadmore').classList.add('visually-hidden');

  window.backend.loadData(successHandler, errorHandler);
})();
