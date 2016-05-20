/**
 *
 */

(function (global) {
  'use strict';

  var renderPage      = global.it.utils.renderPage;
  var userController  = global.it.controller.user;
  var parseUrl        = global.it.utils.parseUrl;
  var noop            = function () {};

  /**
   *
   */

  window.addEventListener('popstate', function (e) {
    var state = e.state;
    var callback;

    console.log('state ==> ', state);

    if (state && state.template) {

      if ('home' === state.page) {
        callback = function () {
          userController.do({action: 'fetch'});
        };
      }

      if ('details' === state.page) {
        callback = function () {
          var op = parseUrl(window.location.hash);
          op.action = "render-detail";
          userController.do(op);
        }
      }

      renderPage({
        url: state.template,
        container: '#container',
        selector: '.content'
      }, callback);

    }

  });

})(window);
