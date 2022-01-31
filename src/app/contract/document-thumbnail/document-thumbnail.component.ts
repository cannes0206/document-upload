import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DocumentFile } from 'src/app/models/document-file';

@Component({
  selector: 'app-document-thumbnail',
  templateUrl: './document-thumbnail.component.html',
  styleUrls: ['./document-thumbnail.component.scss']
})
export class DocumentThumbnailComponent implements OnInit, OnChanges {
  @Input() files: DocumentFile[];
  public previews: { src: string, fileType: string }[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.files) {
      const previews = simpleChanges.files.currentValue.map(f => f.file);
      previews.forEach((file: File) => {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push({ src: e.target.result, fileType: file.type });
        };

        reader.readAsDataURL(file);
      });
    }
  }

}
