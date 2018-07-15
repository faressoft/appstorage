/**
 * Watch
 * Set traps for recursively watching changes on an object
 * 
 * @author Mohammad Fares <faressoft.com@gmail.com>
 */

/**
 * Set traps for recursively watching changes on an object
 *  
 * @param  {Object}   target   the object to watch
 * @param  {Function} callback called when the object is changed
 * @return {Proxy}
 */
function watch(target, callback) {

  var handler = {};

  /**
   * Trap for getting a property value
   * 
   * @param  {Object} target
   * @param  {String} property
   * @param  {Object} receiver
   * @return {Proxy}
   */
  handler.get = function(target, property, receiver) {

    try {

      return new Proxy(target[property], handler);

    } catch (error) {

      return Reflect.get(target, property, receiver);

    }

  };

  /**
   * Trap for setting a property value
   * 
   * @param  {Object} target
   * @param  {String} property
   * @param  {*}      value
   * @return {*}
   */
  handler.set = function(target, property, value) {

    callback();

    return Reflect.set(target, property, value);

  };

  /**
   * Trap for deleting a property
   * 
   * @param  {Object}  target
   * @param  {String}  property
   * @return {Boolean}
   */
  handler.deleteProperty = function(target, property) {

    callback();

    return Reflect.deleteProperty(target, property);

  };

  return new Proxy(target, handler);

};

module.exports = watch;
