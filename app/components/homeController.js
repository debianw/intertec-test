/**
 *
 */

(function (global) {
  'use strict';

  // Intertec namespace
  global.it = global.it || {};
  global.it.controller = global.it.controller || {};

  var renderPage      = global.it.utils.renderPage;
  var userController  = global.it.controller.user;

  /**
   *
   */

  function init () {
    var hash = document.location.hash;
    var op = it.utils.parseUrl(hash);

    if (!op) {
      history.pushState({
        page: 'home',
        template: '/app/templates/home.html'
      }, 'Home', '#');

      renderPage({
        url: '/app/templates/home.html',
        container: '#container',
        selector: '.content'
      }, function () {
        userController.do({action: 'fetch'});
      });
    }
  }

  /**
   *
   */

  function _do (op) {
    var action = op.action;
  }

  // Expose API
  global.it.controller.home = {
    do: _do
  }

  // init controller
  init();

})(window);
