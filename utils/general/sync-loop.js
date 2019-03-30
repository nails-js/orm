/**
 *
 * Loops through provided array synchronously invoking the provided function.
 *
 *
 * @module utils
 * @memberOf utils.general
 * @since 0.0.0
 * @category General
 * @param {Array} array The array to iterate over.
 * @param {Function} [iteratee] The iteratee to invoke on each array element.
 * @returns {Object} Returns the promise chain with array of promise results if returned from given function.
 * @example
 *
 * // contrived
 * utils.general.syncLoop([1, 2, 3], async (id) =>{
 *  const item = await fetch(id)
 * });
 * // => Promise.then(results =>{
 * // results === [promiseResult1, promiseResult2, promiseResult3]
 * })
 *
 */

const syncLoop = (array, func) => {
  const resultsArray = [];
  return array.reduce(
    (promiseChain, iteratee, currentIndex) =>
      promiseChain.then(async () => {
        const result = await func(iteratee, currentIndex);
        resultsArray.push(result);
        return resultsArray;
      }),
    Promise.resolve()
  );
};

module.exports = syncLoop;
