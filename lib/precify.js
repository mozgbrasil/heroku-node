//#!/usr/bin/env node

//

//'use strict';

//

console.log(this);

//

// # Require

const fs = require('fs');
const path = require("path");
const phantom = require('phantom');
const request = require('request');
const cheerio = require('cheerio');
const sleep = require('sleep');
const chalk = require('chalk');
const log = console.log;
const sanitizeHtml = require('sanitize-html');
const striptags = require('striptags');
const _ = require('underscore');
const currency = require('currency.js');
const program = require('commander');
const randomItem = require('random-item');

//

// # Object literals

var debugData = [];

var Mozg = Mozg || {};

Mozg.Precify = {

    _version: '1.0.0',

    construct: function(){

        //

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Precify.' + calleeName;
        log(chalk.green(methodName));
        debugData.push(methodName);

        //

        var parentDir = path.dirname(process.mainModule.filename);
        console.log(parentDir);

        fs.readdir(parentDir, function(err, items) {
            console.log(items);
        });

        //

    },

    variableObject: {},

    initialize: function(){

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Precify.' + calleeName;
        log(chalk.green(methodName));
        debugData.push(methodName);

        //

        var variableObject = Mozg.Precify.variableObject;

        variableObject.config = arguments[0];

		variableObject.processQueue = false;

        //

        debugData.push(variableObject.config);

        //

    },

    getJson: function(){

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Precify.' + calleeName;
        log(chalk.green(methodName));
        debugData.push(methodName);

        //

        var baseUrl = 'http://localhost.loc/magento/magento-007/magento/';
        var baseUrl = 'http://phpstack-48796-560820.cloudwaysapps.com/';

        var url = baseUrl + 'index.php/mozg_squidfacil/process/getPrices/';

        log(chalk.blue('url: ') + url );

        var options = {
          url: url,
          headers: {
            'User-Agent': 'request'
          }
        };

        var parentDir = path.dirname(process.mainModule.filename);
        var directoryPath = `${parentDir}/_data`;

        log(chalk.blue('directoryPath: ') + directoryPath );

        fs.readdir(parentDir, function(err, items) {
            console.log(items);
        });

        fs.readdir(directoryPath, function(err, items) {
            console.log(items);
        });

        if (!fs.existsSync(directoryPath)){
            console.log('Criando diretório');
            fs.mkdirSync(directoryPath);
        }

        var pathFile = `${directoryPath}/products_SQUID.json`;

        log(chalk.blue('pathFile: ') + pathFile );

        function callback(error, response, body) {
            //console.log(error);
            //console.log(response);
            //console.log(body);
            if (!error && response.statusCode == 200) {

                log(chalk.blue('pathFile: ') + pathFile );

                var json = body;

                fs.writeFileSync(pathFile, json);

            }
        }

        request(options, callback);

        //

    },

    processJson: function(){

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Precify.' + calleeName;
        log(chalk.green(methodName));
        debugData.push(methodName);

        //

        Mozg.Precify.getJson();

        //

        log(chalk.green(methodName));

        var parentDir = path.dirname(process.mainModule.filename);
        var directoryPath = `${parentDir}/_data`;
        var pathFile = `${directoryPath}/products_SQUID.json`;

        log(chalk.blue('pathFile: ') + pathFile );

        var items = JSON.parse(fs.readFileSync(pathFile, 'utf8'));

        /*items.forEach(function(item) {

          var name = item.name;
          var sku = item.sku;

          Mozg.Precify.getHttp(name, sku);

        });*/

        console.log(this);

        var countItems = items.length;
        var count = 0;

        // https://www.npmjs.com/package/random-item

        var intervalMilliseconds = 1000;

        setInterval(function() {

            var intervalMilliseconds = randomItem([5000, 11000, 16000, 19000]);
            log(chalk.blue('intervalMilliseconds: ') + intervalMilliseconds );

            this._repeat = intervalMilliseconds;

            log(chalk.blue('count: ') + count + ' ' +  chalk.red('countItems: ') + countItems );

            if( count == countItems ){
                process.exit();
            }

            log(chalk.bgGreen('-'));
            //console.log(this);
            //log(chalk.bgGreen('-'));
            console.log(Mozg);
            log(chalk.bgGreen('-'));

            var name = items[count].name;
            var sku = items[count].sku;

            log(chalk.blue('name: ') + name + ' ' +  chalk.red('sku: ') + sku );

            var processQueue = Mozg.Precify.variableObject.processQueue;

            if( count == 0 ){
                Mozg.Precify.variableObject.processQueue = true;
            }

            var processQueue = Mozg.Precify.variableObject.processQueue;

            if( processQueue === true ){
                Mozg.Precify.variableObject.processQueue = false;
                Mozg.Precify.getHttp(name, sku);
            }

            //

            count++;

        }, intervalMilliseconds);

        //

    },

    getHttp: function(name, sku){

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Precify.' + calleeName;
        log(chalk.green(methodName));
        debugData.push(methodName);

        //

        var url = 'https://www.google.com.br/search?tbm=shop&q="'+name+'"&';

        //var url = 'https://www.google.com.br/search?tbm=shop&cr=countryBR&lr=lang_pt&q=' + sku;

        var url = encodeURI(url);

        log(chalk.blue('url: ') + url );

        Mozg.Precify.getPhantom(url, sku);

        //

        //sleep.sleep(4);

        //

    },

    getPhantom: function(url, sku){

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Precify.' + calleeName;
        log(chalk.green(methodName));
        debugData.push(methodName);

        //

        (async function() {
          const instance = await phantom.create();
          const page = await instance.createPage();
          await page.on('onResourceRequested', function(requestData) {
            //console.info('Requesting', requestData.url);
          });

          const status = await page.open(url);
          const content = await page.property('content');
          //console.log(content);

          Mozg.Precify.setPage(sku, content);

          await instance.exit();
        })();

        //
    },

    setPage: function(sku, content){

        //

        var parentDir = path.dirname(process.mainModule.filename);
        var directoryPath = `${parentDir}/_data`;
        var pathFile = `${directoryPath}/${sku}.html`;

        log(chalk.blue('pathFile: ') + pathFile );

        var html = content;
        fs.writeFileSync(pathFile, html);

        //

        Mozg.Precify.getPage(sku);

        //

    },

    getPage: function(sku){

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Precify.' + calleeName;
        log(chalk.green(methodName));
        debugData.push(methodName);

        //

        log(chalk.blue('sku: ') + sku );

        var parentDir = path.dirname(process.mainModule.filename);
        var directoryPath = `${parentDir}/_data`;
        var pathFile = `${directoryPath}/${sku}.html`;

        log(chalk.blue('pathFile: ') + pathFile );

        var content = fs.readFileSync(pathFile, 'utf8');

        var html = content;

        //

        const $ = cheerio.load(html);

        //

        var results = [];

        $('.A8OWCb').filter(function(i, el) {
            // this === el
            /*log(chalk.bgGreen('-'));
            log(chalk.blue('i: ') + i );
            log(chalk.blue('el: ') + el );
            log(chalk.blue('$(this): ') + $(this) );
            log(chalk.blue('$(this).children(): ') + $(this).children() );
            log(chalk.blue('$(this).children().first(): ') + $(this).children().first() );
            log(chalk.blue('$(this).children().first().children(): ') + $(this).children().first().children() );*/

            var content = $(this).children().first().children();

            var content = sanitizeHtml(content);
            var content = striptags(content);

            var isEmpty = _.isEmpty(content);

            var price = content;

            log(chalk.blue('isEmpty: ') + isEmpty );
            log(chalk.blue('price: ') + price );

            var object = {
                sku: sku,
                price: price
            };

            results.push(object);

        }).attr('class');

        console.log(results);

        var isEmpty = _.isEmpty(results);

        log(chalk.blue('isEmpty: ') + isEmpty );

        if( isEmpty === true ){
            process.exit();
        }

        //

        log(chalk.yellow('# price sortBy'));

        var price = _.chain(results)
          .sortBy(function(result){ return result.price; })
          .map(function(result){ return /*result.sku + ' is ' + */result.price; })
          .first()
          .value();

         log(chalk.blue('price: ') + price );

         var price = price.replace('R$ ', '');
         var price = price.replace('.', '');
         var price = price.replace(',', '.');

         log(chalk.blue('price: ') + price );

         //

         var baseUrl = 'http://localhost.loc/magento/magento-007/magento/';
         var baseUrl = 'http://phpstack-48796-560820.cloudwaysapps.com/';

         var url = baseUrl + 'index.php/mozg_squidfacil/process/setBestPrice/sku/'+sku+'/price/'+price+'/';

         log(chalk.blue('url: ') + url );

         var options = {
           url: url,
           headers: {
             'User-Agent': 'request'
           }
         };

         function callback(error, response, body) {
             //console.log(error);
             //console.log(response);
             //console.log(body);
             if (!error && response.statusCode == 200) {

                 console.log(body);

             }
         }

         request(options, callback);

         //

         Mozg.Precify.variableObject.processQueue = true;

         //

         /*log(chalk.yellow('# save price json'));

         var pathFile = `${__dirname}/_data/products_SQUID.json`;

         log(chalk.blue('pathFile: ') + pathFile );

         var items = JSON.parse(fs.readFileSync(pathFile, 'utf8'));

         log(chalk.blue('pathFile: ') + pathFile );
         console.log(items);

         items.forEach(function(item) {

             console.log(items);

             var _sku = item.sku;

             log(chalk.blue('_sku: ') + _sku + chalk.blue(' sku: ') + sku);

             if(_sku == sku){
                 item.best_price_web = price;
             }

         });

         log(chalk.yellow('# items'));

         console.log(items);

         log(chalk.yellow('# items save json'));

         var json = JSON.stringify(items);

         console.log(json);

         fs.writeFileSync(pathFile, json);*/

        //

    },

};

//

var exports = module.exports = {};

module.exports = {
  Mozg: Mozg
};

//
