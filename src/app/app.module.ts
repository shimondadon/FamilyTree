import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { familyCardComponent } from './components/family-card/family-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from 'src/shared/components/toasts/toasts-container';

@NgModule({
  declarations: [
    AppComponent,
    familyCardComponent,
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    NgbModule,
    ToastsContainer

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
