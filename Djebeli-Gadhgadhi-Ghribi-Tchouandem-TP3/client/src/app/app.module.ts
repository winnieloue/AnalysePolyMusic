import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MusicComponent } from './music/music.component';
import { JamendoService } from './Jamendo.service';
import { DeezerService } from './Deezer.service';
import { NapsterService } from './Napster.service';
import { PlaylistService } from './Playlist.service';
import { GeneratorService } from './musicGenerator.service';
import { AboutComponent } from './about/about.component';

// Application routes
const appRoutes: Routes = [
  { path: '', redirectTo: '/music', pathMatch: 'full' },
  { path: 'music', component: MusicComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MusicComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  providers: [
    JamendoService,
    DeezerService,
    NapsterService,
    PlaylistService,
    GeneratorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
