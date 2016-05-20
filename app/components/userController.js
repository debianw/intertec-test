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

    var html = "";
    users.forEach(function (user) {
      html += "<li> <span class='name'>"+ user.name + " - ( "+ ((user.posts && user.posts.length) || 0) +" posts)" +"</span> <div class=\"controls\"><a href=\"#/user/delete/"+user.id+"\" data-action class=\"button warn\">Delete</a> <a href=\"#/user/details/"+user.id+"\" data-action class=\"button\">Details</a></div> </li>";
    });

    html += "<div class='total'> Total Users: "+users.length+"</div>";

    wrapper.innerHTML = html;
  }

  /**
   *
   */

  function renderDetail (userId) {
    var user = store.findById(userId);
    var wrapper = document.querySelector('#container .inner-details');

    if (!wrapper) return;

    if (!user) {
      return wrapper.innerHTML = "<h4> User not available </h4>";
    }
    wrapper.innerHTML = "";

    var el = document.createElement('div');
    var html = "<div class='name'> "+ user.name + (user.username ? " ("+ user.username +")" : "") +" </div>";
    var posts = user.posts;

    if (posts) {
      html += "<ul>";
      posts.forEach(function (post) {
        html += "<li> "+post.id+ ". "+ post.title +"</li>";
      });
      html += "</ul>";
    }

    el.innerHTML = html;

    wrapper.appendChild(el);
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

  function showDetail(params, url) {
    var id = params[0] || 0;
    var template = "/app/templates/details.html";

    if (!id) return;

    renderPage({
      url: template,
      container: '#container',
      selector: '.content'
    }, function () {
      renderDetail(id);
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
    var id = params[0];
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

      // showDetail
      case 'details':
        showDetail(op.params, op.url);
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
