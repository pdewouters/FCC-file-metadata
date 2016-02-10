'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upload = (0, _multer2.default)({ dest: 'uploads/' });
var app = (0, _express2.default)();

app.use(_express2.default.static(__dirname + '/../bower_components'));

var getSiteUrl = function getSiteUrl(request) {
  return request.protocol + '://' + request.get('Host') + '/';
};

app.set('port', process.env.PORT || 5000);

app.engine('handlebars', (0, _expressHandlebars2.default)({ layoutsDir: __dirname + "/views/layouts/", defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
  res.render('home', { baseUrl: getSiteUrl(req) });
});

app.post('/api/fileanalyse', upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify({ filesize: req.file.size }));
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
//# sourceMappingURL=index.js.map