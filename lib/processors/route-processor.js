const _ = require('lodash'),
    Graph = require('./../graph'),
    enums = require('./../common/enum');

class RoutesProcessor {
    constructor(dependencies, networkGraph) {
        this.networkGraph = networkGraph
        this.dependencies = dependencies;
        this.graph = new Graph(dependencies)
    }

    fetchRoutes(payload) {
        let me = this;
        let from, to;
        let command = payload.command
        command = command.split('?')[1]
        command = command.split('&')
        from = command[0].split('=')[1]
        to = command[1].split('=')[1]
        if (_.isEmpty(me.networkGraph[from]) || _.isEmpty(me.networkGraph[to]))
            throw new Error(JSON.stringify(enums.errors.invalidDevices))
        else if (!_.isEqual(me.networkGraph[from]['type'], 'COMPUTER') || !_.isEqual(me.networkGraph[to]['type'], 'COMPUTER'))
            throw new Error(JSON.stringify(enums.errors.invalidSourceOrDestination))
        else {

            let devices = me.graph.BFS(from, to, me.networkGraph)
            if (devices.path.indexOf(to) == -1)
                throw new Error(JSON.stringify(enums.errors.routeNotFound))

            return devices.path.join(',')
        }

    }
}

module.exports = RoutesProcessor;