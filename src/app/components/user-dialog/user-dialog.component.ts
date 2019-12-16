import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

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
    private service: UserService
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

    this.service.userPost(
      this.name.value,
      Number(this.age.value),
      this.gender.value
    ).subscribe((res: any) => {
      if (res == "success") {
        alert("성공");
        this.dialogRef.close(true);
      } else {
        alert("실패");
      }      
    }, (err) => {
      console.error(err);
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

}
