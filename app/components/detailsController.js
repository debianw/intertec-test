/**
 *
 */

(function (global) {
  'use strict';

  // Intertec namespace
  global.it = global.it || {};
  global.it.controller = global.it.controller || {};

  /**
   *
   */

  function load () {
    console.log('load details ...', document.location.search);
  }

  // Expose API
  global.it.controller.details = {
    load: load
  }

})(window);
