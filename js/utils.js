'use strict';
(function () {

  window.utils = {
    // функция возвращающая случайный елемент массива
    getRandomItem: function (array) {
      var randomIndex = array[Math.floor(Math.random() * (array.length))];
      return randomIndex;
    },

    // функция генерирующая целое число в диапазоне, включая минимальное и максимальное.
    getRandomInRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    generateMessage: function () {
      var node = document.createElement('div');
      node.classList.add('modal__message');
      node.style = 'z-index: 100; width: 600px; height: 50px; padding-top: 15px; margin-top: 300px; margin-left: 335px; text-align: center; background-color: #dcd009;';
      node.style.position = 'fixed';
      node.style.fontSize = '26px';
      node.textContent = 'Данные успешно отправлены';
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
