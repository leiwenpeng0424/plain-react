'user strict';

if (process.env.NODE_ENV === 'development') {
  module.exports = require('../dist/core.development.cjs.js');
} else {
  module.exports = require('../dist/core.production.cjs.js');
}
