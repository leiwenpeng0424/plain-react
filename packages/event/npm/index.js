'user strict';

if (process.env.NODE_ENV === 'development') {
  module.exports = require('../dist/event.development.cjs.js');
} else {
  module.exports = require('../dist/event.production.cjs.js');
}
