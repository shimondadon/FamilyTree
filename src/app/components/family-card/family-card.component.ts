import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FamilyTreeService } from 'src/app/services/familyTree.service';
import { IFamilyTreeService } from 'src/app/services/iFamilyTree.service';
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
  constructor(@Inject('IFamilyTreeService') public fanilyTreeService: IFamilyTreeService,public toastService: ToastService, public familyTreeService: FamilyTreeService) {
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
   * validate name and call the right function using the serlected radio button
   * and clear the text box
   * @param form 
   * @returns 
   */
  addRelation(form: NgForm) {
    this.relitionType = form.controls['relitionType'].value
    this.newName = form.controls['newName'].value
    this.isValidFormSubmitted = false;
    if (!this.familyTreeService.validateString(this.newName)) {
      return;
    }
    this.isValidFormSubmitted = true;
    switch (form.controls['relitionType'].value) {
      case 'parent':
        this.familyTreeService.addParent(this.node, this.newName);
        break;
      case 'siblin':
        this.familyTreeService.addSiblin(this.node, this.newName);
        break;
      case 'child':
        this.familyTreeService.addChild(this.node, this.newName);
        break;
      case 'partner':
        this.familyTreeService.addPartner(this.node, this.newName);
        break;
    }
    this.newName = '';
    form.resetForm({
      newName: '',
      relitionType: this.relitionType
    })
  }

  /**
   * delete the selected partner from the list 
   * can't remove if we have only one
   * @param name of the partner
   */
  deleteParent(name: string): void {  
    this.familyTreeService.deleteParent(this.node, name);
  }

  /**
   * delete the current family node by remove it from the parent
   * can't remove the root family node
   */
  deleteNode(): void {
    this.familyTreeService.deleteNode(this.node, this.newName);
  }
}
