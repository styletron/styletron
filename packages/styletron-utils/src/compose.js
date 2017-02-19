module.exports = compose;

function compose(...fns) {
  return arg => fns.reduceRight((result, fn) => fn(result), arg);
}
