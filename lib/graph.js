const _ = require('lodash'),
enums = require('./common/enum');


class Graph{
    constructor(dependencies){
        this.dependencies = dependencies;
    }

    add(component, networkGraph){
        let me = this;
        try{
            if(!networkGraph[component.name]){
                networkGraph[component.name] = {}
                networkGraph[component.name]['name'] = component.name;
                networkGraph[component.name]['type'] = component.type;
                networkGraph[component.name]['strength'] = 5;
                networkGraph[component.name]['messages'] = []
                networkGraph[component.name]['adj'] = []
                if(_.isEqual(component.type, 'BRIDGE'))
                networkGraph[component.name]['bridgeOp'] = component.bridgeOp;
            }
                

        }catch(e){
            throw e;
        }
    }

    connect(source, target){
        if(source.adj.indexOf(target.name) == -1)
            source.adj.push(target.name)
        if(target.adj.indexOf(source.name) == -1)
            target.adj.push(source.name);
    }

    BFS(from, to, networkGraph){
        let me = this, ucase = -1;
        let queue = [], visited = [], str = networkGraph[from].strength, i = 0;
        queue.push(networkGraph[from])
        while(queue.length > 0 && str > 0){
            let s = queue.shift()
            if(_.isEqual(s.name, to)){
                visited.push(s.name)
                queue = []
                continue;
            }
            if(i > 0 && !_.isEqual(s.type, enums.type.REPEATER)){
                
                if(_.isEqual(s.type, enums.type.BRIDGE)){
                    ucase = s.bridgeOp == 'UPPER' ? 1 : 0;
                    str = str - 2;
                }
                else{
                    str = str - 1;
                }
                    

            }   
            else if(i > 0 && _.isEqual(s.type, enums.type.REPEATER))
                str = str * 2;
            if(visited.indexOf(s.name) == -1)
                visited.push(s.name)
            for(let adj of s.adj){
                if(visited.indexOf(adj) == -1)
                    queue.push(networkGraph[adj])
            }
            i = i+1;
        }
        return {'path': visited, 'ucase': ucase};
    }

  
    

}

module.exports = Graph;