'use strict';
(function () {

  var getXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время запроса в ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 4000;
    return xhr;
  };

  window.backend = {
    loadData: function (onLoad, onError) {
      var xhr = getXhr(onLoad, onError);
      xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
      xhr.send();
    },

    uploadData: function (data, onLoad, onError) {
      var xhr = getXhr(onLoad, onError);
      xhr.open('POST', 'https://js.dump.academy/kekstagram');
      xhr.send(data);
    }
  };
})();
