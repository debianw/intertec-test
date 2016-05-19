(function (global) {
  'use strict';

  // Intertec namespace
  global.it = global.it || {};

  /**
   *
   */

  function getQueryVariable(str) {
    return (str || document.location.search).replace(/(.*\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
  }

  /**
   *
   */

  function renderPage(options) {
    var request = new XMLHttpRequest();

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
        break;

        //
        default:
          var code = Math.floor(status / 100);
          switch (code) {
              case 4:
                /* Client Error 4xx */
                alert("Client Error");
                break;
              case 5:
                /* Server Error 5xx */
                alert("Server Error");
                break;
              default:
                /* Unknown status */
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
    queryVar: getQueryVariable,
    renderPage: renderPage
  }

})(window);
