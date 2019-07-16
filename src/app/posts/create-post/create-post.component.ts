import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostsService } from "../posts.service";

import { AuthService } from "../../auth/auth.service";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"]
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  allUsers: Object[];
  status1:Object[];
  allPosts:Object[];
  allPosts1:any;
  id:number=null;
  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private _post: PostsService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.createPostForm = this._fb.group({
      _id:[""],
      postTitle: ["", [Validators.required, Validators.minLength(3)]],
      postDescription: ["", [Validators.required, Validators.minLength(3)]],
      logo_url:[""],
      assign_to:[""],
      status:[""]
    });
    this.status1=[
      {"id":1, "label":"In-Process"},
      {"id":2, "label":"In-Test"},
      {"id":3, "label":"Backlog"},
      {"id":4, "label":"Done"}
    ];
    console.log(this.id);
    if(this.id!=0)
    {

      this._post.getAllPostsById(this.id).subscribe((data: Object[]) => {
      this.allPosts1 = data["result"];
      console.log(this.allPosts1);

      setTimeout(() => { 
     this.createPostForm.setValue({
      _id:this.allPosts1._id,
      postTitle:this.allPosts1.postTitle, 
      postDescription:this.allPosts1.postDescription,
      logo_url:"",
      assign_to:this.allPosts1.assign_to,
      status:this.allPosts1.status
        });
        })
     
    });
         

    }
  
     this._auth.getUsers().subscribe((data: Object[]) => {
      this.allUsers = data;
      console.log(data);
    });
  }

     myFiles:string [] = [];
       onFileChange(e) {
    if (e.target.files.length > 0) {
      for (var i = 0; i < e.target.files.length; i++) { 
      const file = e.target.files[i];
        this.myFiles.push(e.target.files[i]);
      
      }
    }
  }
  filterForeCasts(value)
  {
    console.log(value);
  }
  createPost() {

  const formData = new FormData();


     for (var i = 0; i < this.myFiles.length; i++) { 
      
      formData.append("file[]", this.myFiles[i]);
    }

    formData.append('postDescription', this.createPostForm.get('postDescription').value);
     formData.append('postTitle', this.createPostForm.get('postTitle').value);
      formData.append('status', this.createPostForm.get('status').value);
       formData.append('assign_to', this.createPostForm.get('assign_to').value);
    
    console.log('form data variable :   '+ formData.toString());

    this._post.savePost(formData).subscribe(data => {
      console.log("Added Post");
    });
    this._router.navigate(["/list-posts"]);
  }


}
