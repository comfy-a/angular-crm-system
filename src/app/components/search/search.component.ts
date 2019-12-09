import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';

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
    private service: UserService
  ) { }

  ngOnInit() {
    this.search();
  }

  search() {
    this.usersGet();
  }

  usersGet() {
    this.service.usersGet(
      this.name.value,
      this.age.value,
      this.gender.value
    ).subscribe((res: Array<User>) => {
      console.log(res);
      this.result.emit(res);
    });
  }

}
