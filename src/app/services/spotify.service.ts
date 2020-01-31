import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import{map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http:HttpClient) {
    console.log("Spotify service listo");
  }

  getQuery(query:string){
    const url=`https://api.spotify.com/v1/${query}`;
    const headers=new HttpHeaders({
      'Authorization': 'Bearer BQCPjkmGDUVz6YLEy4lrzaU1LXECVQR5m0mZ74ErkRNdKaBF7WjXUXR9Kzbu0DpKSTS9w30euVuxzECPN8o'
    });

    return this.http.get(url,{headers});
  }
  getNewReleases(){


   return this.getQuery('browse/new-releases')
   .pipe( map(data=>data['albums'].items));
  }

  getArtistas(termino:string){


   return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
   .pipe(map(data=>data['artists'].items));

  }
  getArtista(id:string){


    return this.getQuery(`artists/${id}`);
    //.pipe(map(data=>data['artists'].items));

   }
   getTopTracks(id:string){


    return this.getQuery(`artists/${id}/top-tracks?country=us`)
    .pipe(map(data=>data['tracks']));

   }

}
