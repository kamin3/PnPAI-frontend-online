import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DockerConfigVolumes } from '@app/data/schema/docker-config';

@Component({
  selector: 'app-pull-image',
  templateUrl: './pull-image.component.html',
  styleUrls: ['./pull-image.component.css']
})
export class PullImageComponent implements OnInit {


  @Input() dockerComposeFile: string = '';
  @Input() volumesToRename: DockerConfigVolumes[] = [];
  @Output() getBackEvent = new EventEmitter<null>();
  @Output() finishStepEvent = new EventEmitter<null>();
  @ViewChild('copyBTN') copyBTN!: ElementRef<HTMLButtonElement>;
  volumes: { [key: string]: { for: string[]; oldValue: string; newValue: string; }; } = {};
  constructor() { }

  ngOnInit(): void {
    if (this.volumesToRename && this.volumesToRename.length > 0) {
      for (let volume of this.volumesToRename) {
        this.volumes[volume.key] = {
          'for': this.volumes[volume.key] ? [...this.volumes[volume.key].for, volume.for] : [volume.for],
          'oldValue': volume.key,
          'newValue': volume.key
        };
      }
    }
  }

  setVolumeName(event: Event, volumeKey: string) {
    let newName = (event.target as HTMLInputElement).value;
    this.volumes[volumeKey].newValue = newName;
  }
  getBack() {
    this.getBackEvent.emit();
  }

  finish() {
    this.finishStepEvent.emit();
  }

  getDockerComposeFile(): string {
    let file = this.dockerComposeFile;
    for (let key in this.volumes) {
      file = file.replaceAll(this.volumes[key].oldValue, this.volumes[key].newValue);
    }
    return file;
  }
  onClipboardCopy(successful: boolean): void {
    if (!successful) return;
    this.copyBTN.nativeElement.innerText = 'Copied';
    this.copyBTN.nativeElement.classList.remove('copy-btn');
    this.copyBTN.nativeElement.classList.add('copied-btn');
    this.copyBTN.nativeElement.disabled = true;
  }

  downloadDockerCompose() {
    const file = this.getDockerComposeFile();
    const blob = new Blob([file], { type: 'text/plain' });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'dockerComposeFile.yaml';

    a.click();

    window.URL.revokeObjectURL(url);
  }


}
