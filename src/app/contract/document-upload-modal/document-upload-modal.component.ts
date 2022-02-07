import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentFile } from 'src/app/models/document-file';
import { DOCUMENT_TYPES_ARR } from 'src/app/shared/constants/document-types.constant';
import { Regex } from 'src/app/shared/constants/regex.constant';
import { TextMaskValues } from 'src/app/shared/enums/text-mask.enum';
import { FILE_TYPES_ARR } from '../../shared/constants/file-types.constant';

@Component({
  selector: 'app-document-upload-modal',
  templateUrl: './document-upload-modal.component.html',
  styleUrls: ['./document-upload-modal.component.scss']
})
export class DocumentUploadModalComponent implements OnInit {
  public files: DocumentFile[];
  public uploadedFiles: DocumentFile[] = [];
  public formGroup: FormGroup;
  public docTypes = [];
  public dateMask = TextMaskValues.Date;
  public datePlaceholder = 'MM/DD/YYYY';
  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;

  public get showThumbnail(): boolean {
    return this.uploadedFiles.length > 0;
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DocumentUploadModalComponent>) {
  }

  onFileChanged(files: File[]) {
    for (const item of files) {
      const validFile = FILE_TYPES_ARR.findIndex(mimeType => mimeType === item.type) >= 0;
      const fileName = this.formGroup.get('documentType').value;

      if (validFile) {
        this.uploadedFiles.push({
          file: item,
          fileType: item.type,
          documentType: this.formGroup.get('documentType').value,
          fileName: fileName
        });
      }
    }
    this.files = new Array(...this.uploadedFiles);
    this.fileInput.nativeElement.value = [];
  }

  ngOnInit(): void {
    this.docTypes = DOCUMENT_TYPES_ARR;
    this.formGroup = this.formBuilder.group({
      documentType: [null, [Validators.required]],
      effectiveDate: ['', [Validators.required, Validators.pattern(Regex.DATE)]],
      expirationDate: ['', [Validators.required, Validators.pattern(Regex.DATE)]]
    });
  }

  upload(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    this.dialogRef.close({ formValue: this.formGroup.value, files: this.uploadedFiles });
  }

  cancel(): void {
    this.dialogRef.close({});
  }
}
