import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
const httpOptions = {
   headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private _http: HttpClient) {}

  // Update Likes
  updateLikes(id) {
    return this._http.put(
      "http://localhost:3000/api/post/updateLikes/" + id,
      {}
    );
  }

  // Save Post
  savePost(data) {
    return this._http.post("http://localhost:3000/api/post/savePost", data,httpOptions);
  }

  // Get All Posts
  getAllPosts() {
    return this._http.get("http://localhost:3000/api/post/getAllPosts");
  }

  // Get All Posts
  getPostUsingUser() {
    return this._http.get("http://localhost:3000/api/post/getPostUsingUser");
  }

  //get Post
  getPost(id){
    return this._http.get("http://localhost:3000/api/post/getPost/"+id);
  }

   getAllPostsById(id){
    return this._http.get("http://localhost:3000/api/post/getPost/"+id);
  }

    // Update Post
  updatePost(id, data) {
    return this._http.put(
      "http://localhost:3000/api/post/updatePost/" + id,
      data
    );

  }
  updateIssue1(id,data) {
    
    //console.log(data);
    return this._http.put(
      "http://localhost:3000/api/post/updateIssue/"+id,
      data,httpOptions
    );
  }


  // Delete Post
  deletePost(id) {
    return this._http.delete("http://localhost:3000/api/post/delete/" + id);
  }
}
