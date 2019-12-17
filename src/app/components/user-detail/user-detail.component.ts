import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/share/components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from 'src/app/share/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnChanges {

  @Input() selectedUser: User;
  @Output() result: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

  }

  get name() { return this.form.get('name'); }
  get age() { return this.form.get('age'); }
  get gender() { return this.form.get('gender'); }

  setForm(user: User) {
    if (!this.form) {
      this.form = this.fb.group({
        name: ['', Validators.required],
        age: ['', Validators.required],
        gender: ['', Validators.required]
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

  update() {
    if (!this.validate()) return;

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "사용자 수정",
        message: "사용자 정보를 수정하시겠습니까?"
      }
    }).afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.userPut();
      }
    });
  }

  delete() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "사용자 삭제",
        message: "사용자 정보를 삭제하시겠습니까?"
      }
    }).afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.userDelete();
      }
    });
  }

  validate() {
    const invalid: Array<any> = Object.keys(this.form.controls).map(name => this.form.controls[name]).filter(control => control.invalid);

    if (invalid.length > 0) {
      invalid.forEach((control: any) => {
        control.markAsTouched();
      });

      return false;
    }

    return true;
  }

  userPut() {
    this.service.userPut(
      this.selectedUser.id,
      this.name.value,
      Number(this.age.value),
      this.gender.value
    ).subscribe((res: any) => {
      if (res == "success") {
        this.dialog.open(AlertDialogComponent, {
          data: {
            title: "사용자 수정",
            message: "수정되었습니다."
          }
        }).afterClosed().subscribe(() => {
          this.result.emit(true);
        });
      } else {
        this.dialog.open(AlertDialogComponent, {
          data: {
            title: "사용자 수정",
            message: "실패하였습니다."
          }
        }).afterClosed().subscribe(() => {
          this.result.emit(false);
        });
      }
    }, (err) => {
      console.error(err);
    });
  }

  userDelete() {
    this.service.userDelete(
      this.selectedUser.id
    ).subscribe((res: any) => {
      if (res == "success") {
        this.dialog.open(AlertDialogComponent, {
          data: {
            title: "사용자 삭제",
            message: "삭제되었습니다."
          }
        }).afterClosed().subscribe(() => {
          this.result.emit(true);
        });
      } else {
        this.dialog.open(AlertDialogComponent, {
          data: {
            title: "사용자 삭제",
            message: "실패하였습니다."
          }
        }).afterClosed().subscribe(() => {
          this.result.emit(false);
        });
      }
    }, (err) => {
      console.error(err);
    });
  }

}
