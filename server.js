const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost',
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);
const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';

server.listen(port, host, () => {
  console.log(`dev server listening on port ${port}`);
});