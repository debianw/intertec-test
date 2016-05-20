/**
 *
 */

(function (global) {

  global.it = global.it || {};
  var Observer = global.it.Observer;

  var users = [];

  /**
   *
   */

  function Store () {
    if ( !(this instanceof Store) ) return new Store();

    var observer = new Observer();

    //
    this.addObserver = function addObserver( newObserver ) {
      observer.observe( newObserver );
    };

    //
    this.removeObserver = function removeObserver( deleteObserver ) {
      observer.unobserve( deleteObserver );
    };

    //
    this.fetch = function fetch() {

      users.push({
        id: 1,
        name: "User Name #1"
      },

      {
        id: 2,
        name: "User Name #2"
      },

      {
        id: 3,
        name: "User Name #3"
      },

      {
        id: 4,
        name: "User Name #4"
      });

      // notify observers of the change
      observer.notify( users );
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

    this.get = function () {
      return users;
    }

  }

  global.it.Store = Store;

})(window);
