/**
 *
 */

(function (global) {

  global.it = global.it || {};

  function Observer () {
    this._list = [];
  }

  Observer.prototype.observe = function observeObject( obj ) {
    console.log( 'added new observer' );
    this._list.push( obj );
  };

  Observer.prototype.unobserve = function unobserveObject( obj ) {
    for( var i = 0, len = this._list.length; i < len; i++ ) {
      if( this._list[ i ] === obj ) {
        this._list.splice( i, 1 );
        console.log( 'removed existing observer' );
        return true;
      }
    }
    return false;
  };

  Observer.prototype.notify = function notifyObservers() {
    var args = Array.prototype.slice.call( arguments, 0 );
    for( var i = 0, len = this._list.length; i < len; i++ ) {
      this._list[ i ].update.apply( null, args );
    }
  };

  global.it.Observer = Observer;

})(window);
