import { Component } from '@angular/core';
import { MusicService} from 'app/music.service';
import { tracks} from 'app/music.service';
import { DZresult} from 'app/music.service';


/**
 * Defines the component responsible to display the home page.
 */
@Component({
  selector: 'music',
  templateUrl:'./music.component.html'
})
export class MusicComponent {

  keys : string;
  tracksJamendo =[];
  tracksDeezer =[];
  playlistJamendo= [];
  playlistDeezer= [];

  constructor( private MusicService: MusicService) { }
  ngOnInit(){
    for(var i=0; i<localStorage.length;i++){
      var id = localStorage.key(i);
      if(JSON.parse(localStorage.getItem(id)).name){
        this.playlistJamendo.push(JSON.parse(localStorage.getItem(id)));
      }
      else{
        this.playlistDeezer.push(JSON.parse(localStorage.getItem(id)));
      }
      
    }

  }


  submit() {
    this.tracksJamendo =[];
    var k = 0 ;
    this.tracksDeezer =[];
    var l = 0 ;
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

this.MusicService.getDeezerTrack(this.keys).then(data => {
  console.log(data);
  var total= data["data"].length;
  if(total!=0){
    for(var i=0;i < total;i++){
      var result = data["data"][i];
        this.tracksDeezer[l]=result;
        l=l+1
      }
    }
});

  }

  addJamendo(track : tracks){
    localStorage.setItem(track.name,JSON.stringify(track));
    this.playlistJamendo.push(track);
  }

  addDeezer(track : DZresult){
    localStorage.setItem(track.title,JSON.stringify(track));
    this.playlistDeezer.push(track);
  }


  deleteJamendo(play : tracks){
    localStorage.removeItem(play.name);
    var del = this.playlistJamendo.indexOf(play);
    this.playlistJamendo.splice(del,1);
  }

 deleteDeezer(play : DZresult){
  localStorage.removeItem(play.title);
  var del = this.playlistDeezer.indexOf(play);
  this.playlistDeezer.splice(del,1);
}
}
