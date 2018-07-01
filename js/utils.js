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
    }
  };
})();
