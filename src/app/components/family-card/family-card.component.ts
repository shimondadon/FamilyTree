import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { FamilyNode } from 'src/shared/FamilyNode.model';

/**
 * this class handle all the events on a family node
 */
@Component({
  selector: 'app-family-card',
  templateUrl: './family-card.component.html',
  styleUrls: ['./family-card.component.css']
})
export class familyCardComponent {
  constructor(public toastService: ToastService) {
    this.time = new Date().getTime();
    this.newName = '';
  }

  @Input()
  node!: FamilyNode;

  @Output()
  addParentRoot = new EventEmitter<string>();

  relitionType: string = 'parent';
  newName: string = '';
  isValidFormSubmitted: boolean = true;
  time: number = 1;

  /**
   * validate the name is not empty or blanks
   * @returns boolean true if the name is valid
   */
  validateString(): boolean {
    if (this.newName && this.newName.length > 0) {
      return true;
    }
    this.toastService.error("Name can't be empty")
    return false;
  }

  /**
   * validate name and call the right function using the serlected radio button
   * and clear the text box
   * @param form 
   * @returns 
   */
  addRelation(form: NgForm) {
    this.relitionType = form.controls['relitionType'].value
    this.newName = form.controls['newName'].value
    this.isValidFormSubmitted = false;
    if (!this.validateString()) {
      return;
    }
    this.isValidFormSubmitted = true;
    switch (form.controls['relitionType'].value) {
      case 'parent':
        this.addParent();
        break;
      case 'siblin':
        this.addSiblin();
        break;
      case 'child':
        this.addChild();
        break;
      case 'partner':
        this.addPartner();
        break;
    }
    this.newName = '';
    form.resetForm({
      newName: '',
      relitionType: this.relitionType
    })
  }

  /**
   * add partner to the current family node can't add mmore the 2 in total
   */
  addPartner() {
    if (this.node.names.length === 2) {
      this.toastService.error("You cna't add more partner")
    } else {
      this.node.names.push(this.newName);
      this.toastService.success("partner is added successfully")
    }
  }

  /**
   * delete the selected partner from the list 
   * can't remove if we have only one
   * @param name of the partner
   */
  deleteParent(name: string): void {    
    if (this.node.names.length < 2) {
      this.toastService.error("You cna't remove the last parent")
    } else {
      this.node.names = this.node.names[0] === name ? [this.node.names[1]] : [this.node.names[0]];
      this.toastService.success("parent is deleted successfully")
    }
  }

  /**
   * add parent to the curent family node 
   * if this is the root family node we call other function because we need to change the root family node(and we dont have access to it)
   * can't add if we have two parents already, 
   */
  addParent(): void {
    if (this.node.parent && this.node.parent.names.length == 2) {
      this.toastService.error("You cna't add more parent");
    } else if (this.node.parent) {
      this.node.parent?.names.push(this.newName);
    } else {
      this.addParentRoot.emit(this.newName);
    }
    this.toastService.success("parent is added successfully")
  }

  /**
   * add siblin to current family node by adding child to the parent
   * can't add siblin if we dont have a parent
   */
  addSiblin(): void {
    if (this.node.parent) {
      var siblin: FamilyNode = new FamilyNode([], [this.newName], this.node.parent);
      this.node.parent.children.push(siblin);
      this.toastService.success("siblin is added successfully")
    } else {
      this.toastService.error("You cna't add more siblin without a parent");
    }
  }

  /**
   * add child to the curent family node
   */
  addChild(): void {
    var child: FamilyNode = new FamilyNode([], [this.newName], this.node);
    this.node.children.push(child);
    this.toastService.success("child is added successfully")
  }

  /**
   * delete the current family node by remove it from the parent
   * can't remove the root family node
   */
  deleteNode(): void {
    if (!this.node.parent) {
      this.toastService.error("You cna't delete the root parent");
    } else {
      this.node.parent.children = this.node.parent.children.filter(child => child !== this.node)
      this.toastService.success("child is deleted successfully")
    }
  }
}
