const antdcly = require('./components');

const req = require.context('./components', true, /^\.\/locale-provider\/.+_.+\.tsx$/);

antdcly.locales = {};

req.keys().forEach(mod => {
  const matches = mod.match(/\/([^/]+).tsx$/);
  antdcly.locales[matches[1]] = req(mod).default;
});

module.exports = antdcly;
