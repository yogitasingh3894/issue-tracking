import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../auth/auth.service";
import { NavbarService } from "../../navbar/navbar.service";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  user:Object;
  userStatus: boolean = false;
  constructor(private _authService: AuthService,private nav:NavbarService) {}

  ngOnInit() {
    this._authService.$auth.subscribe((data: any) => {
     this.user=localStorage.getItem("user");
      console.log(localStorage.getItem("user"));
      this.userStatus = data;
    });
  }

  logout() {
    this._authService.logout();
  }
}
