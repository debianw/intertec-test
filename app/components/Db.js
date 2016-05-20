/**
 *
 */

(function (global) {

  global.it = global.it || {};

  function Db () {
    if ( !(this instanceof Db) ) return new Db();

    /**
     *
     */

    this.save = function (key, value) {
      if ('object' === typeof value) {
        value = JSON.stringify(value);
      }

      localStorage.setItem(key, value);
    }

    /**
     *
     */

    this.get = function (key) {
      var str = localStorage.getItem(key);

      return JSON.parse(str);
    }

    /**
     *
     */

    this.remove = function (key) {
      localStorage.removeItem(key);
    }

  }

  global.it.Db = Db;

})(window);
