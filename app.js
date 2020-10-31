const express = require('express');
const path = require('path'),
bodyParser = require('body-parser'),
http = require('http'),
enums = require('./lib/common/enum'),
RouteHandler = require('./lib/routes');
let app = null, routes  = null;

class AppLoader {
    constructor(){

        this.dependencies = {}
        this.loadApp()
    }
    loadApp(){
        app = express()
        app.use(bodyParser.text({type: "*/*"}))
        this.dependencies.app = app;
        routes = RouteHandler(this.dependencies)
        app.post('/ajiranet/process', (req,res, next)=>{routes.network.process(req, res, next)})
        app.get('/hello', (req,res)=>{
            res.send('Hello world')
        })
        let server = http.createServer(app)
        server.listen('8000');
        console.log(enums.message.Welcome)
    }
}

module.exports = AppLoader