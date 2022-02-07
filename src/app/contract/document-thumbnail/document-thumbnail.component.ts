import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DocumentFile } from 'src/app/models/document-file';

@Component({
  selector: 'app-document-thumbnail',
  templateUrl: './document-thumbnail.component.html',
  styleUrls: ['./document-thumbnail.component.scss',
  ]
})
export class DocumentThumbnailComponent implements OnChanges {
  @Input()
  public files: DocumentFile[] = [];

  @Input()
  public height: number = 100;

  @Input()
  public width: number = 100;

  public previews: { src: string, fileType: string }[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.files.currentValue) {
      this.previews = [];
      const files = changes.files.currentValue.map(u => u.file);
      files.forEach((file: File) => {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push({ src: e.target.result, fileType: file.type });
        };

        reader.readAsDataURL(file);
      });
    }
  }

}
