import { Component, Inject } from '@angular/core';
import { FamilyTreeService } from './services/familyTree.service';
import { IFamilyTreeService } from './services/iFamilyTree.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  
  constructor(public fanilyTreeService: FamilyTreeService){

  }

}
