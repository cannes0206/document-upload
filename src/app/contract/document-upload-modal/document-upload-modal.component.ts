import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentFile } from 'src/app/models/document-file';
import { Regex } from 'src/app/shared/constants/regex.constant';
import { DOC_TYPES_ARR } from 'src/app/shared/enums/document-type.enum';
import { FILE_TYPES_ARR } from '../../shared/constants/file-types.constant';

@Component({
  selector: 'app-document-upload-modal',
  templateUrl: './document-upload-modal.component.html',
  styleUrls: ['./document-upload-modal.component.scss']
})
export class DocumentUploadModalComponent implements OnInit {
  public uploadedFiles: DocumentFile[] = [];
  public previews: { src: string, fileType: string }[] = [];
  public formGroup: FormGroup;
  public docTypes = [];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DocumentUploadModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
  }

  onFileChanged(files: File[]) {
    for (const item of files) {
      this.uploadedFiles = [];
      const validFile = FILE_TYPES_ARR.find(mimeType => mimeType === item.type);

      if (validFile) {
        this.uploadedFiles.push({
          file: item,
          fileType: this.formGroup.get('documentType').value,
          fileName: this.formGroup.get('fileName').value || 'Test File'
        });
      }
    }
  }

  ngOnInit(): void {
    this.docTypes = DOC_TYPES_ARR;
    console.log(this.docTypes);
    this.formGroup = this.formBuilder.group({
      documentType: ['', [Validators.required]],
      fileName: [''],
      effectiveDate: ['', [Validators.required, Validators.pattern(Regex.DATE)]],
      expirationDate: ['', [Validators.required, Validators.pattern(Regex.DATE)]]
    });
  }

  upload(): void {
    this.dialogRef.close({ formValue: this.formGroup.value, files: this.uploadedFiles });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
