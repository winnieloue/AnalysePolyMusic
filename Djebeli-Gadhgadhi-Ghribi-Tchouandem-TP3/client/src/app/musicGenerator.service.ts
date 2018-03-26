import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Config } from './config';
import { JamendoService} from 'app/Jamendo.service';
import { DeezerService} from 'app/Deezer.service';
import { NapsterService} from 'app/Napster.service';
import { tracks} from 'app/Jamendo.service';
import { DZresult} from 'app/Deezer.service';
import { dd} from 'app/Napster.service';



@Injectable()  // Ce service est celui appelé par le client pour faire la recherche sur tous les services des API

export class GeneratorService {
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

    constructor(private Jam: JamendoService, private Dez: DeezerService, private Nap: NapsterService) { }



      musicGenerate(keys:string,tracksJamendo : tracks[],tracksDeezer : DZresult[],tracksNapster : dd[]){ 
          // La fonction générant les morceaux musicaux sur les différentes API selon le mot clé rentré
          
        var k = 0 ;
        var l = 0 ;
        var j = 0 ;
    
        // faire la requête pour Jamendo
        this.Jam.getJamendoTracks(keys).then(data => {
          var headers= data["headers"];
          if(headers["results_count"]!=0){
            for(var i=0;i < headers["results_count"];i++){
              var result = data["results"][i];
              for(var j=0;j<result["tracks"].length;j++){
                tracksJamendo[k]=result["tracks"][j];
                k=k+1
              }
            }
          }
    });
    
    
    
    this.Jam.getJamendoArtists(keys).then(data => {
      var headers= data["headers"];
      if(headers["results_count"]!=0){
        for(var i=0;i < headers["results_count"];i++){
          var result = data["results"][i];
          for(var j=0;j<result["tracks"].length;j++){
            tracksJamendo[k]=result["tracks"][j];
            k=k+1
          }
        }
      }
    });
    
    
    
    
    this.Jam.getJamendoAlbums(keys).then(data => {
      var headers= data["headers"];
      if(headers["results_count"]!=0){
        for(var i=0;i < headers["results_count"];i++){
          var result = data["results"][i];
          for(var j=0;j<result["tracks"].length;j++){
            tracksJamendo[k]=result["tracks"][j];
            k=k+1
          }
        }
      }
    });
    
    // faire la requête pour Deezer
    this.Dez.getDeezerTrack(keys).then(data => {
      var total= data["data"].length;
      if(total!=0){
        for(var i=0;i < total;i++){
          var result = data["data"][i];
            tracksDeezer[l]=result;
            l=l+1
          }
        }
    });
    
    
    // faire la requête pour Napster
    this.Nap.getNapster(keys).then(data => {
      var total= data["meta"]["returnedCount"];
      if(total!=0){
        for(var i=0;i < total;i++){
          var result = data["data"][i];
            tracksNapster[j]=result;
            j=j+1
          }
        }
    });
      }

}