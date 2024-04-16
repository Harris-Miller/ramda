
import _curry2 from '../internal/_curry2.js';
import _filterO from './uncurried/_filterO.js';

/**
 * Takes a predicate and an object, and returns a new object of the
 * same type containing the members of the given object which satisfy the
 * given predicate.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @category Object
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Object} obj
 * @return {Object} obj
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      const isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
var filter = _curry2(_filterO);

export default filter;
