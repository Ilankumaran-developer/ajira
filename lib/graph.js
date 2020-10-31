const _ = require('lodash'),
enums = require('./common/enum');


class Graph{
    constructor(dependencies){
        this.dependencies;
        this.networkGraph = {}
    }

    add(component){
        let me = this;
        try{
            if(!me.networkGraph[component.name]){
                me.networkGraph[component.name] = {}
                me.networkGraph[component.name]['name'] = component.name;
                me.networkGraph[component.name]['type'] = component.type;
                me.networkGraph[component.name]['strength'] = 5;
                me.networkGraph[component.name]['adj'] = []
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

    BST(from, to){
        let me = this;
        let queue = [], visited = [], str = me.networkGraph[from], i = 0;
        queue.push(me.networkGraph[from])
        while(queue.length > 0 || str > 0){
            let s = queue.shift()
            if(_.isEqual(s.name, to)){
                visited.push(s.name)
                queue = []
                continue;
            }
            if(i > 0 && _.isEqual(s.type, enums.type.COMPUTER))
                str = str - 1
            else if(i > 0 && _.isEqual(s.type, enums.type.REPEATER))
                str = str * 2;
            if(visited.indexOf(s.name) == -1)
                visited.push(s.name)
            for(let adj of s.adj){
                if(visited.indexOf(adj) == -1)
                    queue.push(me.networkGraph[adj])
            }
            i = i+1;
        }
        return visited;
    }

  
    

}

module.exports = Graph;