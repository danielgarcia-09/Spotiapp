import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) {
    console.log('Servicio activo!');
  }


  getQuery(query: string){

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer BQB2GWz7x-HlFxY_q1fMBkh0mxH6NrsUu5ipOajx7eExNXNf36zVzvqBhiGWS6n23ifmPaoUJgURx7m7mZM'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases(){

    return this.getQuery('browse/new-releases?limit=20')
               .pipe( map( data => data['albums'].items));
  }

  getArtists(termino: string){

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
              .pipe( map(data => data['artists'].items));

  }

  getArtist(id: string){
    return this.getQuery(`artists/${ id }`);
              // .pipe( map(data => data['artists'].items));
  }

  getTopTracks(id: string){
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
              .pipe( map(data => data['tracks']));
  }
}
