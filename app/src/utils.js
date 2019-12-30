/**
 * https://davidwalsh.name/query-string-javascript
 *
 * @param {string} name
 * @return {string}
 */
export const getUrlParameter = (name) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]'); // eslint-disable-line no-useless-escape
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
