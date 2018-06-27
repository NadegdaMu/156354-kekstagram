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
    if (evt.target.className !== 'text__hashtags' || evt.target.className !== 'text__description') {
      uploadImage.classList.add('hidden');
      uploadFile.value = '';
    }
  }
});

// при выборе эффекта к основной фотографии применяется класс соответствующего эффекта
var imagePreview = document.querySelector('.img-upload__preview');
var baseClassImagePreview = imagePreview.classList.item(0);

var generateEffects = function (element, effectname, defaultfilter) {
  var effect = document.querySelector('#effect-' + effectname);
  effect.addEventListener('click', function () {
    if (effect === 'none') {
      element.classList = [];
      element.style.filter = '';
      element.classList.add(baseClassImagePreview);
      element.classList.add('effects__preview--' + effectname);
      document.querySelector('.scale__line').classList.add('visually-hidden');
    } else {
      element.classList = [];
      element.style.filter = '';
      element.classList.add(baseClassImagePreview);
      element.classList.add('effects__preview--' + effectname);
      sliderElement.style.left = '100%';
      sliderLevel.style.width = '100%';
      element.style.filter = defaultfilter;
    }
  });
  return true;
};

var effectsList = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
var effectsDefStyle = ['', 'grayscale(1)', 'sepia(1)', 'invert(100)', 'blur(3)', 'brightness(3)'];

for (var i = 0; i < effectsList.length; i++) {
  generateEffects(imagePreview, effectsList[i], effectsDefStyle[i]);
}

// валидация хеш-тегов
var hashtags = document.querySelector('.text__hashtags');

var validationHashtag = function (hashtagElement) {

  if (!hashtagElement.startsWith('#')) {
    hashtags.setCustomValidity('Сообщение должно начинаться со знака #');
    return false;
  } else if (hashtagElement.lastIndexOf('#') !== 0) {
    hashtags.setCustomValidity('нет пробела');
    return false;
  } else {
    hashtags.setCustomValidity('');
  }

  if (hashtagElement.length < 2 || hashtagElement.length > 21) {
    hashtags.setCustomValidity('Сообщение должно содержать больше одного и меньше 20 букв');
    return false;
  } else {
    hashtags.setCustomValidity('');
    return true;
  }
};

var validationHashtagsArray = function (array) {
  if (array.length > 5) {
    hashtags.setCustomValidity('Сообщение не может содержать больше 5 записей');
    return false;
  } else {
    hashtags.setCustomValidity('');
  }

  var element = '';
  var sameArray = [];
  var test = false;
  for (var l = 0; l < array.length; l++) {
    sameArray[l] = array[l].toLowerCase();
  }
  while (sameArray.length) {
    element = sameArray.shift();
    if (sameArray.includes(element) === true) {
      hashtags.setCustomValidity('Все заметки должны быть разными');
      test = false;
      break;
    } else {
      test = true;
      hashtags.setCustomValidity('');
    }
  }
  return test;
};


// валидация формы
var form = document.querySelector('.img-upload__form');

hashtags.addEventListener('input', function () {
  var hashtagstring = hashtags.value;
  var hashtagsArray = hashtagstring.split(' ');
  if (validationHashtagsArray(hashtagsArray)) {
    for (var s = 0; s < hashtagsArray.length; s++) {
      validationHashtag(hashtagsArray[s]);
    }
  }
});


form.addEventListener('submit', function (e) {
  if (!form.checkValidity()) {
    e.preventDefault();
    return false;
  }

  return true;
});


// реализация прибавления и уменьшения масштаба фотографии
var maxValueResizeImg = 100;
var minValueResizeImg = 25;
var stepValueResizeImg = 25;
var imgUploadElement = document.querySelector('.img-upload__overlay');
var plusScale = imgUploadElement.querySelector('.resize__control--plus');
var minusScale = imgUploadElement.querySelector('.resize__control--minus');
var valueScale = imgUploadElement.querySelector('.resize__control--value');
var scaleValueNumber = parseInt(valueScale.value, 10);

