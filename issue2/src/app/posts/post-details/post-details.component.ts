 import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PostsService } from "../posts.service";
import { JQ_TOKEN } from "./../../plugins/jquery.service";
import {  
    PushNotificationsService  
} from '../../push-notify/push-notification.service';  

import {  
    PushnotifyService  
} from '../../push-notify/pushnotify.service'; 

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  post: Object;
  postId: String;
  shwCmmnts: boolean = false;
   private title: string = 'Browser Push Notifications!';  
    showModal : boolean= false;
  constructor(private _post: PostsService,private _activatedRoute: ActivatedRoute, @Inject(JQ_TOKEN) private jQuery: any, private _router: Router,private _notificationService: PushNotificationsService, private push : PushnotifyService ) {
   this._notificationService.requestPermission();  
   }

  //===========================================
    notify(data1) {  
        let data: Array < any >= [];  
        data.push({  
            'title': 'Approval',  
            'alertContent': data1 
        });  
        data.push({  
            'title': 'Request',  
            'alertContent': 'This is Second Alert -- By Debasis Saha'  
        });  
        data.push({  
            'title': 'Leave Application',  
            'alertContent': 'This is Third Alert -- By Debasis Saha'  
        });  
        data.push({  
            'title': 'Approval',  
            'alertContent': 'This is Fourth Alert -- By Debasis Saha'  
        });  
        data.push({  
            'title': 'To Do Task',  
            'alertContent': 'This is Fifth Alert -- By Debasis Saha'  
        });  
        this.push.generateNotification(data);  
    }  

  //===========================================
  //go back
  back(){
    this._router.navigate(['/list-posts'])
  }

  // Show Comments
  showComments(e) {
    this.shwCmmnts=!this.shwCmmnts;
    this.jQuery("#" + e.currentTarget.id + ".cmtDiv").toggle();
  }

  // Add Comment
  addCmt(e) {
    var x = e.currentTarget.id;
    this._post
      .updatePost(e.currentTarget.id, {
        comments: [
          { text: this.jQuery("#" + e.currentTarget.id + ".cmtText")[0].value }
        ]
      })
      .subscribe(res => {

       //this.push.sendMsg("Test Message");
      this.notify("Test Message");
      this._post.getPost(x).subscribe(res=>{this.post = res['result']});
      });
  }

  // Delete post
  delPost(e) {
    this._post.deletePost(e.currentTarget.id).subscribe(data => {
      this._router.navigate(['/list-posts']);
      this._post.getAllPosts().subscribe((data: Object[]) => {
        this.post = data["result"];
      });
    });
  }

  // Add Watchers
  likes(e) {
    this._post.updateLikes(e.currentTarget.id).subscribe(e => {
      this._post.getAllPosts().subscribe((data: Object[]) => {
        this.post = data["result"];
      });
    });
  }

  edit_issue(data)
  {
    console.log(data);
   // this.showModal = true; // Show-Hide Modal Check
   this._router.navigate(["/update-issues/",data._id]);
  }
hide()
  {
    this.showModal = false;
  }

  ngOnInit() {

    this.push.messages.subscribe(msg => {
      console.log(msg);
    });
    this._activatedRoute.params.subscribe(data => {
      this.postId = data.id;
      console.log(data);
      this._post.getPost(this.postId).subscribe(post => {
        // console.log(post);
        this.post = post["result"];
        console.log(this.post);
      });
    });
  }
}
