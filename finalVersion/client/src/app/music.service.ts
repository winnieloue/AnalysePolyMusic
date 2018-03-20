import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Config } from './config';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

// cette classe est le modèle qui fait l'extraction des données brutes des API
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

export class headers  {
  status: string;
  code: number;
  error_message: string;
  warnings: string;
  results_count: number;
  next: string;
}

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
export class res {
  data : DZresult[];
  total : number;
  next : string;
}


@Injectable()  // La classe principale
export class MusicService {

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
    .catch(MusicService.handleError);
  }

  getJamendoArtists(keys: string): Promise<data> { // reçevoir les résultats de recherche par nom d'artiste sur Jamendo
    let url = `https://api.jamendo.com/v3.0/albums/tracks/?client_id=e6b20d33&format=jsonpretty&limit=20&artist_name=`+keys;
    return this.http.get(url)
    .toPromise()
    .then(donnees => donnees.json() as data)
    .catch(MusicService.handleError);
  }

  getJamendoAlbums(keys: string): Promise<data> { // reçevoir les résultats de recherche par album sur Jamendo
    let url = `https://api.jamendo.com/v3.0/albums/tracks/?client_id=e6b20d33&format=jsonpretty&limit=20&name=`+keys;
    return this.http.get(url)
    .toPromise()
    .then(donnees => donnees.json() as data)
    .catch(MusicService.handleError);
  }

  getDeezerTrack(keys:string): Promise<res>{ // reçevoir les résultats de recherche des titres par Deezer
    const headers = new Headers({ 'Access-Control-Allow-Origin': 'lvh.me:8000'});
    const options = new RequestOptions({ headers: headers});
    let url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=track:`+keys;
    return this.http.get(url,options)
    .toPromise()
    .then(donnees => donnees.json() as res)
    .catch(MusicService.handleError);
  }

  getNapster(keys:string): Promise<napResult>{ // reçevoir les résultats de recherche par chanson sur Napster
    let url = "http://api.napster.com/v2.1/search/verbose?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10&offset=1&q="+keys+"&type=track";
    return this.http.get(url)
    .toPromise()
    .then(donnees => donnees.json() as napResult)
    .catch(MusicService.handleError);
  }

}
