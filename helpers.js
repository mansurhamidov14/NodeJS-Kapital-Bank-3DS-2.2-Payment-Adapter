/**
 * @param {Object} params
 * @returns {string}
 */
function stringifyUrlParams(params) {
  const formatted = Object.keys(params).map(function (key) {
    const val = params[key];
    if (val != null) {
      return `${key}=${val}`;
    }
  });
  return '?' + formatted.filter(Boolean).join('&');
}

module.exports.stringifyUrlParams = stringifyUrlParams;