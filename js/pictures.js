'use strict';

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var description = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

// функция возвращающая случайный елемент массива
var getRandomItem = function (array) {
  var randomIndex = array[Math.floor(Math.random() * (array.length))];
  return randomIndex;
};

// функция генерирующая целое число в диапазоне, включая минимальное и максимальное.
var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


var userPhotos = [];

// функция, генерирующая userPhotos - массив фотографий пользователей
var generateUserPhotos = function () {
  for (var i = 0; i < 25; i++) {
    userPhotos[i] = {};
    userPhotos[i].url = 'photos/' + (i + 1) + '.jpg';
    userPhotos[i].likes = getRandomInRange(15, 200);
    userPhotos[i].comments = getRandomItem(comments);
    userPhotos[i].description = getRandomItem(description);
  }
};
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

// вызов заполнения массива объектов данных для фотографий
generateUserPhotos();

var fragment = document.createDocumentFragment();
userPhotos.forEach(function (element) {
  fragment.appendChild(renderUserPhotos(element)); // вызов отрисовки фотографий
});
/* for (var i = 0; i < userPhotos.length; i++) {
  fragment.appendChild(renderUserPhotos(userPhotos[i]));
}; */
sameUserPhotoElement.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
// bigPicture.classList.remove('hidden'); делает большую фотографию видимой

// заполнение большой фотографии данными
bigPicture.querySelector('.big-picture__img').src = userPhotos[0].url;
bigPicture.querySelector('.likes-count').textContent = userPhotos[0].likes;
bigPicture.querySelector('.comments-count').textContent = userPhotos[0].comments;

var listComments = document.querySelector('.social__comments');
var comment = document.createDocumentFragment();
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
comment.appendChild(newElement);
listComments.appendChild(comment);

bigPicture.querySelector('.social__caption').textContent = userPhotos[0].description;
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__loadmore').classList.add('visually-hidden');

// взаимодействие с формой редактирования фотографии
var ESC_KEYCODE = 27;

var uploadImage = document.querySelector('.img-upload__overlay'); // поле редактирования фотографии
var uploadFile = document.querySelector('#upload-file'); // при наступлении события в поле загрузки файла, форма редоктирования фотографии становится доступным
uploadFile.addEventListener('change', function () {
  uploadImage.classList.remove('hidden');
});

// при клике на крестике поле убирается
var closeImageForm = document.querySelector('#upload-cancel');
closeImageForm.addEventListener('click', function () {
  uploadImage.classList.add('hidden');
  uploadFile.value = '';
});

// при нажатии кнопки ESC поле так же закрывается
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    uploadImage.classList.add('hidden');
    uploadFile.value = '';
  }
});

// при выборе эффекта к основной фотографии применяется класс соответствующего эффекта
var impagePreview = document.querySelector('.img-upload__preview');
var baseClassImagePreview = impagePreview.classList.item(0);

var generateEffects = function (element, effectname) {
  var effect = document.querySelector('#effect-' + effectname);
  effect.addEventListener('click', function () {
    element.classList = [];
    element.classList.add(baseClassImagePreview);
    element.classList.add('effects__preview--' + effectname);
  });
};

var effectsList = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

for (var i = 0; i < effectsList.length; i++) {
  generateEffects(impagePreview, effectsList[i]);
}

// var effectNone = document.querySelector('#effect-none');
// effectNone.addEventListener('click', function() {
//   impagePreview.classList = [];
//   impagePreview.classList.add(baseClassImagePreview);
//   impagePreview.classList.add('effects__preview--none');
// });

// var effectChrome = document.querySelector('#effect-chrome');
// effectChrome.addEventListener('click', function() {
//   impagePreview.classList = [];
//   impagePreview.classList.add(baseClassImagePreview);
//   impagePreview.classList.add('effects__preview--chrome');
// });

// var effectSepia = document.querySelector('#effect-sepia');
// effectSepia.addEventListener('click', function() {
//   impagePreview.classList = [];
//   impagePreview.classList.add(baseClassImagePreview);
//   impagePreview.classList.add('effects__preview--sepia');
// });

// var effectMarvin = document.querySelector('#effect-marvin');
// effectMarvin.addEventListener('click', function() {
//   impagePreview.classList = [];
//   impagePreview.classList.add(baseClassImagePreview);
//   impagePreview.classList.add('effects__preview--marvin');
// });

// var effectPhobos = document.querySelector('#effect-phobos');
// effectPhobos.addEventListener('click', function() {
//   impagePreview.classList = [];
//   impagePreview.classList.add(baseClassImagePreview);
//   impagePreview.classList.add('effects__preview--phobos');
// });

// var effectHeat = document.querySelector('#effect-heat');
// effectHeat.addEventListener('click', function() {
//   impagePreview.classList = [];
//   impagePreview.classList.add(baseClassImagePreview);
//   impagePreview.classList.add('effects__preview--heat');
// });
