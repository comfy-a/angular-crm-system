import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnChanges {

  @Input() selectedUser: User;
  form: FormGroup

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {

  }

  setForm(user: User) {
    if (!this.form) {
      this.form = this.fb.group({
        name: '',
        age: '',
        gender: ''
      });
    }

    this.form.patchValue({
      name: user.name,
      age: user.age,
      gender: user.gender
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedUser) {
      this.setForm(changes.selectedUser.currentValue);
    }
  }

  cancel() {

  }

  update() {

  }

}
