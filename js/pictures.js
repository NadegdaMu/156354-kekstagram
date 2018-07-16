'use strict';
(function () {
  var sameUserPhotoElement = document.querySelector('.pictures');
  var sameUserPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var bigPicture = document.querySelector('.big-picture');


  // функция отрисовывающая фотографии
  window.renderUserPhotos = function (photo) {
    var startShowCommentsFrom = 0;
    var showMore = function () {
      startShowCommentsFrom = startShowCommentsFrom + 5;
      showComments(startShowCommentsFrom);
    };

    var showComments = function (start) {
      var commentBlock = document.querySelector('.social__comments');
      var end = 0;
      if (start + 5 > photo.comments.length) {
        end = photo.comments.length;
        bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
      } else {
        end = start + 5;
      }

      document.querySelector('.social__comment-count').firstChild.nodeValue = end + ' из ';

      for (var i = start; i < end; i++) {
        var itemList = document.createElement('li');
        itemList.classList.add('social__comment');
        var imgAvatar = document.createElement('img');
        imgAvatar.src = 'img/avatar-' + window.utils.getRandomInRange(1, 5) + '.svg';
        imgAvatar.classList.add('social__picture');
        imgAvatar.width = 35;
        imgAvatar.height = 35;
        var comment = document.createElement('p');
        comment.classList.add('social__text');
        comment.innerHTML = photo.comments[i];
        itemList.appendChild(imgAvatar);
        itemList.appendChild(comment);
        commentBlock.appendChild(itemList);
      }
    };

    var showBigPicture = function () {
      bigPicture.querySelector('.big-picture__title').classList.remove('visually-hidden');
      bigPicture.querySelector('.social__comment-count').classList.remove('visually-hidden');
      bigPicture.querySelector('.big-picture__img img').src = photo.url;
      bigPicture.querySelector('.likes-count').innerHTML = photo.likes;

      if (photo.comments.length > 5) {

        bigPicture.querySelector('.social__loadmore').classList.remove('visually-hidden');
      }

      bigPicture.querySelector('.comments-count').innerHTML = photo.comments.length;

      if (startShowCommentsFrom === 0) {
        document.querySelector('.social__comments').innerHTML = '';
        showComments(startShowCommentsFrom);
      }
      bigPicture.querySelector('.social__loadmore').addEventListener('click', showMore);
      bigPicture.querySelector('.social__picture').src = 'img/avatar-' + window.utils.getRandomInRange(1, 5) + '.svg';
      bigPicture.querySelector('.social__caption').innerHTML = window.utils.getRandomItem(window.photo.description);
      document.body.classList.add('modal-open');
      bigPicture.classList.remove('hidden');
    };

    var resetToDefault = function () {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
      bigPicture.querySelector('.big-picture__title').classList.add('visually-hidden');
      bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
      bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
      startShowCommentsFrom = 0;
      bigPicture.querySelector('.social__loadmore').removeEventListener('click', showMore);
    };

    var closeBigPicture = document.querySelector('#picture-cancel');

    closeBigPicture.addEventListener('click', resetToDefault);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        resetToDefault();
      }
    });

    var userPhotoElement = sameUserPhotoTemplate.cloneNode(true);
    userPhotoElement.querySelector('.picture__img').src = photo.url;
    userPhotoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    userPhotoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    userPhotoElement.addEventListener('click', showBigPicture);
    return userPhotoElement;
  };

  var successHandler = function (serverdata) {
    var fragment = document.createDocumentFragment();
    window.photo.photosArray = serverdata.slice();
    serverdata.forEach(function (element) {
      fragment.appendChild(window.renderUserPhotos(element)); // вызов отрисовки фотографий
    });
    sameUserPhotoElement.appendChild(fragment);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    document.querySelector('.img-filters__title').classList.remove('visually-hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error__message');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // заполнение данными большой фотографии


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
