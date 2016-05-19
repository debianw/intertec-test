/**
 *
 */

(function () {
  'use strict';

  const renderPage   = it.utils.renderPage;
  const queryVar     = it.utils.queryVar;

  // init state
  if ('/' === document.location.pathname) {
    history.pushState({ page: 'home', url: '/home.html' }, 'Home', '/home.html');
    renderPage({
      url: '/home.html',
      container: '#container',
      selector: '.content'
    });
  }

  /**
   *
   */

  window.addEventListener('popstate', function (e) {
    var state = e.state;

    if (state && state.url) renderPage({
      url: state.url,
      container: '#container',
      selector: '.content'
    });
  });

})();
