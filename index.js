const precify = require("./lib/precify");

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000



express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/hello', (req, res) => res.send('Hello World!'))
  // /files/* is accessed via req.params[0]
  // but here we name it :file
  .get('/files/:file(*)', function(req, res, next){
    var filePath = path.join(__dirname, 'files', req.params.file);

    res.download(filePath, function (err) {
      if (!err) return; // file sent
      if (err && err.status !== 404) return next(err); // non-404 error
      // file for download not found
      res.statusCode = 404;
      res.send('Cant find that file, sorry!');
    });
  })
  .get('/log', function(req, res, next){
      console.log('Working...');
      console.log(precify);
      console.log(Mozg);
      console.log(this);
      res.send('Ok');
  })
  .get('/processJson', function(req, res, next){
      Mozg.Precify.processJson();
      console.log('Working...');
      res.send('Ok')
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
