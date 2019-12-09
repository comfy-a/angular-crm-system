import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnChanges {

  @Input() users: Array<User>;
  @Input() test: Array<User>;
  @Output() result: EventEmitter<User> = new EventEmitter<User>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'age', 'gender'];
  selectedRow: User;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.users) {
      this.setUserTable(changes.users.currentValue);
      this.selectedRow = null;
    }
  }

  setUserTable(users: Array<User>) {
    this.dataSource.data = users;
    this.dataSource.paginator = this.paginator;
  }

  selectRow(user: User) {
    this.selectedRow = user;
    this.result.emit(user);
  }

}
