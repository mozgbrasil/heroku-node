//#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const log = console.log;

const _Mozg = require('./lib/precify');
const Mozg = _Mozg.Mozg;
Mozg.Precify.construct();

var isNode = require('detect-node');

if (isNode) {

    console.log("Running under Node.JS");

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

} else {

    console.log("Running from browser (or whatever not-a-node env)");

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

}
