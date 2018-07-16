'use strict';
(function () {

  var template = document.querySelector('#picture');


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

    cloneTemplate: function (className) {
      return template.content.querySelector(className).cloneNode(true);
    },

    generateMessage: function () {
      var node = document.createElement('div');
      node.classList.add('modal__message');
      node.textContent = 'Данные успешно отправлены';
      document.body.insertAdjacentElement('afterbegin', node);
    },

    shuffle: function (a, b) {
      a = Math.random();
      b = 0.5;
      return a - b;
    }

  };
})();
