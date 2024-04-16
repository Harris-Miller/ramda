
import _curry2 from '../internal/_curry2.js';
import _filter from './uncurried/_filter.js';

/**
 * Takes a predicate and an array, and returns a new array of the
 * same type containing the members of the given array which satisfy the
 * given predicate.
 *
 * This version is un-curried
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @category Object
 * @sig (a -> Boolean) -> [a] -> [a]
 * @param {Function} pred
 * @param {Array} arr
 * @return {Array} arr
 * @example
 *
 *      const isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 */
var filter = _curry2(_filter);

export default filter;
