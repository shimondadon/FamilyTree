import { FamilyNodeInterface } from "./FamilyNodeIterface";

/**
 * this class is the strucher of the family node
 */
export class FamilyNode implements FamilyNodeInterface {
    constructor(public children: FamilyNode[], public names: string[], public parent?: FamilyNode){
            
    }
}