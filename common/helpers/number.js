/**
 * change formatted number string back to number
 * e.g. $100,000.05 -> 100000.05
 *
 * @param {string} numberStr
 * @return {number}
 */
exports.purifyNumber = (numberStr) => parseFloat(numberStr.replace(/\$|,/g, ''));
