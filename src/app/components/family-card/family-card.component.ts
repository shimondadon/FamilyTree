import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { FamilyNode } from 'src/shared/FamilyNode.model';

@Component({
  selector: 'app-family-card',
  templateUrl: './family-card.component.html',
  styleUrls: ['./family-card.component.css']
})
export class familyCardComponent {
  constructor(public toastService: ToastService){
    
  }

  @Input()
  node!: FamilyNode;

  @Output() 
  addParentRoot = new EventEmitter<string>();

  
	showSuccess() {
		this.toastService.success('I am a success toast');
	}

  validateString(value: string) : boolean {
    if(value && value.length > 0){
      return true;
    }
    this.toastService.error("Name can't be empty")
    return false;
  }

  deleteParent(name: string) : void {
    if(!this.validateString(name)){
      return;
    } 
    if(this.node.names.length < 2){
      this.toastService.error("You cna't remove the last parent")
    }else if(!this.node.names.includes(name)){
      this.toastService.error("The name is not existing")
    } else {
      this.node.names = this.node.names[0] === name ? [this.node.names[1]] : [this.node.names[1]];
      this.toastService.success("parent is deleted successfully")
    }
  }

  addParent(name: string) : void {
    if(!this.validateString(name)){
      return;
    } 
    if(this.node.parent && this.node.parent.names.length == 2){
      this.toastService.error("You cna't add more parent");
    } else if(this.node.parent) {
      this.node.parent?.names.push(name);
      this.toastService.success("parent is added successfully")
    } else {
      this.addParentRoot.emit(name);
    }
  }

  addSiblin(name: string) : void {
    if(!this.validateString(name)){
      return;
    } 
    if (this.node.parent) {
      var siblin: FamilyNode = new FamilyNode([], [name], this.node.parent);
      this.node.parent.children.push(siblin);
      this.toastService.success("siblin is added successfully")
    } else {
      this.toastService.error("You cna't add more siblin without a parent");
    }
  }

  addChild(name: string) : void {
    if(!this.validateString(name)){
      return;
    } 
    var child: FamilyNode = new FamilyNode([], [name], this.node);
    this.node.children.push(child);
    this.toastService.success("child is added successfully")
  }

  deleteNode() : void {
    if(!this.node.parent){
      this.toastService.error("You cna't delete the root parent"); 
    } else {
      this.node.parent.children = this.node.parent.children.filter(child => child !== this.node)
      this.toastService.success("child is deleted successfully")
    }
  }
}
