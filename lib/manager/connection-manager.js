const _ = require('lodash'),
    Graph = require('./../graph'),
    ConnectionProcessor = require('./../processors/connection-processor'),
    enums = require('./../common/enum');



class ConnectionManager {
    constructor(dependencies, networkGraph) {
        this.networkGraph = networkGraph
        this.dependencies = dependencies
        this.connectionProcessor = new ConnectionProcessor(this.dependencies, this.networkGraph)
        this.graph = new Graph(dependencies)
    }

    process(payload) {
        try {
            let me = this;

            if (payload.command.indexOf('CREATE') != -1) {
                me.connectionProcessor.connectDevices(payload.body)
                return me.networkGraph
            }

        } catch (e) {
            throw e;
        }
    }
}

module.exports = ConnectionManager