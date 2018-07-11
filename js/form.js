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
    error.querySelector('.error__text').textContent = message;

    error.classList.remove('hidden');
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (form.checkValidity()) {
      window.backend.uploadData(new FormData(form), onLoad, onError);
    }

    return false;
  });
})();
