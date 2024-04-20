import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteModelComponent } from './delete-model/delete-model.component';
import { UserModelComponent } from './user-model/user-model.component';
import { UserService } from '../../service/user.service';
import { EditUserModelComponent } from './edit-user-model/edit-user-model.component';
import { FormBuilder, FormGroup } from '@angular/forms';


import * as DataTables from 'datatables.net';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  users$: any[] = [];
  users: any[] = [];
  selectedUserName: string = '';
  dtOptions: any = {
    pagingType: 'simple_numbers',
    lengthMenu: [10, 25, 50, 100]
    // Add other DataTables options as needed
  };

  constructor(private data: AuthService, private dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  };
  getAllUsers() {
    this.userService.getAllUsers().subscribe(users => {
        this.users = users;
        this.users$ = users;
      });
      const filteredUsers = this.filterUsers();
      this.users$ = filteredUsers;
  }
  
  filterUsers() {
    
    return this.users.filter(user => {
      return (!this.selectedUserName || user.name === this.selectedUserName)
    })
   
  }
 
  openCreateModal() {
    const dialogRef = this.dialog.open(UserModelComponent, {
      width: '400px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  editSalesRep(userId: string) {
    // Find the user with the specified userId
    const userData = this.users.find(user => user.id === userId);

    // If user data is found
    if (userData) {
      const dialogRef = this.dialog.open(EditUserModelComponent, {
        width: '400px', // adjust as needed
        data: userData, // pass user data to modal
      });
      console.log(userData)
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // Handle modal close event if needed
      });
    } else {
      console.error('User not found');
      // Handle case where user data is not found
    }
  }


  onDeleteClick(userId: string): void {
    const dialogRef = this.dialog.open(DeleteModelComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this item?', userId: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed deletion, handle delete action
        // For example:
        // this.deleteItem();
        console.log('Item deleted');
      } else {
        // User cancelled deletion
        console.log('Deletion cancelled');
      }
    });
  }

  viewSalesRep(userId: string) {
    // Find the user with the specified userId
    const userData = this.users.find(user => user.id === userId);

    // If user data is found
    if (userData) {
      const dialogRef = this.dialog.open(ViewUserComponent, {
        width: '400px', // adjust as needed
        data: userData, // pass user data to modal
      });
      console.log(userData)
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // Handle modal close event if needed
      });
    } else {
      console.error('User not found');
      // Handle case where user data is not found
    }
  }

}


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./user.component.css']
})
export class ViewUserComponent implements OnInit {

  userForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public userData: any, private dialogRef: MatDialogRef<ViewUserComponent>,
    private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.initForm();
    this.populateForm();
  }



  initForm(): void {
    this.userForm = this.formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      username: [''],
      usertype: [''],
      password: [''],
      cpassword: ['']
      // Add other form controls here
    });
  }

  populateForm(): void {
    // Populate the form with user data
    this.userForm.patchValue({
      id: this.userData.id,
      name: this.userData.name,
      email: this.userData.email,
      username: this.userData.username,
      usertype: this.userData.userType,
      password: this.userData.password,
      cpassword: this.userData.confirmPassword
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
