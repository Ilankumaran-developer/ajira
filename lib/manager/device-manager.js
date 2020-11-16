const _ = require('lodash'),
    Graph = require('./../graph'),
    DeviceProcessor = require('./../processors/device-processor'),
    enums = require('./../common/enum');

class DeviceManager {
    constructor(dependencies, networkGraph) {
        this.networkGraph = networkGraph
        this.graph = new Graph(dependencies)
        this.deviceProcessor = new DeviceProcessor(this.dependencies, this.networkGraph)
        this.dependencies = dependencies
    }

    process(payload) {
        try {
            let me = this;

            if (payload.command.indexOf('CREATE') != -1) {
                me.graph.add(payload.body, me.networkGraph)
                return me.networkGraph
            }
            else if (payload.command.indexOf('MODIFY') != -1) {
                me.deviceProcessor.addStrength(payload)
                return me.networkGraph
            }
            else if (payload.command.indexOf('FETCH') != -1) {
                return me.networkGraph
            }
            else if (payload.command.indexOf('SEND') != -1) {
                me.deviceProcessor.sendMessage(payload)
                return me.networkGraph
            }


        } catch (e) {
            throw e;
        }
    }
}

module.exports = DeviceManager