import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatDialogModule} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { ContractListComponent } from './contract/contract-list.component';
import { ContractDetailsComponent } from './contract/contract-details/contract-details.component';
import { DocumentThumbnailComponent } from './contract/document-thumbnail/document-thumbnail.component';
import { DocumentUploadModalComponent } from './contract/document-upload-modal/document-upload-modal.component';
import { DeleteConfirmationModalComponent } from './contract/delete-confirmation-modal/delete-confirmation-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeUrlPipe } from './shared/pipes/safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContractListComponent,
    ContractDetailsComponent,
    DocumentThumbnailComponent,
    DocumentUploadModalComponent,
    DeleteConfirmationModalComponent,
    SafeUrlPipe
  ],
  imports: [
  BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [DocumentUploadModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
