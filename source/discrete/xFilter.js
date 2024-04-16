
import _curry1 from '../internal/_curry1.js';
import _xFilter from './uncurried/_xFilter.js';

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
 * @example
 *
 *      TODO
 */
var xFilter = _curry1(_xFilter);

export default xFilter;
