import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { familyCardComponent } from './components/family-card/family-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from 'src/shared/components/toasts/toasts-container';
import { FormsModule } from '@angular/forms';
import { IFamilyTreeService } from './services/iFamilyTree.service';
import { environment } from './../environments/environment';

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
    { provide: IFamilyTreeService, useClass: environment.familyService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
