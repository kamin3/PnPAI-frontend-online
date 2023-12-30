import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/shared/services/alert.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger('alertTrigger', [
      state('open', style({ transform: 'translateY(0%)' })),
      state('close', style({ transform: 'translateY(-200%)' })),
      transition('open <=> close', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class AlertComponent implements OnInit {

  constructor(public alert: AlertService) { }

  ngOnInit(): void { }

  dismiss(): void {
    this.alert.dismissAlert();
  }

}
