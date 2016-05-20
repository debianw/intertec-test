/**
 *
 */

(function (global) {

  global.it = global.it || {};

  var Observer    = global.it.Observer;
  var Db          = global.it.Db;
  var requestAjax = global.it.utils.requestAjax;
  var users       = [];

  /**
   *
   */

  function Store () {
    if ( !(this instanceof Store) ) return new Store();

    var observer = new Observer();
    var db = new Db();

    /**
     *
     */

    this.addObserver = function addObserver( newObserver ) {
      observer.observe( newObserver );
    };

    /**
     *
     */

    this.removeObserver = function removeObserver( deleteObserver ) {
      observer.unobserve( deleteObserver );
    };

    /**
     *
     */

    this.fetch = function fetch() {
      var self = this;

      requestAjax({
        url: "http://jsonplaceholder.typicode.com/users",
        method: 'get'
      }, function (err, data) {
        if (err) return console.log("Error requesting users");

        users = data || [];

        // persist data
        db.save('tl-users', users);

        _requestPosts.call(self);

        // notify observers of the change
        observer.notify( users );
      });

    };

    /**
     * @private
     */

    function _requestPosts () {
      var self = this;

      function filterPostByUser (data, userId) {
        return data.filter(function (post) {
          return post.userId === userId;
        });
      }

      requestAjax({
        url: "http://jsonplaceholder.typicode.com/posts",
        method: 'get'
      }, function (err, data) {
        if (err) return console.log("Error requesting posts");

        users.forEach(function (user) {
          user.posts = filterPostByUser(data, user.id);
        });

        // persist data
        db.save('tl-users', users);

        // notify observers of the change
        observer.notify( users );
      });
    }

    /**
     *
     */

    this.findById = function (id) {
      id = parseInt(id, 10);

      if (users.length === 0) {
        users = db.get('tl-users');
      }

      var index = users.findIndex(function (user) {
        return user.id === id;
      });

      return users[index];
    }

    /**
     *
     */

    this.delete = function (id) {
      id = parseInt(id, 10);

      var index = users.findIndex(function (user) {
        return user.id === id;
      });

      if (index === -1) return;

      users = users.slice(0, index).concat( users.slice(index+1) );

      // persist data
      db.save('tl-users', users);

      // notify observers of the change
      observer.notify( users );
    }

    /**
     *
     */

    this.add = function (user) {
      if (!user) return;

      user.id = users.length+2000;
      users.push(user);

      // persist data
      db.save('tl-users', users);

      // notify observers of the change
      observer.notify( users );
    }

    /**
     *
     */

    this.get = function () {
      return users;
    }

  }

  global.it.Store = Store;

})(window);
