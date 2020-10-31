
const enums = require('./../common/enum'),
Graph = require('./../graph')
_ = require('lodash');

class NetworkRouteHandler extends Graph{
    constructor(dependencies){
        super(dependencies)
        this.dependencies = dependencies;
    }
   

    process(req, res, next){
        let me = this;
        try{
            let payload = me.validateRequest(req.body, res), resp ;
            if(payload.command.indexOf('routes') != -1)
                resp = me.routeProcessor(payload)
            else if(payload.command.indexOf('devices') != -1)
                resp = me.deviceProcessor(payload)
            else if(payload.command.indexOf('connections') != -1)
                resp = me.connectionProcessor(payload)
                
            res.send(resp)
        }catch(e){

            res.status(401).end(e.message)
        }
    }

    fetchRoutes(payload){
        let me = this;
        let from, to;
        let command = payload.command
        command = command.split('?')[1]
        command = command.split('&')
        from = command[0].split('=')[1]
        to = command[1].split('=')[1]
        if(_.isEmpty(me.networkGraph[from]) || _.isEmpty(me.networkGraph[to]))
            throw new Error(JSON.stringify(enums.errors.invalidDevices))
        else if(!_.isEqual(me.networkGraph[from]['type'], 'COMPUTER') || !_.isEqual(me.networkGraph[to]['type'], 'COMPUTER'))
            throw new Error(JSON.stringify(enums.errors.invalidSourceOrDestination))
        else{

           let devices = me.BST(from, to)
           if(devices.indexOf(to) == -1)
            throw new Error(JSON.stringify(enums.errors.routeNotFound))

            return devices.join(',')
        }
           
    }

    routeProcessor(payload){
        try{
            let me = this;

            if(payload.command.indexOf('FETCH') != -1)
               return me.fetchRoutes(payload)
            
        }catch(e){
            throw e;
        }
    }

    connectDevices(connection){
        let me = this;

            let source = me.networkGraph[connection.source]
            if(!_.isEmpty(source)){
                for(let target of connection.targets){
                    let targetInNet = me.networkGraph[target]
                    if(_.isEmpty(targetInNet))
                        throw new Error(JSON.stringify(enums.errors.sourceordestinationNotFound)) 
                    else
                        me.connect(source, targetInNet)  
                }
            }
            else 
                throw new Error(JSON.stringify(enums.errors.sourceordestinationNotFound)) 
    }

    connectionProcessor(payload){
        try{
            let me = this;

            if(payload.command.indexOf('CREATE') != -1){
                me.connectDevices(payload.body)
                return me.networkGraph
            }
            
        }catch(e){
            throw e;
        }
    }

    deviceProcessor(payload){
        try{
            let me = this;

            if(payload.command.indexOf('CREATE') != -1){
                me.add(payload.body)
                return me.networkGraph
            }
            else if(payload.command.indexOf('MODIFY') != -1){
                me.addStrength(payload)
                return me.networkGraph
            }
            else if(payload.command.indexOf('FETCH') != -1){
                return me.networkGraph
            }
                
            
        }catch(e){
            throw e;
        }
    }

    addStrength(payload){
        let me = this;
        let command = payload.command
        command = command.split(' ')[1]
        command = command.split('/');
        let i = -1;
        for(let key of Object.keys(me.networkGraph)){
            if(command.indexOf(key) != -1){
                i = key;
                break;
            }      
        }
        if(i == -1 || !_.isEqual(me.networkGraph[i]['type'], 'COMPUTER') )
            throw new Error(JSON.stringify(enums.errors.invalidModification))
        if(isNaN(payload.body.value) || payload.body.value < 0)
            throw new Error(JSON.stringify(enums.errors.invalidStrength))
        me.networkGraph[i]['strength'] = payload.body.value
    }

    validateRequest(body, res){
        try{
            let me = this;
            let payload = {};
            let bArr = body.split('\n')
            payload.command = me.validateCommand(bArr[0])
            payload.body = me.validateBody(bArr)
            return payload;
        }catch(e){

            res.status(401).end(e.message)
        }
       
    }

    validateBody(arr){
        let type = '', body = [];
        for(let a of arr){
            if(a.indexOf('content-type') != -1)
                type = a.split(':')[1];
        }
        if(type != ''){
            let len = arr.length-1;
            while(len >= 0){
                if(arr[len] == '')
                    break;
                body.push(arr[len])
                len = len-1;
            }
            if(body.length > 1)
                throw new Error(JSON.stringify(enums.errors.invalidBody))
                try{
                    body = JSON.parse(body[0])
                }catch(e){
                    throw new Error(JSON.stringify(enums.errors.invalidBody))
                }  
            if(type.indexOf('json') != -1 && !_.isObject(body))
                throw new Error(JSON.stringify(enums.errors.invalidBody))
  
        }

        return body;
    }

    validateCommand(command){

        let possibleCommands = ['CREATE /devices', 'CREATE /connections', 'FETCH /devices', 'FETCH /info-routes', 'MODIFY /devices'], flag = false;
        for(let cmd of possibleCommands){
            if(_.startsWith(command,cmd ))
                flag = true
        }
        if(!flag)
            throw new Error(JSON.stringify(enums.errors.invalidCommand))
        return command;
    }
}

module.exports  = NetworkRouteHandler;