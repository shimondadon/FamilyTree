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

  /**
   * change the current family root node to new family node by input name 
   * @param name 
   */
  addParentRoot(name:string) :void{
    let parent = new FamilyNode([this.family], [name], undefined);
    this.family.parent = parent;
    this.family = parent;
  }

  exportToJson(){
    const json :string = JSON.stringify(this.family, (key,value)=>{
      if(key=== 'parent')
      return;
      return value;
    });
    console.log(json);

    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([json], {type: 'text/json'}));
    a.download = 'test.json';

    // Append anchor to body.
    document.body.appendChild(a);
    a.click();

    // Remove anchor from body
    document.body.removeChild(a);
  }
}
