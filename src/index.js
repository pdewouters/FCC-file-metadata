'use strict'
import express from 'express'
import exphbs from 'express-handlebars'
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })
const app = express()

app.use( express.static( __dirname + '/../bower_components' ) )

const getSiteUrl = request => {
    return request.protocol + '://' + request.get('Host') + '/'
}

app.set('port', (process.env.PORT || 5000))

app.engine('handlebars', exphbs({layoutsDir: __dirname + "/views/layouts/", defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
    res.render('home', {baseUrl: getSiteUrl(req)})
})

app.post('/api/fileanalyse', upload.single('file'), function (req, res, next) {
  res.header("Content-Type", "application/json")
  res.send(JSON.stringify({filesize:req.file.size}))
})

// Fallback
app.get('/*', (req, res) => {
    res.header("Content-Type", "application/json")
    res.send(JSON.stringify({'error':'invalid route'}))
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
})
