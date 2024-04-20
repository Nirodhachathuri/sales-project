import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-model',
  templateUrl: './user-model.component.html',
  styleUrls: ['./user-model.component.css']
})
export class UserModelComponent implements OnInit {

  user: any = {}; // Object to store user details
  userForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<UserModelComponent>,private userService: UserService,private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      usertype: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  
  ngOnInit(): void {}
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('cpassword');
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }
  save(): void {
    this.userService.saveUserDetails(this.user)
      .subscribe(response => {
        console.log('User details saved successfully:', response);
        this.dialogRef.close(this.user); // Close the modal and pass user data back
        // Optionally, reset the form or show a success message
      }, error => {
        console.error('Error saving user details:', error);
        // Optionally, show an error message to the user
      });


      if (this.userForm.valid) {
        const formData = this.userForm.value; // Get the form values
        // Call your service method to save the data
        this.userService.saveUserDetails(formData).subscribe(
          response => {
            // Handle success response
            console.log('User saved successfully:', response);
            // Optionally, reset the form after successful submission
            this.dialogRef.close(this.user);
          },
          error => {
            // Handle error response
            console.error('Error saving user:', error);
            
            // Optionally, display an error message to the user
          }
        );
      } else {
        // Form is invalid, display error messages or take appropriate action
        this.dialogRef.close(this.user);
      }
  }

  cancel(): void {
    this.dialogRef.close(); // Close the modal without passing any data back
  }

}
