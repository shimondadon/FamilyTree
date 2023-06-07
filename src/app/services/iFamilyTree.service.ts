import { Injectable } from "@angular/core";
import { FamilyNode } from "src/shared/FamilyNode.model";
import { FamilyNodeInterface } from "src/shared/FamilyNodeIterface";

@Injectable()
export abstract class IFamilyTreeService{
    abstract root: FamilyNodeInterface;
    abstract validateString(newName: string): boolean;
    abstract addPartner(node: FamilyNode, newName: string): void;
    abstract deleteParent(node: FamilyNode, name: string): void;
    abstract addParent(node: FamilyNode, newName?: string): void;
    abstract addSiblin(node: FamilyNode, newName: string): void;
    abstract addChild(node: FamilyNode, newName: string): void;
    abstract deleteNode(node: FamilyNode, newName: string): void;
}