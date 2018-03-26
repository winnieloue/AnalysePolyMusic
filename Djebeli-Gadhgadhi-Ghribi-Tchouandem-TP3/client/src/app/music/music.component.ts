import { Component } from '@angular/core';
import { JamendoService} from 'app/Jamendo.service';
import { DeezerService} from 'app/Deezer.service';
import { NapsterService} from 'app/Napster.service';
import { GeneratorService} from 'app/musicGenerator.service';
import { PlaylistService} from 'app/Playlist.service';
import { tracks} from 'app/Jamendo.service';
import { DZresult} from 'app/Deezer.service';
import { dd} from 'app/Napster.service';
import { Router } from "@angular/router";


/**
 * C'est le controlleur qui génèrera les résultats requis par le html 
 * (notre client léger qui utilise les services)
 */
@Component({  // définition des composants et des fichiers de style
  selector: 'music',
  templateUrl:'./music.component.html',
  styleUrls: ['./music.component.css']
})


export class MusicComponent { // la classe cliente



  keys : string; // les mots recherchés entrés par le client
  // résultats de la recherche seront stockés dans
  tracksJamendo =[]; 
  tracksDeezer =[];
  tracksNapster =[];

  // Les données de la playlist seront stockés dans
  playlistJamendo= [];
  playlistDeezer= [];
  playlistNapster= [];

  constructor( private playmanage: PlaylistService, private musicGen: GeneratorService, private router: Router) { }


  ngOnInit(){ 
    // quand la page est chargée, il faut rétablir la liste des playlists enregistrées
    // en utilisant la fonction initialize du serveur 
    this.playmanage.initialize(this.playlistJamendo,this.playlistDeezer,this.playlistNapster);
  }

  
  submit() { // quand on valide la recherche (en cliquent sur le bouton ou sur ENTER)
    this.tracksJamendo =[];
    this.tracksDeezer =[];
    this.tracksNapster =[];
    this.musicGen.musicGenerate(this.keys,this.tracksJamendo,this.tracksDeezer,this.tracksNapster);
  }


  // La gestion de la playlist se fait du coté serveur, le client appelle 
  // juste les fonctions du serveur pour faire le travail

  // Pour ajouter des éléments à la playlist
  addJamendo(track : tracks){
    this.playmanage.addJam(track, this.playlistJamendo);
  }

  addDeezer(track : DZresult){
    this.playmanage.addDz(track, this.playlistDeezer);
  }

  addNapster(track : dd){
    this.playmanage.addNap(track, this.playlistNapster);
  }



  // Pour supprimer des éléments de la playlist
  deleteJamendo(play : tracks){
    this.playmanage.deleteJam(play, this.playlistJamendo);
  }

  deleteDeezer(play : DZresult){
    this.playmanage.deleteDz(play, this.playlistDeezer);
  }
  deleteNapster(play : dd){
    this.playmanage.deleteNap(play, this.playlistNapster);
  }
  }
