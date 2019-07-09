import { Injectable } from '@angular/core';

import { Jsonp } from "@angular/http";
import { map } from 'rxjs/internal/operators/map';


@Injectable()
export class PeliculasService {

  private apikey:string = "7232f37188e8f9a2839e1ec0cb40aa9a";
  private urlMoviedb:string = "https://api.themoviedb.org/3";

  peliculas:any[] = [];

  constructor( private jsonp:Jsonp ) { }

  getCartelera(){

    let desde = new Date();
    let hasta = new Date();
    hasta.setDate( hasta.getDate() + 7);

    let desdeStr = `${desde.getFullYear()}-${ desde.getMonth()}-${desde.getDate()}`
    let hastaStr = `${hasta.getFullYear()}-${ hasta.getMonth()}-${hasta.getDate()}`
  
    let url = `${ this.urlMoviedb } /discover/movie?primary_release_date.gte=${ desdeStr }&primary_release_date.lte=${ hastaStr }&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get( url ).pipe(map( res=> res.json().results))

  }

  getPopulares(){

    let url = `${ this.urlMoviedb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get( url ).pipe(map( res=> res.json().results))
  }

  getPopularesNinos(){

    let url = `${ this.urlMoviedb }/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get( url ).pipe(map( res=> res.json().results))
  }

  buscarPelicula( texto:string ){

    let url = `${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get( url ).pipe(map( res=> {
      this.peliculas = res.json().results;
      res.json().results}))
  }

  getPelicula(id: string){

    let url = `${ this.urlMoviedb }/movie/${id}?api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get( url ).pipe(map( res=> res.json()))
  }

}

