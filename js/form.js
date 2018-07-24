'use strict';
(function () {

  // валидация хеш-тегов
  var hashtags = document.querySelector('.text__hashtags');
  var imageUpload = document.querySelector('.img-upload__overlay');

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
    }

    hashtags.setCustomValidity('');
    return true;

  };

  // валидация массивов хеш-тегов
  var validationHashtagsArray = function (array) {
    if (array.length > 5) {
      hashtags.setCustomValidity('Сообщение не может содержать больше 5 записей');
      return false;
    }

    hashtags.setCustomValidity('');

    var element = '';
    var sameArray = [];
    var test = false;

    array.forEach(function (item) {
      sameArray.push(item.toLowerCase());
    });

    while (sameArray.length) {
      element = sameArray.shift();
      if (sameArray.includes(element)) {
        hashtags.setCustomValidity('Все заметки должны быть разными');
        test = false;
        break;
      }
      test = true;
      hashtags.setCustomValidity('');
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

  var onLoad = function () {
    window.utils.generateMessage();
    document.querySelector('.img-upload__form').reset();

    setTimeout(function () {
      document.querySelector('.modal__message').classList.add('hidden');
    }, 1000);
    imageUpload.classList.add('hidden');
  };

  var onError = function (message) {
    var error = window.utils.cloneTemplate('.img-upload__message--error');
    document.body.appendChild(error);
    error.querySelector('.error__link').textContent = message;

    error.classList.remove('hidden');
  };

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (form.checkValidity()) {
      window.backend.uploadData(new FormData(form), onLoad, onError);
    }

    return false;
  });
})();
