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
  form: FormGroup;

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
  get zipNo() { return this.form.get('zipNo'); }
  get baseAddr() { return this.form.get('baseAddr'); }
  get detailAddr() { return this.form.get('detailAddr'); }

  setForm(user: User) {
    if (!this.form) {
      this.form = this.fb.group({
        name: ['', Validators.required],
        age: ['', Validators.required],
        gender: ['', Validators.required],
        zipNo: '',
        baseAddr: [{value: '', disabled: true}],
        detailAddr: ''
      });
    }

    this.form.patchValue({
      name: user.name,
      age: user.age,
      gender: user.gender
    });

    if(user.addr) {
      this.zipNo.setValue(user.addr.zip_no ? user.addr.zip_no : '');
      this.baseAddr.setValue(user.addr.base_addr ? user.addr.base_addr : '');
      this.detailAddr.setValue(user.addr.detail_addr ? user.addr.detail_addr : '');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedUser) {
      this.setForm(changes.selectedUser.currentValue);
    }
  }

  setAddr(addr: any) {
    this.zipNo.setValue(addr.zipNo);
    this.baseAddr.setValue(addr.baseAddr);
    this.detailAddr.setValue('');
  }

  update() {
    if (!this.validate()) {
      return;
    }

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

    if (isNaN(this.age.value)) {
      this.dialog.open(AlertDialogComponent, {
        data: {
          title: "사용자 수정",
          message: "나이 항목을 확인해주세요."
        }
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
      this.gender.value,
      this.zipNo.value,
      this.baseAddr.value,
      this.detailAddr.value
    ).subscribe((res: any) => {
      if (res === "success") {
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
      if (res === "success") {
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
