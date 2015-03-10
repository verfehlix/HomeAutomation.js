var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var server = http.createServer(app);


// var expressWs = require('express-ws')(app, server);
var plugins = require('./plugins');
var sorting = require("./homescreensortorder");

require("dot").process({
    global: "_page.render",
    destination: __dirname + "/render/",
    path: (__dirname + "/views")
});

var render = require('./render');


var renderDotTemplate = function(bodyfun, options){
    options.body = render[bodyfun](options);
    return render.layout(options);
};



var WebSocketServer = require('ws').Server;
app.ws = function(path, middleware){
    var wss = new WebSocketServer({ server: server, path:path });
    wss.on('connection', function connection(ws) {
        middleware(ws);
    });
};


app.ws('/echo', function(ws) {
    ws.on('message', function(msg) {
        console.log('echo received' + msg);
        ws.send(msg);
    });
});

app.get('/', function(req, res) {
    var homeservices = plugins.getHome();
    var allPlugins = plugins.getAll();
    for (var i = 0; i < homeservices.length; i++) {
        console.log(homeservices[i]);
    }
    res.send(renderDotTemplate("main", {
        title: "HomeAutomation",
        services: homeservices,
        plugins: allPlugins
    }));
});

/*
*   {
        plugin_name: aaa,
        name: bbb,
        service_id: aaabbb,
        services: [yoo, yeah]
        template: blubber
    }
*
*/
var allServices = plugins.getAllServices();

allServices.forEach(function (element, index, array) {
    console.log(element.service_id);
    app.get("/"+element.service_id, function(req, res) {
        res.send('hehehe!');
        if (element.action) element.action();
    });
});

//Plugin Service Lists
var allPlugins = plugins.getAll();
allPlugins.forEach(function (element, index, array) {
    app.get('/'+element.plugin_name, function(req, res) {
        res.send(renderDotTemplate("settings", {
            title: "HomeAutomation",
            services: element.services,
            plugins: allPlugins
        }));
    });
});

app.get("/settings", function(req, res) {
    var allServices = plugins.getAllServices();
    res.send(renderDotTemplate("settings", {
        title: "HomeAutomation",
        services: allServices,
        plugins: allPlugins
    }));
});

app.post("/newhomeorder", function(req, res) {
    console.log(req.body);
    res.send('hehehe!');

    sorting.setPositions(req.body.list);
});

app.get("/download/:system/:id/:name", function(req, res) {
    var id = req.params.id;
    var game = req.params.name;
    var system = req.params.system;
});
// var doT = require('express-dot');


// view engine setup
app.set('views', path.join(__dirname, 'views'));

// app.set('view engine', 'dot' );
// app.engine('html', doT.__express );

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


server.listen(80);

var service = {};
service.addWebservice = function(service, path, cb){
    app.ws(path, function(ws) {
        cb(msg);
        // ws.on('message', function(msg) {
        //     // console.log('echo received' + msg);
        //     // ws.send(msg);
            
        // });
    });
};
module.exports = service;
















