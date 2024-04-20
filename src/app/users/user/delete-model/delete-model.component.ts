import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-delete-model',
  templateUrl: './delete-model.component.html',
  styleUrls: ['./delete-model.component.css']
})
export class DeleteModelComponent{

  constructor(
    public dialogRef: MatDialogRef<DeleteModelComponent>,
    private userService:UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelClick(): void {
    this.dialogRef.close(false); // Pass false to indicate cancellation
  }

  onConfirmClick(): void {
    
    let id = this.data.userId;
    console.log(id)
    // Call the userService method to archive the user data
    this.userService.archiveUser(id).subscribe(
      () => {

        console.log(this.data)
        console.log('User archived successfully');
        this.dialogRef.close(true); // Close the dialog and pass true to indicate success
      },
      (error) => {
        console.error('Error archiving user:', error);
        // Handle error as needed
      }
    );
  }

}
