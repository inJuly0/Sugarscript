import ASTNode = require('../Parser/node')

class Scope{
    parent: Scope;
    table: Map<string, ASTNode>
    
    constructor(parent: Scope){
        this.parent = parent;
        this.table = new Map<string, ASTNode>();
    }

    define(name: string, node: ASTNode){
        this.table.set(name, node)
    }

    find(name: string){
        if (!this.table.has(name)){
            if(!this.parent) return null;
            return this.parent.find(name)
        }
        return this.table.get(name)
    }

}

export = Scope