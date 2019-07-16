import { Component, OnInit, Inject } from "@angular/core";
import { PostsService } from "../posts.service";
import { JQ_TOKEN } from "./../../plugins/jquery.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavbarService } from "../../navbar/navbar.service";
@Component({
  selector: "app-list-posts",
  templateUrl: "./list-posts.component.html",
  //styleUrls: ["./list-posts.component.css"]
   styles: [`
      /* Chat containers */
.container {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

/* Darker chat container */
.darker {
  border-color: #ccc;
  background-color: #ddd;
}

/* Clear floats */
.container::after {
  content: "";
  clear: both;
  display: table;
}



/* Style time text */
.time-right {
  float: right;
  color: #aaa;
}

/* Style time text */
.time-left {
  float: left;
  color: #999;
}

   `]
})
export class ListPostsComponent implements OnInit {

  allPosts: Object[];
  shwCmmnts: boolean = false;
  title = "app works!";
  addCmtForm: FormGroup;
   showModal : boolean= false;
  constructor(
    private _post: PostsService,
    private nav:NavbarService,
    @Inject(JQ_TOKEN) private jQuery: any,
    private _fb: FormBuilder,
  ) {
    this.addCmtForm = this._fb.group({
      text: ["", [Validators.required, Validators.minLength(3)]]
    });
  }

  // Show Comments
  showComments(e) {
    this.jQuery("#" + e.currentTarget.id + ".cmtDiv").toggle();
  }

  // Add Comment
  addCmt(id,e) {
    // e.preventDefault();
    console.log(this.addCmtForm.value);
    // var x = e.currentTarget.id;
    console.log(id)
    this._post
      .updatePost(id, {
        comments: [
          this.addCmtForm.value
        ]
      })
      .subscribe(e => {
        // this.jQuery("#" + x + ".cmtText")[0].value = "";
        this._post.getAllPosts().subscribe((data: Object[]) => {
          this.allPosts = data["result"];
        });
      });
  }

  // Delete post
  delPost(e) {
    this._post.deletePost(e.currentTarget.id).subscribe(data => {
      this._post.getAllPosts().subscribe((data: Object[]) => {
        this.allPosts = data["result"];
      });
    });
  }

  // Add Likes
  likes(e) {
    this._post.updateLikes(e.currentTarget.id).subscribe(e => {
      this._post.getAllPosts().subscribe((data: Object[]) => {
        this.allPosts = data["result"];
      });
    });
  }

  edit_issue(data)
  {
    console.log(data);
    this.showModal = true; // Show-Hide Modal Check
  }

  hide()
  {
    this.showModal = false;
  }
  ngOnInit() {
    this.nav.show();
    this._post.getAllPosts().subscribe((data: Object[]) => {
      this.allPosts = data["result"];
    });
  }
}
