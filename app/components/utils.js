(function (global) {
  'use strict';

  // Intertec namespace
  global.it = global.it || {};

  var noop = function () {};

  /**
   *
   */

  function parseUrl (url) {
    if (!url) return;

    var query = url.replace(/(.*\#\/)/, "");
    var options = {};

    var data = query.split('/');

    options.controller  = data.slice(0,1)[0] || false;
    options.action      = data.slice(1,2)[0] || false;
    options.params      = data.slice(2) || false;
    options.url         = url;

    return options;
  }

  /**
   *
   */

  function renderPage(options, callback) {
    var request = new XMLHttpRequest();

    callback = callback || noop;

    if (!options) return;
    if (!options.container) return console.error("Please provide a container");

    var url       = options.url;
    var container = document.querySelector(options.container);
    var selector  = options.selector;

    //
    request.onload = function () {
      var status = this.status;

      switch (status) {
        //
        case 200:
          var el = document.createElement('div');
          el.innerHTML = this.responseText;

          container.innerHTML = "";
          container.appendChild( selector ? el.querySelector(selector) : el );

          callback();
        break;

        //
        default:
          var code = Math.floor(status / 100);
          switch (code) {
            case 4:
              /* Client Error 4xx */
              callback(new Error("Client Error"));
              alert("Client Error");
              break;
            case 5:
              /* Server Error 5xx */
              callback(new Error("Server Error"));
              alert("Server Error");
              break;
            default:
              /* Unknown status */
              callback(new Error("Unknow error"));
              alert("Unknow error");
            break;
          }
        break;
      };
    }

    request.open('get', url, true);
    request.send();
  }

  // Expose API
  global.it.utils = {
    renderPage: renderPage,
    parseUrl: parseUrl
  }

})(window);
