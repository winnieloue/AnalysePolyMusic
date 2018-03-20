import { Component } from '@angular/core';
import { MusicService} from 'app/music.service';
import { tracks} from 'app/music.service';
import { DZresult} from 'app/music.service';
import { dd} from 'app/music.service';


/**
 * C'est le controlleur qui génèrera les résultats requis par le html
 */
@Component({
  selector: 'music',
  templateUrl:'./music.component.html'
})
export class MusicComponent {

  keys : string;
  tracksJamendo =[];
  tracksDeezer =[];
  tracksNapster =[];
  playlistJamendo= [];
  playlistDeezer= [];
  playlistNapster= [];

  constructor( private MusicService: MusicService) { }
  ngOnInit(){ // quand la page est chargée, il faut rétablir la liste des playlists enregistrées
    for(var i=0; i<sessionStorage.length;i++){
      var id = sessionStorage.key(i);
      if(JSON.parse(sessionStorage.getItem(id)).position){
        this.playlistJamendo.push(JSON.parse(sessionStorage.getItem(id)));
      }
      else if (JSON.parse(sessionStorage.getItem(id)).title_short){
        this.playlistDeezer.push(JSON.parse(sessionStorage.getItem(id)));
      }
      else{
        this.playlistNapster.push(JSON.parse(sessionStorage.getItem(id)));
      }
      
    }

  }


  submit() { // quand on valide la recherche (en cliquent sur le bouton ou sur ENTER)
    this.tracksJamendo =[];
    var k = 0 ;
    this.tracksDeezer =[];
    var l = 0 ;
    this.tracksNapster =[];
    var j = 0 ;

    // faire la requête pour Jamendo
    this.MusicService.getJamendoTracks(this.keys).then(data => {
      var headers= data["headers"];
      if(headers["results_count"]!=0){
        for(var i=0;i < headers["results_count"];i++){
          var result = data["results"][i];
          for(var j=0;j<result["tracks"].length;j++){
            this.tracksJamendo[k]=result["tracks"][j];
            k=k+1
          }
        }
      }
});



this.MusicService.getJamendoArtists(this.keys).then(data => {
  var headers= data["headers"];
  if(headers["results_count"]!=0){
    for(var i=0;i < headers["results_count"];i++){
      var result = data["results"][i];
      for(var j=0;j<result["tracks"].length;j++){
        this.tracksJamendo[k]=result["tracks"][j];
        k=k+1
      }
    }
  }
});




this.MusicService.getJamendoAlbums(this.keys).then(data => {
  var headers= data["headers"];
  if(headers["results_count"]!=0){
    for(var i=0;i < headers["results_count"];i++){
      var result = data["results"][i];
      for(var j=0;j<result["tracks"].length;j++){
        this.tracksJamendo[k]=result["tracks"][j];
        k=k+1
      }
    }
  }
});

// faire la requête pour Deezer
this.MusicService.getDeezerTrack(this.keys).then(data => {
  var total= data["data"].length;
  if(total!=0){
    for(var i=0;i < total;i++){
      var result = data["data"][i];
        this.tracksDeezer[l]=result;
        l=l+1
      }
    }
});


// faire la requête pour Napster
this.MusicService.getNapster(this.keys).then(data => {
  var total= data["meta"]["returnedCount"];
  if(total!=0){
    for(var i=0;i < total;i++){
      var result = data["data"][i];
        this.tracksNapster[j]=result;
        j=j+1
      }
    }
});

  }


  // Pour ajouter des éléments dans la playlist
  addJamendo(track : tracks){
    sessionStorage.setItem(track.id,JSON.stringify(track));
    this.playlistJamendo.push(track);
  }

  addDeezer(track : DZresult){
    sessionStorage.setItem(track.id,JSON.stringify(track));
    this.playlistDeezer.push(track);
  }

  addNapster(track : dd){
    sessionStorage.setItem(track.id,JSON.stringify(track));
    this.playlistNapster.push(track);
  }

  // Pour supprimer des éléments de la playlist
  deleteJamendo(play : tracks){
    sessionStorage.removeItem(play.id);
    var del = this.playlistJamendo.indexOf(play);
    this.playlistJamendo.splice(del,1);
  }

 deleteDeezer(play : DZresult){
  sessionStorage.removeItem(play.id);
  var del = this.playlistDeezer.indexOf(play);
  this.playlistDeezer.splice(del,1);
}
deleteNapster(play : dd){
  sessionStorage.removeItem(play.id);
  var del = this.playlistNapster.indexOf(play);
  this.playlistNapster.splice(del,1);
}
}
