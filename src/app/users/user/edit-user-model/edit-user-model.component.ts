import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-user-model',
  templateUrl: './edit-user-model.component.html',
  styleUrls: ['./edit-user-model.component.css']
})
export class EditUserModelComponent implements OnInit {
  userForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public userData: any,
  private dialogRef: MatDialogRef<EditUserModelComponent>,
  private userService: UserService,
  private formBuilder: FormBuilder) { 
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      usertype: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
    }
    ngOnInit(): void {
      this.initForm();
      this.populateForm();
    }

    passwordMatchValidator(control: AbstractControl) {
      const password = control.get('password').value;
      const confirmPassword = control.get('cpassword').value;
      if (password !== confirmPassword) {
        control.get('cpassword').setErrors({ passwordMismatch: true });
      } else {
        return null;
      }
    }
  
    initForm(): void {
      this.userForm = this.formBuilder.group({
        id: [''],
        name: [''],
        email: [''],
        username:[''],
        usertype:[''],
        password:[''],
        cpassword:['']
        // Add other form controls here
      });
    }
  
    populateForm(): void {
      // Populate the form with user data
      this.userForm.patchValue({
        id:this.userData.id,
        name: this.userData.name,
        email: this.userData.email,
        username:this.userData.username,
        usertype:this.userData.userType,
        password:this.userData.password,
        cpassword:this.userData.confirmPassword
      });
    }
    save(): void {
      const updatedUserData = this.userForm.value;
    
      this.userService.updateUser(updatedUserData).subscribe(
        () => {
          
    
          // Close the dialog
          this.dialogRef.close();
        },
        error => {
          console.error('Error updating user:', error);
          // Handle error
        }
      );
    }
    
 cancel(){
  this.dialogRef.close();
 }
}
