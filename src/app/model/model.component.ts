import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent {

  user: any = {}; // Object to store user details

  constructor(private dialogRef: MatDialogRef<ModelComponent>) {}

  ngOnInit(): void {}
  save(): void {
    // Implement save logic here
    // You can access user details from this.user and perform any necessary actions
    this.dialogRef.close(this.user); // Close the modal and pass user data back
  }

  cancel(): void {
    this.dialogRef.close(); // Close the modal without passing any data back
  }
}
