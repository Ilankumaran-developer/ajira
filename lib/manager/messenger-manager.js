const _ = require('lodash'),
Graph = require('./../graph'),
MessengerProcessor = require('./../processors/message-processor'),
DeviceManager = require('./../manager/device-manager'),
enums = require('./../common/enum');

class MessengerManager{
    constructor(dependencies, networkGraph){
        this.networkGraph = networkGraph
        this.dependencies = dependencies;
        this.messengerProcessor = new MessengerProcessor(this.dependencies, this.networkGraph)
        this.deviceManager = new DeviceManager(this.dependencies, this.networkGraph)
        this.graph = new Graph(dependencies)
    }

    process(payload){
        try {
            let me = this;
            me.messengerProcessor.validate(payload)
            let routes = me.graph.BST(payload.body.from, payload.body.to, me.networkGraph)
            if (routes.path.indexOf(payload.body.to) == -1)
                throw new Error(JSON.stringify(enums.errors.routeNotFound))
         
            payload.body.case = routes.ucase;
            return me.deviceManager.process(payload);
        } catch (e) {
            throw e;
        }
    }

    
}

module.exports = MessengerManager