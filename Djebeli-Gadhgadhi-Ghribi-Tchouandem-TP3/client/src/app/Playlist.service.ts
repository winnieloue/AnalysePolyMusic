import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Config } from './config';
import { tracks} from 'app/Jamendo.service';
import { DZresult} from 'app/Deezer.service';
import { dd} from 'app/Napster.service';


@Injectable()  // Ce service est responsable de la gestion de la playliste
export class PlaylistService {

     /**
     * Handles the current error.
     *
     * @param error                   The error to handle.
     * @return {Promise<object>}      A promise object.
     */
    private static handleError(error: any): Promise<any> { // gérer les cas des erreurs dans les requêtes http
        console.error('An error occurred', error);
        return Promise.reject(error.feedbackMessage || error);
      }

    constructor() { }

      initialize(playlistJamendo : tracks[],playlistDeezer : DZresult[],playlistNapster : dd[]){
          // quand on vient d'ouvrir la page ou de la rafraîchir 
          // Il faut que la playlist contient les chansons choisies déjà
          // et qui sont enregistrées dans le session storage

        for(var i=0; i<sessionStorage.length;i++){
            var id = sessionStorage.key(i);
            if(JSON.parse(sessionStorage.getItem(id)).position){
              playlistJamendo.push(JSON.parse(sessionStorage.getItem(id)));
            }
            else if (JSON.parse(sessionStorage.getItem(id)).title_short){
              playlistDeezer.push(JSON.parse(sessionStorage.getItem(id)));
            }
            else{
              playlistNapster.push(JSON.parse(sessionStorage.getItem(id)));
            }
            
          }

      }

      // Pour l'ajout d'une chanson de Jamendo à la playlist
      addJam(track : tracks, playlistJamendo : tracks[]){
        sessionStorage.setItem(track.id,JSON.stringify(track));
        playlistJamendo.push(track);
      }
      
      // Pour l'ajout d'une chanson de Deezer à la playlist
      addDz(track : DZresult, playlistDeezer : DZresult[]){
        sessionStorage.setItem(track.id,JSON.stringify(track));
        playlistDeezer.push(track);
      }
    
      // Pour l'ajout d'une chanson de Napster à la playlist
      addNap(track : dd, playlistNapster : dd[]){
        sessionStorage.setItem(track.id,JSON.stringify(track));
        playlistNapster.push(track);
      }
    


      // Pour la suppression d'une chanson de Jamendo à la playlist
      deleteJam(play : tracks, playlistJamendo : tracks[]){
        sessionStorage.removeItem(play.id);
        var del = playlistJamendo.indexOf(play);
        playlistJamendo.splice(del,1);
      }
    
      // Pour la suppression d'une chanson de Deezer à la playlist
     deleteDz(play : DZresult, playlistDeezer : DZresult[]){
      sessionStorage.removeItem(play.id);
      var del = playlistDeezer.indexOf(play);
      playlistDeezer.splice(del,1);
    }

    // Pour la suppression d'une chanson de Napster à la playlist
    deleteNap(play : dd, playlistNapster : dd[]){
      sessionStorage.removeItem(play.id);
      var del = playlistNapster.indexOf(play);
      playlistNapster.splice(del,1);
    }

}