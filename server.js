const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');

const port = process.env.PORT || 5000;

const options = {
  contentBase: './dist',
  hot: true,
  host: '0.0.0.0',
  disableHostCheck: true
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(port, '0.0.0.0', () => {
  console.log(`dev server listening on port ${port}`);
});