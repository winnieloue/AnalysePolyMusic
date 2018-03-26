import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Config } from './config';



// cette classe est le modèle qui fait l'extraction des données brutes d'une des API
// Il faut définir les modèles (classes) qui contiendront les résultats


  export class res {
    data : DZresult[];
    total : number;
    next : string;
  }

  export class DZresult { // résultat de la requête sur Deezer
    id : string;
    readable : boolean;
    title : string;
    title_short : string;
    title_version : string;
    isrc : string;
    link : string ;
    share : string;
    duration : string;
    track_position : number;
    disk_number : number;
    rank : string;
    release_date : string;
    explicit_lyrics : boolean;
    preview : string;
    bpm : number;
    gain : number;
    available_countries : string[];
    contributors : contrib [];
    artist : artist;
    album: album;
    type : string;
  }

  export class contrib {
    id : number;
    name : string;
    link: string;
    share : string;
    picture: string;
    picture_small : string;
    picture_medium : string;
    picture_big : string;
    picture_xl : string;
    radio : boolean;
    tracklist : string;
    type : string;
    role : string;
  }
  export class artist {
    id : string;
    name : string;
    link : string;
    share : string;
    picture : string;
    picture_small : string;
    picture_medium : string;
    picture_big : string;
    picture_xl : string;
    radio : boolean;
    tracklist : string;
    type : string;
  }
  export class album {
    id : string;
    title : string;
    link : string;
    cover : string;
    cover_small : string;
    cover_medium : string;
    cover_big : string;
    cover_xl : string;
    release_date : string;
    tracklist : string;
    type : string;
  }


  @Injectable()  
  export class DeezerService { // la classe qui tire la musique de l'api Deezer
  
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
  
    constructor(private http: Http) { }

    getDeezerTrack(keys:string): Promise<res>{ // reçevoir les résultats de recherche des titres par Deezer
        const headers = new Headers({ 'Access-Control-Allow-Origin': 'lvh.me:8000'});
        const options = new RequestOptions({ headers: headers});
        let url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=track:`+keys;
        return this.http.get(url,options)
        .toPromise()
        .then(donnees => donnees.json() as res)
        .catch(DeezerService.handleError);
      }
    }
  