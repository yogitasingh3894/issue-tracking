import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { ListPostsComponent } from './posts/list-posts/list-posts.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './misc/home/home.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { AuthGuard } from "./auth/auth.guard";
import { UpadatePostIssueComponent } from './posts/updatePostIssue/upadate-post-issue/upadate-post-issue.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"home",component:HomeComponent, canActivate: [AuthGuard] },
  {path:"list-posts",component:ListPostsComponent, canActivate: [AuthGuard] },
  {
    path: "list-posts/:id",
    component: PostDetailsComponent,
    canActivate: [AuthGuard]
  },
  {path:"create-issues/:id",component:CreatePostComponent, canActivate: [AuthGuard] },
   {path:"update-issues/:id",component:UpadatePostIssueComponent, canActivate: [AuthGuard] },
  {    
    path: '',    
    redirectTo: 'login',    
    pathMatch: 'full',    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
