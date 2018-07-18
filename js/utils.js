'use strict';
(function () {

  var template = document.querySelector('#picture');
  var DEBOUNCE_INTERVAL = 500;

  window.utils = {

    // функция возвращающая случайный елемент массива
    getRandomItem: function (array) {
      return array[Math.floor(Math.random() * (array.length))];
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

    shuffle: function () {
      return Math.random() - 0.5;
    },

    debounce: function (fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  }

})();
