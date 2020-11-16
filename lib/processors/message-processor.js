const _ = require('lodash'),
    Graph = require('./../graph'),
    enums = require('./../common/enum');

class MessengerProcessor {
    constructor(dependencies, networkGraph) {
        this.networkGraph = networkGraph
        this.dependencies = dependencies;
        this.graph = new Graph(dependencies)
    }
    validate(payload) {
        try {
            let me = this;
            let from = payload.body.from, to = payload.body.to
            if (!_.isEqual(me.networkGraph[from]['type'], 'COMPUTER') || !_.isEqual(me.networkGraph[to]['type'], 'COMPUTER'))
                throw new Error(JSON.stringify(enums.errors.invalidSourceOrDestinationMessage))
        } catch (e) {
            throw e;
        }

    }
}

module.exports = MessengerProcessor;