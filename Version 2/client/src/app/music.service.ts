import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Config } from './config';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';


export class headers  {
  status: string;
  code: number;
  error_message: string;
  warnings: string;
  results_count: number;
  next: string;
}

export class tracks  {
  id: string;
  position: string;
  name: string;
  duration: string;
  license_ccurl: string;
  audio: string;
  audiodownload: string;
}
export class SpotTrack {
  id: string;
  name: string;
  artistName: string;
  preview_url: string
  type: string
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
export class DZresult {
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


@Injectable()
export class MusicService {


  client_id = "c4cdd2ab03054ffaaea26e809030b0b9";
  client_secret = "d655292781c341edbb19f5657a6f6aa5";
  private accessToken= 'BQD2aXH_gh91cKE5h6WkrYE552w_p5HmgvRj0UjjRx6FH3lHofE5XeRGoDclheNcGgcunpIHo939WJRjMhOnpGFw4ZohkzpoXIjHku0G0TbmUuP5_JPVLaD2frG_a28c64u7SiuPBQJnJzUV3aeDB8BdAMTL01QCLu3aLg1RUpXIHO_YQw';
  private tokenType: string;

  /**
   * Handles the current error.
   *
   * @param error                   The error to handle.
   * @return {Promise<object>}      A promise object.
   */
  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.feedbackMessage || error);
  }

  constructor(private http: Http) { }

  getJamendoTracks(keys: string): Promise<data> {
    let url = `https://api.jamendo.com/v3.0/albums/tracks/?client_id=e6b20d33&format=jsonpretty&limit=20&track_name=`+keys;
    return this.http.get(url)
    .toPromise()
    .then(donnees => donnees.json() as data)
    .catch(MusicService.handleError);
  }

  getJamendoArtists(keys: string): Promise<data> {
    let url = `https://api.jamendo.com/v3.0/albums/tracks/?client_id=e6b20d33&format=jsonpretty&limit=20&artist_name=`+keys;
    return this.http.get(url)
    .toPromise()
    .then(donnees => donnees.json() as data)
    .catch(MusicService.handleError);
  }

  getJamendoAlbums(keys: string): Promise<data> {
    let url = `https://api.jamendo.com/v3.0/albums/tracks/?client_id=e6b20d33&format=jsonpretty&limit=20&name=`+keys;
    return this.http.get(url)
    .toPromise()
    .then(donnees => donnees.json() as data)
    .catch(MusicService.handleError);
  }

  getDeezerTrack(keys:string): Promise<res>{
    const headers = new Headers({ 'Access-Control-Allow-Origin': 'lvh.me:8000'});
    const options = new RequestOptions({ headers: headers});
    let url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=track:`+keys;
    return this.http.get(url,options)
    .toPromise()
    .then(donnees => donnees.json() as res)
    .catch(MusicService.handleError);
  }

}
