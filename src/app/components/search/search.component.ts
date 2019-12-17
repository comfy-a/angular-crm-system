import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';
import { AlertDialogComponent } from 'src/app/share/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() result: EventEmitter<Array<User>> = new EventEmitter<Array<User>>();
  name: FormControl = new FormControl('');
  age: FormControl = new FormControl('');
  gender: FormControl = new FormControl('');

  constructor(
    private service: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.search();
  }

  search() {
    if (!this.validate()) {
      this.dialog.open(AlertDialogComponent, {
        data: {
          title: "사용자 검색",
          message: "검색 항목을 확인해주세요."
        }
      });
      return;
    }

    this.usersGet();
  }

  usersGet() {
    this.service.usersGet(
      this.name.value,
      Number(this.age.value),
      this.gender.value
    ).subscribe((res: Array<User>) => {
      this.result.emit(res);
    }, (err) => {
      console.error(err);
    });
  }

  validate() {
    if (isNaN(this.age.value)) {
      return false;
    }

    return true;
  }

}
