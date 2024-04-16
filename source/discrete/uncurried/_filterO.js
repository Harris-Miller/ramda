import _arrayReduce from '../../internal/_arrayReduce.js';
import keys from '../../keys.js';

/**
 * Takes a predicate and an object, and returns a new object of the
 * same type containing the members of the given object which satisfy the
 * given predicate.
 *
 * This version is un-curried
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @category Object
 * @sig (a -> Boolean) -> {k: a} -> {k: a}
 * @param {Function} pred
 * @param {Object} obj
 * @return {Object} obj
 * @example
 *
 *      const isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
export default function _filterO(pred, obj) {
  return _arrayReduce(function(acc, key) {
    if (pred(obj[key])) {
      acc[key] = obj[key];
    }
    return acc;
  }, {}, keys(obj));
}
