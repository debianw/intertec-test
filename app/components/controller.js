/**
 *
 */

(function () {
  'use strict';

  var container         = document.querySelector('#container');
  var renderPage        = it.utils.renderPage;
  var queryVar          = it.utils.queryVar;
  var detailsController = it.controller.details;

  if (/details/.test(document.location.pathname)) {
    detailsController.load();
  }

  /**
   * Controller
   */
  container.addEventListener('click', function (e) {
    var target = e.target;
    var action;

    e.preventDefault();

    if (target !== e.currentTarget && target.hasAttribute('data-action')) {

      action = target.getAttribute('data-action');

      switch (action) {
        //
        case "details":
          var url = e.target.getAttribute('href');
          var data = {
            page: 'details',
            url: url,
            query: queryVar(url)
          }

          history.pushState(data, "Details Page", url);

          renderPage({
            url: url,
            container: '#container',
            selector: '.content'
          });

          detailsController.load();
        break;

        //
        case "delete":
          var data = queryVar(e.target.getAttribute('href'));
          console.log('delete value ==> ', data);
        break;

        //
        default:
        break;
      }
    }

    e.stopPropagation();
  });

})();
