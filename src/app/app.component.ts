import { Component } from '@angular/core';
import { FamilyNode as FamilyNode } from 'src/shared/FamilyNode.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  me: FamilyNode = new FamilyNode([], ['Me'],undefined);
  
  family: FamilyNode = this.me;

  addParentRoot(name:string) :void{
    var parent = new FamilyNode([this.family], [name], undefined);
    this.family.parent = parent;
    this.family = parent;
  }
}
