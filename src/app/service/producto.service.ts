import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  getProduct(){
    return this.http.get('https://mymercat.p.rapidapi.com/category/')
    .pipe(map((res: any) => {
      return res;
    }))
  }
}