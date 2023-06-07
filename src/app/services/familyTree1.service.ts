import { Injectable, TemplateRef } from '@angular/core';
import { FamilyNode } from 'src/shared/FamilyNode.model';
import { FamilyNodeInterface } from 'src/shared/FamilyNodeIterface';
import { IFamilyTreeService } from './iFamilyTree.service';
import { ToastService } from './toast.service';

/**
 * Show toast on the page with the input message and type 
 */
@Injectable({ providedIn: 'root'})
export class FamilyTreeService1 implements IFamilyTreeService {
	root: FamilyNodeInterface = new FamilyNode([], ['I am '],undefined);

	constructor(public toastService: ToastService){
		
	}

  /**
   * validate the name is not empty or blanks
   * @returns boolean true if the name is valid
   */
   validateString(newName: string): boolean {
    if (newName && newName.length > 0) {
      return true;
    }
    this.toastService.error("Name can't be empty")
    return false;
  }

  /**
   * add partner to the current family node can't add mmore the 2 in total
   */
  addPartner(node: FamilyNode, newName: string): void {
    if (node.names.length === 2) {
      this.toastService.error("You cna't add more partner")
    } else {
      node.names.push(newName);
      this.toastService.success("partner is added successfully")
    }
	
  }

  /**
   * delete the selected partner from the list 
   * can't remove if we have only one
   * @param name of the partner
   */
  deleteParent(node: FamilyNode, name: string): void {    
    if (node.names.length < 2) {
      this.toastService.error("You cna't remove the last parent")
    } else {
      node.names = node.names[0] === name ? [node.names[1]] : [node.names[0]];
      this.toastService.success("parent is deleted successfully")
    }
  }

  /**
   * add parent to the curent family node 
   * if this is the root family node we call other function because we need to change the root family node(and we dont have access to it)
   * can't add if we have two parents already, 
   */
  addParent(node: FamilyNode, newName?: string): void {
    if (node.parent && node.parent.names.length == 2) {
      this.toastService.error("You cna't add more parent");
    } else if (node.parent) {
		if(newName)
      		node.parent?.names.push(newName);
    } else {
		var parent = new FamilyNode([this.root], newName ? [newName] : [], undefined);
    	this.root.parent = parent;
    	this.root = parent;
    }
    this.toastService.success("parent is added successfully")
  }

  /**
   * add siblin to current family node by adding child to the parent
   * can't add siblin if we dont have a parent
   */
  addSiblin(node: FamilyNode, newName: string): void {
    if (!node.parent) {
		this.addParent(node, undefined);
	}
	var siblin: FamilyNode = new FamilyNode([], [newName], node.parent);
	node.parent?.children.push(siblin);
	this.toastService.success("siblin is added successfully")
  }

  /**
   * add child to the curent family node
   */
  addChild(node: FamilyNode, newName: string): void {
    var child: FamilyNode = new FamilyNode([], [newName], node);
    node.children.push(child);
    this.toastService.success("child is added successfully")
  }

  /**
   * delete the current family node by remove it from the parent
   * can't remove the root family node
   */
  deleteNode(node: FamilyNode, newName: string): void {
    if (!node.parent) {
      this.toastService.error("You cna't delete the root parent");
    } else {
      node.parent.children = node.parent.children.filter(child => child !== node)
      this.toastService.success("child is deleted successfully")
    }
  }
}