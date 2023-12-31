import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayComponent } from './components/play.component';
import { UploadComponent } from './components/upload.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { UploadService } from './upload.service';

const appRoutes: Routes = [
  { path: '', component: UploadComponent },
  { path: 'play/:id', component: PlayComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
