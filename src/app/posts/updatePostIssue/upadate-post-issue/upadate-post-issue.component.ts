
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostsService } from "../../posts.service";

import { AuthService } from "../../../auth/auth.service";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-upadate-post-issue',
  templateUrl: './upadate-post-issue.component.html',
  styleUrls: ['./upadate-post-issue.component.css']
})
export class UpadatePostIssueComponent implements OnInit {

  updatePostForm: FormGroup;
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
    this.updatePostForm = this._fb.group({
      id:[""],
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
     this.updatePostForm.setValue({
      id:this.id,
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
  createPost1() {

  const formData = new FormData();


     for (var i = 0; i < this.myFiles.length; i++) { 
      
      formData.append("file[]", this.myFiles[i]);
    }

    formData.append('postDescription', this.updatePostForm.get('postDescription').value);
     formData.append('postTitle', this.updatePostForm.get('postTitle').value);
      formData.append('status', this.updatePostForm.get('status').value);
       formData.append('assign_to', this.updatePostForm.get('assign_to').value);
    
       formData.append('id',this.updatePostForm.get('id').value);
       
 console.log(formData);
    this._post.updateIssue1(this.id,formData).subscribe(data => {
      console.log(data);
      this._router.navigate(["/home"]);
      
    });
   // 
  }


}

