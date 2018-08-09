//#!/usr/bin/env node

const chalk = require('chalk');
const log = console.log;

const _Mozg = require('./lib/precify');
const Mozg = _Mozg.Mozg;
Mozg.Precify.construct();

function isHeroku()
{
    return process.env.NODE_HOME && process.env.NODE_HOME.indexOf('heroku') !== -1 ? true : false;
}

var isHeroku = isHeroku();

log(chalk.blue('isHeroku: ') + isHeroku );

if (isHeroku) {

    console.log("Running under Heroku");

    const express = require('express')
    const path = require('path')
    const PORT = process.env.PORT || 5000

    const serveIndex = require('serve-index');

    var app = express();

    app.use('/public', serveIndex(path.join(__dirname, 'public')));
    app.use('/public', express.static(path.join(__dirname, 'public')));

    app
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
      .get('/log', function(req, res){
          console.log('Working...');
          //const Mozg = require('./lib/precify');
          console.log(Mozg);
          console.log(Mozg.Precify);
          console.log(Mozg.Precify.construct());
          //console.log(this);
          res.send('Ok log');
      })
      .get('/getJson', function(req, res){
          Mozg.Precify.initialize();
          Mozg.Precify.getJson();
          console.log('Working...');
          res.send('Ok getJson')
      })
      .get('/processJson', function(req, res){
          Mozg.Precify.initialize();
          Mozg.Precify.processJson();
          console.log('Working...');
          res.send('Ok processJson')
      })
      .listen(PORT, () => console.log(`Listening on ${ PORT }`))

} else {

    console.log("Running out Heroku");

    const program = require('commander');

    program
      .version('0.1.0')
      .option('-p, --getJson', 'use getJson')
      .option('-P, --processJson', 'use processJson')
      .option('-b, --getPage', 'use getPage')
      .parse(process.argv);

    log(chalk.bgGreen('-'));
    if (program.getJson) Mozg.Precify.getJson();
    if (program.processJson) Mozg.Precify.processJson();
    if (program.getPage) Mozg.Precify.getPage('SQUID7384');
    log(chalk.bgGreen('-'));

}
