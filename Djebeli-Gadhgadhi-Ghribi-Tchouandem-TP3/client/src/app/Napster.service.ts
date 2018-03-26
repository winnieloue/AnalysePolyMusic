import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Config } from './config';


// cette classe est le modèle qui fait l'extraction des données brutes d'une des API
// Il faut définir les modèles (classes) qui contiendront les résultats


export class napResult{ // résultat de la requête sur Napster
links: links; 
data: dd[];
meta: meta;
}

export class links{
  self: string;
}


export class meta {
  totalCount: number;
  returnedCount: number;
}

export class dd{
  type: string;
  id: string;
  index: number;
  href: string;
  playbackSeconds: number;
  explicit: boolean;
  isStreamable: boolean;
  name: string;
  isrc: string;
  shortcut: string;
  blurbs: string[];
  artistId: string;
  artistName: string;
  albumName: string;
  formats: format[];
  albumId: string;
  contributors: contribut[]
  liens: lien;
  previewURL: string;
}

export class contribut{
featuredPerformer: string;
primaryArtist: string;
}

export class lien{
artists: art;
albums: art;
genres: art;
tags: art;
}

export class art{
ids: string[];
href: string;
}

export class format {
type: string;
bitrate: number;
name: string;
}


@Injectable()  
export class NapsterService {  // la classe qui tire la musique de l'api Napster

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

  getNapster(keys:string): Promise<napResult>{ // reçevoir les résultats de recherche par chanson sur Napster
    let url = "http://api.napster.com/v2.1/search/verbose?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10&offset=1&q="+keys+"&type=track";
    return this.http.get(url)
    .toPromise()
    .then(donnees => donnees.json() as napResult)
    .catch(NapsterService.handleError);
  }

}
