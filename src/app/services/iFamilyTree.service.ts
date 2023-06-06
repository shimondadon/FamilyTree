import { FamilyNode } from "src/shared/FamilyNode.model";
import { FamilyNodeInterface } from "src/shared/FamilyNodeIterface";

export interface IFamilyTreeService{
    root: FamilyNodeInterface;
    validateString(newName: string): boolean;
    addPartner(node: FamilyNode, newName: string): void;
    deleteParent(node: FamilyNode, name: string): void;
    addParent(node: FamilyNode, newName?: string): void;
    addSiblin(node: FamilyNode, newName: string): void;
    addChild(node: FamilyNode, newName: string): void;
    deleteNode(node: FamilyNode, newName: string): void;
}