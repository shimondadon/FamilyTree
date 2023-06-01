import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { FamilyNode } from 'src/shared/FamilyNode.model';

@Component({
  selector: 'app-family-card',
  templateUrl: './family-card.component.html',
  styleUrls: ['./family-card.component.css']
})
export class familyCardComponent {
  constructor(public toastService: ToastService) {
    this.time = new Date().getTime();
  }

  @Input()
  node!: FamilyNode;

  @Output()
  addParentRoot = new EventEmitter<string>();

  relitionType: string = 'parent';
  newName: string = '';
  isValidFormSubmitted: boolean = true;
  time: number = 1;

  showSuccess() {
    this.toastService.success('I am a success toast');
  }

  validateString(): boolean {
    if (this.newName && this.newName.length > 0) {
      return true;
    }
    this.toastService.error("Name can't be empty")
    return false;
  }

  addRelation(form: NgForm) {
    this.relitionType = form.controls['relitionType'].value
    this.newName = form.controls['newName'].value
    console.log("name", this.newName, this.relitionType);
    this.isValidFormSubmitted = false;
    if (!this.validateString()) {
      return;
    }
    this.isValidFormSubmitted = true;
    console.log(' ssss', form.controls);
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
    //this.user.gender = form.controls['gender'].value;
  }
  addPartner() {
    if (this.node.names.length === 2) {
      this.toastService.error("You cna't add more partner")
    } else {
      this.node.names.push(this.newName);
    }
  }

  deleteParent(name: string): void {    
    if (this.node.names.length < 2) {
      this.toastService.error("You cna't remove the last parent")
    } else if (!this.node.names.includes(name)) {
      this.toastService.error("The name is not existing")
    } else {
      this.node.names = this.node.names[0] === name ? [this.node.names[1]] : [this.node.names[0]];
      this.toastService.success("parent is deleted successfully")
    }
  }

  addParent(): void {
    if (this.node.parent && this.node.parent.names.length == 2) {
      this.toastService.error("You cna't add more parent");
    } else if (this.node.parent) {
      this.node.parent?.names.push(this.newName);
      this.toastService.success("parent is added successfully")
    } else {
      this.addParentRoot.emit(this.newName);
    }
  }

  addSiblin(): void {
    if (this.node.parent) {
      var siblin: FamilyNode = new FamilyNode([], [this.newName], this.node.parent);
      this.node.parent.children.push(siblin);
      this.toastService.success("siblin is added successfully")
    } else {
      this.toastService.error("You cna't add more siblin without a parent");
    }
  }

  addChild(): void {
    var child: FamilyNode = new FamilyNode([], [this.newName], this.node);
    this.node.children.push(child);
    this.toastService.success("child is added successfully")
  }

  deleteNode(): void {
    if (!this.node.parent) {
      this.toastService.error("You cna't delete the root parent");
    } else {
      this.node.parent.children = this.node.parent.children.filter(child => child !== this.node)
      this.toastService.success("child is deleted successfully")
    }
  }
}
