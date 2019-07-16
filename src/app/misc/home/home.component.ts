import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NavbarService } from "../../navbar/navbar.service";
import { MiscService } from "../misc.service";
import { PostsService } from "../../posts/posts.service";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { JQ_TOKEN } from "./../../plugins/jquery.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
   dashboard: FormGroup;
//gridOptions: GridOptions;
  columnDefs: any[]
  rowData: any[];
  private gridApi;
  private gridColumnApi;

  gridOptions: any;
  allPosts: Object[];
   private rowSelection;
  selectedRows:string="";
  selectedRowsString:string="";
  index:number=null;
  constructor( private _post: PostsService,private nav:NavbarService,private _http: HttpClient, private _router: Router,private _fb: FormBuilder, private misc:MiscService) {}

  ngOnInit() {
  this.nav.show();

  this.dashboard = this._fb.group({
      searchField: [""], 
    });

   this._post.getPostUsingUser().subscribe((data: Object[]) => {
      this.allPosts = data["result"];
    });
  this.gridOptions = {
   floatingFilter: true
  };
  this.columnDefs = [
        {headerName: 'Id', field: '_id',sortable: true, filter: true },
         {headerName: 'Title', field: 'postTitle',sortable: true, filter: true },
         
        {headerName: 'Status', field: 'status',sortable: true, filter: true },
        {headerName: 'Reporter', field: 'createdBy',sortable: true, filter: true},
        {headerName: 'Date', field: 'date',sortable: true, filter: true}
 ];
  this.rowSelection = "single";
  }

  onSelectionChanged(e)
  {
   let rowsSelection = this.gridOptions.api.getSelectedRows();
        console.info(rowsSelection);
  }
 onRowClicked(event: any)
  { 
  console.log('row', event); 
   this._router.navigate(['/list-posts',event.data._id]);
  }

  search()
  {

    this.misc.searchIssue(this.dashboard.value.searchField).subscribe((data: Object[]) => {
      this.allPosts = data["result"];
    });
    

  }

}

