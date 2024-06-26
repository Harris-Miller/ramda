var assert = require('assert');

var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('head', function() {

  it('returns the first element of an ordered collection', function() {
    eq(R.head([1, 2, 3]), 1);
    eq(R.head([2, 3]), 2);
    eq(R.head([3]), 3);
    eq(R.head([]), undefined);

    eq(R.head('abc'), 'a');
    eq(R.head('bc'), 'b');
    eq(R.head('c'), 'c');
    eq(R.head(''), undefined);
  });

  it('throws if applied to null or undefined', function() {
    assert.throws(function() { R.head(null); }, TypeError);
    assert.throws(function() { R.head(undefined); }, TypeError);
  });

});
