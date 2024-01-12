import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from '@schema/image';

@Component({
  selector: 'app-image-connectors',
  templateUrl: './image-connectors.component.html',
  styleUrls: ['./image-connectors.component.css', '../new-use-case.component.css']
})
export class ImageConnectorsComponent implements OnInit {

  @Input() connectors: Image[] = [];
  @Output() selectedConnectorEmit = new EventEmitter<string>();
  @Output() getBackEvent = new EventEmitter<null>();
  selectedConnectorId: string = "";

  constructor() {
  }
  ngOnInit(): void {
    this.selectedConnectorId = this.connectors[0].id;
  }

  selectImage(event: Event) {
    let imageId = (event.target as HTMLSelectElement).value;
    this.selectedConnectorId = imageId;
  }
  generateToken() {
    this.selectedConnectorEmit.emit(this.selectedConnectorId);
  }
  getBack() {
    this.getBackEvent.emit();
  }

}
