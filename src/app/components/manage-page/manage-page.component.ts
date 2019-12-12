import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { SearchComponent } from '../search/search.component';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.scss']
})
export class ManagePageComponent implements OnInit {

  @ViewChild(SearchComponent, { static: true }) searchComponent: SearchComponent;
  users: Array<User> = [];
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

  userDetailOutputResult(data: boolean) {
    if (data) {
      this.searchComponent.search();
    }
  }

}
