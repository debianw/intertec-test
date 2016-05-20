/**
 * User Controller
 */

(function (global) {
  'use strict';

  // Intertec namespace
  global.it = global.it || {};
  global.it.controller = global.it.controller || {};

  var renderPage  = global.it.utils.renderPage;
  var store       = global.it.Store();
  var fetched     = false;

  // adding observer
  store.addObserver({
    update: renderList
  });

  window.store = store;

  /**
   * Call on Store change
   */

  function renderList (users) {
    var wrapper = document.querySelector('#user-list');

    users = users || store.get();

    if (!wrapper) return;

    wrapper.innerHTML = "";

    console.log('rendering users ==> ', users);
    users.forEach(function (user) {
      var el = document.createElement('li');
      el.innerHTML = "<span>"+ user.name + " - ( 5 posts)" +"</span> <a href=\"#/user/delete/"+user.id+"\" data-action>Delete</a> <a href=\"#/user/details/"+user.id+"\" data-action>Details</a>";

      wrapper.appendChild(el);
    });
  }

  /**
   * Init User Controller
   */

  function init () {
    var hash = document.location.hash;
    var op = it.utils.parseUrl(hash);

    if (op && 'user' === op.controller) {
      op.url = false;
      _do(op);
    }
  }

  /**
   * Show User
   */

  function showUser(params, url) {
    var id = params[0] || 0;
    var template = "/app/templates/details.html";

    if (!id) return;

    renderPage({
      url: template,
      container: '#container',
      selector: '.content'
    });

    if (url) {
      var data = {
        page: 'details',
        template: template
      }

      history.pushState(data, "Details Page", url);
    }
  }

  /**
   * Delete User
   */

  function deleteUser (params) {
    var id = parseInt(params[0], 10);

    store.delete(id);
  }

  /**
   * Add User
   */

  function addUser () {
    var input = document.querySelector('input[name=name]');
    var name  = input.value;

    if (!name) return;

    store.add({
      name: document.querySelector('input[name=name]').value
    });

    input.value = "";
  }

  /**
   *
   */

  function fetch () {
    if (!fetched) {
      store.fetch();
    }
    else {
      renderList();
    }

    fetched = true;
  }

  /**
   *
   */

  function _do (op) {
    var action = op.action;

    switch (action) {

      // showUser
      case 'details':
        showUser(op.params, op.url);
      break;

      // delete
      case 'delete':
        deleteUser(op.params);
      break;

      case 'add':
        addUser();
      break;

      case 'fetch':
        fetch();
      break;

      case 'render-list':
        renderList();
      break;

      default:
      break;
    }
  }

  // Expose API
  global.it.controller.user = {
    do: _do
  }

  // init controller
  init();

})(window);
