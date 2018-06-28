'use strict';
// взаимодействие с формой редактирования фотографии
(function () {
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
})();