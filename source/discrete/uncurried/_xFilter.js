import _xfBase from '../../internal/_xfBase.js';


function XFilter(f, xf) {
  this.xf = xf;
  this.f = f;
}
XFilter.prototype['@@transducer/init'] = _xfBase.init;
XFilter.prototype['@@transducer/result'] = _xfBase.result;
XFilter.prototype['@@transducer/step'] = function(result, input) {
  return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
};

/**
 * A filter transducer. Takes a predicate and returns a `Transformer`
 *
 * This version is un-curried
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @category Object
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @example
 *
 *      // TODO
 */
export default function _xFilter(f) {
  return function(xf) { return new XFilter(f, xf); };
}
