/**
 *
 */

(function (global) {

  global.it = global.it || {};

  var Observer    = global.it.Observer;
  var requestAjax = it.utils.requestAjax;
  var users       = [];

  /**
   *
   */

  function Store () {
    if ( !(this instanceof Store) ) return new Store();

    var observer = new Observer();

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

      requestAjax({
        url: "http://jsonplaceholder.typicode.com/users",
        method: 'get'
      }, function (err, data) {
        if (err) return console.log("Error requesting users");

        users = data || [];

        // notify observers of the change
        observer.notify( users );
      });

    };

    /**
     *
     */

    this.findById = function (id) {
      var index = users.findIndex(function (user) {
        return user === id;
      });

      return users[index];
    }

    /**
     *
     */

    this.delete = function (id) {
      var index = users.findIndex(function (user) {
        return user.id === id;
      });

      if (index === -1) return;

      users = users.slice(0, index).concat( users.slice(index+1) );

      // notify observers of the change
      observer.notify( users );
    }

    /**
     *
     */

    this.add = function (user) {
      if (!user) return;

      user.id = users.length+1;
      users.push(user);

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
