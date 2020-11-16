
const enums = require('./../common/enum'),
    devMode = true,
    Helper = require('./../common/helper'),
    DeviceManager = require('./../manager/device-manager'),
    RouteManager = require('./../manager/route-manager'),
    ConnectionManager = require('./../manager/connection-manager'),
    MessengerManager = require('./../manager/messenger-manager'),
    _ = require('lodash');

class NetworkRouteHandler {
    constructor(dependencies) {
        this.networkGraph = {};
        this.helper = new Helper(dependencies)
        if (process.argv.indexOf('withstub') != -1) {
            this.networkGraph = this.helper.loadStubData()
        }
        this.dependencies = dependencies;
        this.deviceManager = new DeviceManager(dependencies, this.networkGraph)
        this.routeManager = new RouteManager(dependencies, this.networkGraph)
        this.connectionManager = new ConnectionManager(dependencies, this.networkGraph)
        this.messengerManager = new MessengerManager(dependencies, this.networkGraph)
       
    }


    process(req, res, next) {
        let me = this;
        try {
            let payload = me.helper.validateRequest(req.body, res), resp;
            if (payload.command.indexOf('routes') != -1)
                resp = me.routeManager.process(payload)
            else if (payload.command.indexOf('devices') != -1)
                resp = me.deviceManager.process(payload)
            else if (payload.command.indexOf('connections') != -1)
                resp = me.connectionManager.process(payload)
            else if (payload.command.indexOf('message') != -1)
                resp = me.messengerManager.process(payload)

            res.send(resp)
        } catch (e) {
            res.status(401).end(e.message)
        }
    }

}

module.exports = NetworkRouteHandler;