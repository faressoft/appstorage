/**
 * AppStorage
 * Auto syncing for objects with JSON files using the Proxy API
 * 
 * @author Mohammad Fares <faressoft.com@gmail.com>
 */

var path  = require('path'),
    fs    = require('fs');
var watch = require('./watch.js');

/**
 * AppStorage
 * Auto syncing for objects with JSON files using the Proxy API
 * 
 * @param {String} fileName
 */
function AppStorage(fileName) {

  /**
   * The path of the corresponding data file
   * @type {String}
   */
  this.path = path.resolve(fileName);

  /**
   * The data
   * @type {Object}
   */
  this.data = null;

  // Load
  this.load();

  return this.trap();

}

/**
 * Initialize the data object
 *
 * - If the data file exists
 *   - Load it and parse it
 *   - Initialize the data object by the loaded data
 * - If the data doesn't exist
 *   - Create it with an empty object
 *   - Initialize the data object by an empty object
 */
AppStorage.prototype.load = function() {

  // The db file is already created
  if (fs.existsSync(this.path)) {

    // Create a data file
    this.data = JSON.parse(fs.readFileSync(this.path, 'utf8'));

    return;

  }

  // Create a data file
  fs.writeFileSync(this.path, '{}', 'utf8');

  // Initialize the data object
  this.data = {};

};

/**
 * Trap the data object by a proxy that
 * recursively watch any changes and sync
 * them to the data file
 * 
 * @return {Object}
 */
AppStorage.prototype.trap = function() {

  var self = this;

  // Set traps for recursively watching changes on an object
  return watch(self.data, function() {

    process.nextTick(function() {
      
      // Save the data
      fs.writeFileSync(self.path, JSON.stringify(self.data, null, 2), 'utf8');

    });

  });
  
};

module.exports = AppStorage;
