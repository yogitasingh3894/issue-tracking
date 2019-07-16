import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
const httpOptions = {
   headers: new HttpHeaders({'Content-Type': 'text/plain'})
};
@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor(private _http: HttpClient) { }

    searchIssue(data) {
    return this._http.get("http://localhost:3000/api/post/searchIssue/"+data);
  }
}
