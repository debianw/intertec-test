/**
 *
 */

(function (global) {
  'use strict';

  var renderPage      = global.it.utils.renderPage;
  var userController  = global.it.controller.user;
  var noop = function () {};

  /**
   *
   */

  window.addEventListener('popstate', function (e) {
    var state = e.state;
    var callback;

    if (state && state.template) {

      if ('home' === state.page) {
        callback = function () {
          userController.do({action: 'fetch'});
        };
      }

      renderPage({
        url: state.template,
        container: '#container',
        selector: '.content'
      }, callback);

    }
  });

})(window);
