// CRA uses Jest 27, which predates React Router 7's package export maps.
// Let Node resolve those public entry points; retain Jest's resolver elsewhere.
module.exports = (request, options) => {
  if (request === 'react-router-dom' || request === 'react-router' || request === 'react-router/dom') {
    return require.resolve(request, { paths: [options.basedir] }).replace(/\.mjs$/, ".js");
  }
  return options.defaultResolver(request, options);
};
