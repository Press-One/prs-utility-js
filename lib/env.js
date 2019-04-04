'use strict';

const isNode = typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;

module.exports = {
  isNode
};
