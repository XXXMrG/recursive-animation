const WorkerPlugin = require('worker-plugin');
const { override, addWebpackPlugin } = require('customize-cra');
module.exports = override(addWebpackPlugin(new WorkerPlugin()));