function changesScaleStyle() {
  var styleScaleValue = scaleValueNumber / 100;
  imagePreview.style.transform = 'scale' + '(' + styleScaleValue + ')';
}

var onPlusClickHandler = function () {
  if (scaleValueNumber < maxValueResizeImg) {
    if (scaleValueNumber === maxValueResizeImg) {
      plusScale.setAttribute('disabled', true);
    }
    scaleValueNumber += stepValueResizeImg;
    valueScale.value = scaleValueNumber + '%';
    changesScaleStyle();
  }
};

var onMinusClickHandler = function () {
  if (scaleValueNumber > minValueResizeImg) {
    if (scaleValueNumber === minValueResizeImg) {
      minusScale.setAttribute('disabled', true);
    }
    scaleValueNumber -= stepValueResizeImg;
    valueScale.value = scaleValueNumber + '%';
    changesScaleStyle();
  }
};

plusScale.addEventListener('click', onPlusClickHandler);
minusScale.addEventListener('click', onMinusClickHandler);

// функция интенсивности эффекта
var step = null;
var effectMethodsList =
{
  'effects__preview--chrome': 1,
  'effects__preview--sepia': 1,
  'effects__preview--marvin': 100,
  'effects__preview--phobos': 3,
  'effects__preview--heat': 3
};

var generatesDepthEffect = function (sliderLevel) {
  for (var key in effectMethodsList) {
    if (key === imagePreview.classList[1]) {
      applyingMethodsEffect(key, sliderLevel);
      step = effectMethodsList[key] * sliderLevel;
      break;
    }
  }
};

// функция генерирующая глубину эффекта
var applyingMethodsEffect = function (filterName) {

  if (filterName === ('effects__preview--chrome')) {
    imagePreview.style.filter = 'grayscale(' + step + ')';
  } else if (filterName === ('effects__preview--sepia')) {
    imagePreview.style.filter = 'sepia(' + step + ')';
  } else if (filterName === ('effects__preview--marvin')) {
    imagePreview.style.filter = 'invert(' + step + '%)';
  } else if (filterName === ('effects__preview--phobos')) {
    imagePreview.style.filter = 'blur(' + step + 'px)';
  } else if (filterName === ('effects__preview--heat')) {
    imagePreview.style.filter = 'brightness(' + step + ')';
  }
};


// реализация ползунка эффектов
var startSlideX = 400;
var sliderElement = document.querySelector('.scale__pin');
var sliderLine = document.querySelector('.scale__line');
var sliderLevel = document.querySelector('.scale__level');
var sliderValue = document.querySelector('.scale__value');

sliderLine.addEventListener('mousedown', startSlide, false);
sliderLine.addEventListener('mouseup', stopSlide, false);

function startSlide(event) {
  var setPerc = ((((event.clientX - startSlideX) / sliderLine.offsetWidth)));
  sliderLine.addEventListener('mousemove', moveSlide, false);
  sliderElement.style.left = (setPerc * 100) + '%';
  sliderLevel.style.width = (setPerc * 100) + '%';
  sliderValue.value = parseInt(setPerc * 100, 10);
  generatesDepthEffect(setPerc);
}

function moveSlide(event) {
  var setPerc = ((((event.clientX - startSlideX) / sliderLine.offsetWidth)));
  if (setPerc > 1 || setPerc < 0) {
    stopSlide(event);
  }
  sliderElement.style.left = (setPerc * 100) + '%';
  sliderLevel.style.width = (setPerc * 100) + '%';
  sliderValue.value = parseInt(setPerc * 100, 10);
  generatesDepthEffect(setPerc);
}

function stopSlide(event) {
  var setPerc = ((((event.clientX - startSlideX) / sliderLine.offsetWidth)));
  sliderLine.removeEventListener('mousemove', moveSlide, false);
  sliderElement.style.left = (setPerc * 100) + '%';
  sliderLevel.style.width = (setPerc * 100) + '%';
  sliderValue.value = parseInt(setPerc * 100, 10);
  generatesDepthEffect(setPerc);
}
