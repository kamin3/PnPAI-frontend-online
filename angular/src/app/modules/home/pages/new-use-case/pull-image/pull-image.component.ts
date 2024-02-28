import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DockerConfigVolumes } from '@app/data/schema/docker-config';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pull-image',
  templateUrl: './pull-image.component.html',
  styleUrls: ['./pull-image.component.css', '../new-use-case.component.css']
})
export class PullImageComponent implements OnInit {


  @Input() dockerComposeFile: string = '';
  @Input() volumesToRename: DockerConfigVolumes[] = [];
  @Output() getBackEvent = new EventEmitter<null>();
  @Output() finishStepEvent = new EventEmitter<null>();
  dockerComposeCommand: string = 'docker-compose -f docker-file-name.yaml up';
  username: string = 'admin';
  password: string = 'nG613]+P#=IF';
  volumes: { [key: string]: { for: string[]; oldValue: string; newValue: string; }; } = {};
  constructor(private translate: TranslateService) { }

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
  onClipboardCopy(successful: boolean, copyButton: HTMLButtonElement): void {
    if (!successful) return;
    let copiedText = this.translate.instant('Buttons.Copied');
    copyButton.innerText = copiedText;
    copyButton.classList.remove('copy-btn');
    copyButton.classList.add('copied-btn');
    copyButton.disabled = true;
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
