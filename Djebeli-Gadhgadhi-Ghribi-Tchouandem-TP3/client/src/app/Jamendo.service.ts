import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Config } from './config';


// cette classe est le modèle qui fait l'extraction des données brutes d'une des API
// Il faut définir les modèles (classes) qui contiendront les résultats


export class tracks  { // résultat de la requête sur Jamendo
    id: string;
    position: string;
    name: string;
    duration: string;
    license_ccurl: string;
    audio: string;
    audiodownload: string;
  }
  export class result  {
    id: string;
    name: string;
    releasedate: string;
    artist_id: string;
    artist_name: string;
    image: string;
    zip: string;
    tracks: tracks[];
  }  

  export class data  {
    headers: headers;
    results: result[];
  }

  export class headers  {
    status: string;
    code: number;
    error_message: string;
    warnings: string;
    results_count: number;
    next: string;
  }


  @Injectable()  
  export class JamendoService { // la classe qui tire la musique de l'api Jamendo
  
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
  
    getJamendoTracks(keys: string): Promise<data> { // reçevoir les résultats de recherche par nom de chanson sur Jamendo
      let url = `https://api.jamendo.com/v3.0/albums/tracks/?client_id=e6b20d33&format=jsonpretty&limit=20&track_name=`+keys;
      return this.http.get(url)
      .toPromise()
      .then(donnees => donnees.json() as data)
      .catch(JamendoService.handleError);
    }
  
    getJamendoArtists(keys: string): Promise<data> { // reçevoir les résultats de recherche par nom d'artiste sur Jamendo
      let url = `https://api.jamendo.com/v3.0/albums/tracks/?client_id=e6b20d33&format=jsonpretty&limit=20&artist_name=`+keys;
      return this.http.get(url)
      .toPromise()
      .then(donnees => donnees.json() as data)
      .catch(JamendoService.handleError);
    }
  
    getJamendoAlbums(keys: string): Promise<data> { // reçevoir les résultats de recherche par album sur Jamendo
      let url = `https://api.jamendo.com/v3.0/albums/tracks/?client_id=e6b20d33&format=jsonpretty&limit=20&name=`+keys;
      return this.http.get(url)
      .toPromise()
      .then(donnees => donnees.json() as data)
      .catch(JamendoService.handleError);
    }

}