'use strict';

if (process.env.NODE_ENV === 'development') {
  module.exports = require('../dist/virtual-dom.development.cjs.js');
} else {
  module.exports = require('../dist/virtual-dom.production.cjs.js');
}
