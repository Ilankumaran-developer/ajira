const _ = require('lodash'),
    Graph = require('./../graph'),
    enums = require('./../common/enum');

class RoutesProcessor {
    constructor(dependencies, networkGraph) {
        this.networkGraph = networkGraph
        this.dependencies = dependencies;
        this.graph = new Graph(dependencies)
    }

    messageFormat(message, payload) {
        if (payload.body.case == 1)
            message.message = _.toUpper(payload.body.message);
        else if (payload.body.case == 0)
            message.message = _.toLower(payload.body.message);
        else
            message.message = payload.body.message;
    }

    sendMessage(payload) {
        try {
            let me = this;
            let message = {};
            message.from = payload.body.from;
            message.to = payload.body.to;
            me.messageFormat(message, payload);
            me.networkGraph[message.to]['messages'].push(message);
        } catch (e) {
            throw e;
        }
    }

    addStrength(payload) {
        let me = this;
        let command = payload.command
        command = command.split(' ')[1]
        command = command.split('/');
        let i = -1;
        for (let key of Object.keys(me.networkGraph)) {
            if (command.indexOf(key) != -1) {
                i = key;
                break;
            }
        }
        if (i == -1 || !_.isEqual(me.networkGraph[i]['type'], 'COMPUTER'))
            throw new Error(JSON.stringify(enums.errors.invalidModification))
        if (isNaN(payload.body.value) || payload.body.value < 0)
            throw new Error(JSON.stringify(enums.errors.invalidStrength))
        me.networkGraph[i]['strength'] = payload.body.value
    }  

}

module.exports = RoutesProcessor;