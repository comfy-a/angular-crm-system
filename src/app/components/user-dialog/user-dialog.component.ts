import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { AlertDialogComponent } from 'src/app/share/components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from 'src/app/share/components/confirm-dialog/confirm-dialog.component';

export interface DialogData {
  id: number;
  name: string;
  age: number;
  gender: string;
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private fb: FormBuilder,
    private service: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['남자', Validators.required]
    });
  }

  get name() { return this.form.get('name'); }
  get age() { return this.form.get('age'); }
  get gender() { return this.form.get('gender'); }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (!this.validate()) return;

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "사용자 등록",
        message: "사용자 정보를 등록하시겠습니까?"
      }
    }).afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.userPost();
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

  userPost() {
    this.service.userPost(
      this.name.value,
      Number(this.age.value),
      this.gender.value
    ).subscribe((res: any) => {
      if (res == "success") {
        this.dialog.open(AlertDialogComponent, {
          data: {
            title: "사용자 등록",
            message: "등록되었습니다."
          }
        }).afterClosed().subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.dialog.open(AlertDialogComponent, {
          data: {
            title: "사용자 등록",
            message: "등록되었습니다."
          }
        }).afterClosed().subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }, (err) => {
      console.error(err);
    });
  }
}
