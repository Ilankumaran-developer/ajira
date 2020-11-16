const _ = require('lodash'),
adjList = require('./../tests/data/adjList'),
enums = require('./../common/enum');

class Helper {
    constructor(dependencies) {
        this.dependencies = dependencies;
    }

    loadStubData(){
        return adjList

    }

    validateRequest(body, res) {
        try {
            let me = this;
            let payload = {};
            let bArr = body.split('\n')
            payload.command = me.validateCommand(bArr[0])
            payload.body = me.validateBody(bArr)
            return payload;
        } catch (e) {
            res.status(401).end(e.message)
        }
    }

    validateCommand(command) {

        let possibleCommands = ['CREATE /devices', 'CREATE /connections', 'FETCH /devices', 'FETCH /info-routes', 'MODIFY /devices', 'SEND /message'], flag = false;
        for (let cmd of possibleCommands) {
            if (_.startsWith(command, cmd))
                flag = true
        }
        if (!flag)
            throw new Error(JSON.stringify(enums.errors.invalidCommand))
        return command;
    }

    validateBody(arr) {
        let type = '', body = [];
        for (let a of arr) {
            if (a.indexOf('content-type') != -1)
                type = a.split(':')[1];
        }
        if (type != '') {
            let len = arr.length - 1;
            while (len >= 0) {
                if (arr[len] == '')
                    break;
                body.push(arr[len])
                len = len - 1;
            }
            if (body.length > 1)
                throw new Error(JSON.stringify(enums.errors.invalidBody))
            try {
                body = JSON.parse(body[0])
            } catch (e) {
                throw new Error(JSON.stringify(enums.errors.invalidBody))
            }
            if (type.indexOf('json') != -1 && !_.isObject(body))
                throw new Error(JSON.stringify(enums.errors.invalidBody))

        }

        return body;
    }

}

module.exports = Helper;