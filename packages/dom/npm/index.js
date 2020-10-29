'user strict';

if (process.env.NODE_ENV === 'development') {
  module.exports = require('../dist/dom.development.cjs.js');
} else {
  module.exports = require('../dist/dom.production.cjs.js');
}
