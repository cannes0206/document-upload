import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Contract } from 'src/app/models/contract';
import * as moment from 'moment/moment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteConfirmationModalComponent } from './../delete-confirmation-modal/delete-confirmation-modal.component';
import { DocumentUploadModalComponent } from '../document-upload-modal/document-upload-modal.component';
import { DocumentFile } from 'src/app/models/document-file';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {
  @Input() contract: Contract;
  @Output() updateContract: EventEmitter<Contract> = new EventEmitter<Contract>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDeleteModal(contractId: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    dialogConfig.width = '300px';

    this.dialog.open(DeleteConfirmationModalComponent, dialogConfig).afterClosed().subscribe(data => {
      if (data) {
        this.delete.emit(contractId);
      }
    });
  }

  openUploadModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;

    this.dialog.open(DocumentUploadModalComponent, dialogConfig).afterClosed().subscribe((data: { formValue: Contract, files: DocumentFile[] }) => {
      const updatedContract = { ...this.contract, ...data.formValue};
      updatedContract.files = data.files;
      this.updateContract.emit(updatedContract);
    });
  }

  formatDate(expirationDate: Date): string {
    return expirationDate ? `Expiry Date: ${moment(expirationDate).format('MMMM y')}` : '';
  }

  setClass(contract: Contract): string {
    const effectiveDate = contract.effectiveDate ? moment(contract.effectiveDate) : '';
    const expirationDate = contract.expirationDate ? moment(contract.expirationDate) : '';
    const today = moment();

    if (!effectiveDate) {
      return 'not-started';
    } else if (today.isSameOrAfter(effectiveDate) && (expirationDate && today.isSameOrBefore(expirationDate))) {
      return 'active';
    } else if (expirationDate && today.isAfter(expirationDate)) {
      return 'expired';
    }
  }
}
