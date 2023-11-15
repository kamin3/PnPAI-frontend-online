import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from '@schema/image';

@Component({
  selector: 'app-images-versions',
  templateUrl: './images-versions.component.html',
  styleUrls: ['./images-versions.component.css', '../new-use-case.component.css']
})
export class ImagesVersionsComponent implements OnInit {

  @Input() images: Image[] = [];
  @Output() selectedImageEmit = new EventEmitter<string>();
  @Output() getBackEvent = new EventEmitter<null>();
  selectedImageId: string = "";

  constructor() {
  }
  ngOnInit(): void {
    this.selectedImageId = this.images[0].id;
  }

  selectImage(event: Event) {
    let imageId = (event.target as HTMLSelectElement).value;
    this.selectedImageId = imageId;
  }
  generateToken() {
    this.selectedImageEmit.emit(this.selectedImageId);
  }
  getBack() {
    this.getBackEvent.emit();
  }

}
