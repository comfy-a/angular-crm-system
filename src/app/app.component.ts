import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from './model/user';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ANGULAR-CRM-SYSTEM';
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

  userListOutputResult(user:User) {
    this.showDetail = true;
    this.selectedUser = user;
  }
  
  addUser() {
    this.dialog.open(UserDialogComponent);
  }

  updateUser() {
    // this.dataSource.data = UPDATE_DATA;
  }
}

// const DATA: User[] = [
//   { id: 1, name: 'test1', age: 31, gender: '남자' },
//   { id: 2, name: 'test2', age: 32, gender: '여자' },
//   { id: 3, name: 'test3', age: 33, gender: '여자' },
//   { id: 4, name: 'test4', age: 34, gender: '남자' },
//   { id: 5, name: 'test5', age: 35, gender: '남자' }
// ];

// const UPDATE_DATA: User[] = [
//   { id: 1, name: 'test1111', age: 31, gender: '남자' },
//   { id: 2, name: 'test2', age: 32, gender: '여자' },
//   { id: 3, name: 'test3', age: 33, gender: '여자' },
//   { id: 4, name: 'test4', age: 34, gender: '남자' },
// ];