import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { familyCardComponent } from './components/family-card/family-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from 'src/shared/components/toasts/toasts-container';
import { FormsModule } from '@angular/forms';
import { FamilyTreeService } from './services/familyTree.service';

@NgModule({
  declarations: [
    AppComponent,
    familyCardComponent
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    NgbModule,
    ToastsContainer,
    FormsModule
  ],
  providers: [
    { provide: 'IFamilyTreeService', useClass: FamilyTreeService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
