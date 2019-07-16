import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { HomeComponent } from "./misc/home/home.component";
import { NavbarComponent } from "./misc/navbar/navbar.component";
import { ListPostsComponent } from "./posts/list-posts/list-posts.component";
import { CreatePostComponent } from "./posts/create-post/create-post.component";
import { PostDetailsComponent } from "./posts/post-details/post-details.component";
import { AuthService } from "./auth/auth.service";

import { AuthInterceptorService } from "./auth-interceptor.service";
import { PostsService } from "./posts/posts.service";
import {  
    PushNotificationsService  
} from './push-notify/push-notification.service';  
import {  
    PushnotifyService  
} from './push-notify/pushnotify.service'; 
import { WebsocketService } from './push-notify/websocket.service';
import { JQ_TOKEN } from "./plugins/jquery.service";
import { PanelBoxComponent } from './misc/panel-box/panel-box.component';
import { AgGridModule } from 'ag-grid-angular';
import { UpadatePostIssueComponent } from './posts/updatePostIssue/upadate-post-issue/upadate-post-issue.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
let jquery = window["jQuery"];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    ListPostsComponent,
    CreatePostComponent,
    PostDetailsComponent,
    PanelBoxComponent,
    UpadatePostIssueComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RichTextEditorAllModule
  ],
  providers: [
    PostsService,
    AuthService,
    PushNotificationsService,
    PushnotifyService,
    WebsocketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: JQ_TOKEN,
      useValue: jquery
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
