import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  title = 'ANGULAR-CRM-SYSTEM';

  name: FormControl = new FormControl('');
  age: FormControl = new FormControl('');
  gender: FormControl = new FormControl('');

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'age', 'gender'];
  showDetail: boolean;
  selectedRow: User;

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

  search() {
    this.showDetail = false;
    this.selectedRow = null;

    this.dataSource.data = DATA;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  selectRow(data: User) {
    this.showDetail = true;
    this.selectedRow = data;

    this.form.patchValue({
      name: data.name,
      age: data.age,
      gender: data.gender
    });
  }

  cancel() {
    this.showDetail = false;
  }

  openUserDialog() {
    this.dialog.open(UserDialogComponent, {
      data: {
        name: this.name,
        age: 0,
        gender: 1
      }
    }).afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  updateUser() {
    this.dataSource.data = UPDATE_DATA;
  }

}

const DATA: User[] = [
  { id: 1, name: 'test1', age: 31, gender: '남자' },
  { id: 2, name: 'test2', age: 32, gender: '여자' },
  { id: 3, name: 'test3', age: 33, gender: '여자' },
  { id: 4, name: 'test4', age: 34, gender: '남자' },
  { id: 5, name: 'test5', age: 35, gender: '남자' }
];

const UPDATE_DATA: User[] = [
  { id: 1, name: 'test1111', age: 31, gender: '남자' },
  { id: 2, name: 'test2', age: 32, gender: '여자' },
  { id: 3, name: 'test3', age: 33, gender: '여자' },
  { id: 4, name: 'test4', age: 34, gender: '남자' },
  { id: 5, name: 'test5', age: 35, gender: '남자' }
];

export interface User {
  id: number;
  name: string;
  age: number;
  gender: string;
}
