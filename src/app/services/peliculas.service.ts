import { Injectable } from '@angular/core';

import { Jsonp } from "@angular/http";
import { map } from 'rxjs/internal/operators/map';


@Injectable()
export class PeliculasService {

  private apikey:string = "7232f37188e8f9a2839e1ec0cb40aa9a";
  private urlMoviedb:string = "https://api.themoviedb.org/3";

  constructor( private jsonp:Jsonp ) { }

  getPopulares(){

    let url = `${ this.urlMoviedb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get( url ).pipe(map( res=> res.json())                )
  }

  buscarPelicula( texto:string ){

    let url = `${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get( url ).pipe(map( res=> res.json())  )
  }

}

