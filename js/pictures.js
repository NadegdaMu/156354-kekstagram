'use strict';

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var description = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];

// функция возвращающая случайный елемент массива
var getRandomItem = function (array) {
  var randomIndex = array[Math.floor(Math.random() * (array.length))];
  return randomIndex;
};
// функция генерирующая целое число в диапазоне, включая минимальное и максимальное.
var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// функция, генерирующая массив фотографий пользователей
var generateUserPhotos = function () {
  var userPhotos = [];
  // цикл собирающий массив из 25 объектов
  for (var i = 0; i < 25; i++) {
    userPhotos[i] = {};
    userPhotos[i].url = 'photos/' + (i + 1) + '.jpg';
    userPhotos[i].likes = getRandomInRange(15, 200);
    userPhotos[i].comments = getRandomItem(comments);
    userPhotos[i].description = getRandomItem(description);
  }
  return userPhotos;
};
var sameUserPhotoElement = document.querySelector('.pictures');
var sameUserPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
var userPhotos = generateUserPhotos();

var renderUserPhotos = function (Photos) {
  var userPhotoElement = sameUserPhotoTemplate.cloneNode(true);
  userPhotoElement.querySelector('.picture__img').src = Photos.url;
  userPhotoElement.querySelector('.picture__stat--likes').textContent = Photos.likes;
  userPhotoElement.querySelector('.picture__stat--comments').textContent = Photos.comments;
  return userPhotoElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < userPhotos.length; i++) {
  fragment.appendChild(renderUserPhotos(userPhotos[i]));
}
sameUserPhotoElement.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
bigPicture.querySelector('.big-picture__img').src = userPhotos[0].url;
bigPicture.querySelector('.likes-count').textContent = userPhotos[0].likes;
bigPicture.querySelector('.comments-count').textContent = userPhotos[0].comments;
var comentsUl = document.querySelector('.social__comments');
var fragmentLi = document.createDocumentFragment();
var numberComments = 2;

for (var j = 0; j < numberComments; j++) {
  var newElement = document.createElement('li');
  newElement.className = 'social__comment social__comment--text';
  var newElementImg = document.createElement('img');
  newElementImg.src = 'img/avatar-' + getRandomInRange(1, 6) + '.svg';
  newElementImg.alt = 'Аватар комментатора фотографии';
  newElementImg.height = 35;
  newElementImg.width = 35;
  newElement.appendChild(newElementImg);
  // newElement.innerHTML = '<img class="social__picture" src="img/avatar-' + getRandomInRange(15, 200) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">';
  newElement.insertAdjacentText = ('beforeend', 'текст комментария');
  fragmentLi.appendChild(newElement);
}
comentsUl.appendChild(fragmentLi);
bigPicture.querySelector('.social__caption').textContent = userPhotos[0].description;
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__loadmore').classList.add('visually-hidden');
