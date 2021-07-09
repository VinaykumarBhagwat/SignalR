import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SignalRService } from './signalR.service';
import { NgIdleKeepaliveModule  } from '@ng-idle/keepalive';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';
import { LoanlockComponent } from './loanlock/loanlock.component';

const appRoutes: Routes = [
  {
    path: 'chat', component: ChatComponent
  },
  {
    path: 'loanlock', component: LoanlockComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoanlockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgIdleKeepaliveModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
