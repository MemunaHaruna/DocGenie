const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const webpack = require('webpack');
const webpackConfigDev = require('./webpack.config');
const webpackConfigProd = require('./webpack.config.prod.js');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackMiddleware = require('webpack-dev-middleware');

// let webpackConfig;
// if (process.env.NODE_ENV === 'production') {
//   webpackConfig = webpackConfigProd;
// } else {
//   webpackConfig = webpackConfigDev;
// }

const webpackConfig =
  process.env.NODE_ENV === 'production' ? webpackConfigProd : webpackConfigDev;
const compiler = webpack(webpackConfig);

// This kills all running nodemon processes before restarting.
// To resolve the listen EADDRINUSE error
process.on('SIGUSR2', () => { process.exit(0); });

const serverPath =
  process.env.NODE_ENV === 'production' ? 'server-dist' : 'server';
const authentication = require(`./${serverPath}/middleware/authentication`); // eslint-disable-line

const dotenv = require('dotenv');

dotenv.config();

// Set up the express app
const app = express();

const port = parseInt(process.env.PORT, 10) || 5000;


app.set('port', port);

// Log requests to the console.
app.use(logger('dev'));

app.use(webpackMiddleware(compiler));
app.use(
  webpackHotMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.path,
    noInfo: true
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// require jwt token for authenticated routes
app.use('/api', authentication.verifyToken);
app.use('/auth/api', authentication.verifyToken);


require(`./${serverPath}/routes`)(app); // eslint-disable-line

app.use(express.static(path.resolve(`${__dirname}/public`)));

// Setup a default catch-all route that sends back a
// welcome message in JSON format.

app.get('*', (request, response) => {
  response.sendFile(path.resolve(`${__dirname}/public/index.html`));
});

app.listen(port, () => {
  console.log(`\nApplication is running in ${app.get('env')} on port ${port} `);
});

module.exports = app;
