'use strict';
(function () {
  window.comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  window.description = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  // функция отрисовывающая фотографии
  var sameUserPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  window.userPhotos = [];
  window.renderUserPhotos = function (photo) {
    var userPhotoElement = sameUserPhotoTemplate.cloneNode(true);
    userPhotoElement.querySelector('.picture__img').src = photo.url;
    userPhotoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    userPhotoElement.querySelector('.picture__stat--comments').textContent = photo.comments;
    return userPhotoElement;
  };

  // функция, генерирующая userPhotos - массив фотографий пользователей
  window.generateUserPhotos = function () {
    for (var i = 0; i < 25; i++) {
      window.userPhotos[i] = {};
      window.userPhotos[i].url = 'photos/' + (i + 1) + '.jpg';
      window.userPhotos[i].likes = window.getRandomInRange(15, 200);
      window.userPhotos[i].comments = window.getRandomItem(window.comments);
      window.userPhotos[i].description = window.getRandomItem(window.description);
    }
  };
})();
