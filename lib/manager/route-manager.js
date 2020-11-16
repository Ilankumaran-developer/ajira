const _ = require('lodash'),
Graph = require('./../graph'),
RoutesProcessor = require('./../processors/route-processor'),
enums = require('./../common/enum');

class RoutesManager{
    constructor(dependencies, networkGraph){
        this.networkGraph = networkGraph
        this.dependencies = dependencies;
        this.routesProcessor = new RoutesProcessor(this.dependencies, this.networkGraph)
        this.graph = new Graph(dependencies)
    }

    process(payload){
        try {
            let me = this;
            if (payload.command.indexOf('FETCH') != -1) {
                let routesExist = me.routesProcessor.fetchRoutes(payload)
                return routesExist;
            }
        } catch (e) {
            throw e;
        }
    }

    
}

module.exports = RoutesManager