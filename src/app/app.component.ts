import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from './model/user';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { SearchComponent } from './components/search/search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(SearchComponent, { static: true }) searchComponent: SearchComponent;
  users: Array<User>;
  selectedUser: User;
  showDetail: boolean;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: '',
      age: '',
      gender: ''
    });
  }

  searchOutputResult(users: Array<User>) {
    this.users = users;
    this.showDetail = false;
  }

  userListOutputResult(user: User) {
    this.showDetail = true;
    this.selectedUser = user;
  }

  addUser() {
    this.dialog.open(UserDialogComponent).afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.searchComponent.search();
      }
    });
  }

  outputUserDetailResult(data: boolean) {
    if(data) {
      this.searchComponent.search();
    }
  }

}
