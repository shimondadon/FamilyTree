import { Component, Inject } from '@angular/core';
import { FamilyTreeService } from './services/familyTree.service';
import { FamilyTreeService1 } from './services/familyTree1.service';
import { IFamilyTreeService } from './services/iFamilyTree.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  constructor(public fanilyTreeService: IFamilyTreeService){

  }


  exportToJson(){
    const json :string = JSON.stringify(this.fanilyTreeService.root, (key,value)=>{
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
