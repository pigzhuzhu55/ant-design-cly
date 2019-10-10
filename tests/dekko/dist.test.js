const $ = require('dekko');
const chalk = require('chalk');

$('dist')
  .isDirectory()
  .hasFile('antd-with-locales.js')
  .hasFile('antd-with-locales.min.js')
  .hasFile('antd-cly.css')
  .hasFile('antd-cly.min.css')
  .hasFile('antd-cly.js')
  .hasFile('antd-cly.min.js')
  .hasFile('antd-cly.less');

// eslint-disable-next-line
console.log(chalk.green('✨ `dist` directory is valid.'));
