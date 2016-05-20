/**
 *
 */

(function () {
  'use strict';

  var container         = document.querySelector('#container');
  var renderPage        = it.utils.renderPage;
  var queryVar          = it.utils.queryVar;
  var detailsController = it.controller.details;
  var userController    = it.controller.user;

  /**
   * Controller
   */
  
  container.addEventListener('click', function (e) {
    var target = e.target;

    e.preventDefault();

    if (target !== e.currentTarget && target.hasAttribute('data-action')) {

      var href  = target.getAttribute('href');
      var op    = it.utils.parseUrl(href);

      if (!op) return;

      switch (op.controller) {

        // User
        case "user":
          userController.do(op);
        break;

        default:
        break;

      }

    }

    e.stopPropagation();
  });

})();
