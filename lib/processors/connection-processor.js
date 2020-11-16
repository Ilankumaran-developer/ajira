const _ = require('lodash'),
    Graph = require('./../graph'),
    enums = require('./../common/enum');

class ConnectionProcessor {
    constructor(dependencies, networkGraph) {
        this.networkGraph = networkGraph
        this.dependencies = dependencies;
        this.graph = new Graph(dependencies)
    }
    connectDevices(connection) {
        let me = this;

        let source = me.networkGraph[connection.source]
        if (!_.isEmpty(source)) {
            for (let target of connection.targets) {
                let targetInNet = me.networkGraph[target]
                if (_.isEmpty(targetInNet))
                    throw new Error(JSON.stringify(enums.errors.sourceordestinationNotFound))
                else
                    me.graph.connect(source, targetInNet)
            }
        }
        else
            throw new Error(JSON.stringify(enums.errors.sourceordestinationNotFound))
    }


}

module.exports = ConnectionProcessor;