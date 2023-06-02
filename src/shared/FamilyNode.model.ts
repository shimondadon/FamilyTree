/**
 * this class is the strucher of the family node
 */
export class FamilyNode{
    constructor(public children: FamilyNode[], public names: string[], public parent?: FamilyNode){
        this.names = names;
        this.parent = parent;
        this.children = children;
    }
}