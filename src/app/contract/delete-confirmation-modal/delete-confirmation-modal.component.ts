import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.scss']
})
export class DeleteConfirmationModalComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmationModalComponent>) {
  }

  deleteContract(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
