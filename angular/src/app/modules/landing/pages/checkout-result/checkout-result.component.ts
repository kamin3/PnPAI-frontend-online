import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CONFIG } from '@app/shared/configs';

@Component({
  selector: 'app-checkout-result',
  templateUrl: './checkout-result.component.html',
  styleUrls: ['./checkout-result.component.css']
})
export class CheckoutResultComponent implements OnInit {


  dashboard_route = CONFIG.home.children.dashboard.route
  success: boolean = false
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.success = params['state'] == 'succeeded';
      }
      );
  }
}
