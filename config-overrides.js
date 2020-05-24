const WorkerPlugin = require('worker-plugin');
const {
  override,
  addWebpackPlugin,
  addWebpackModuleRule,
} = require('customize-cra');
module.exports = override(addWebpackPlugin(new WorkerPlugin()));
// addWebpackModuleRule({
//   test: /\.worker\.js$/,
//   use: { loader: 'worker-loader' },
// })
