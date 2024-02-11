import { Component, OnInit } from '@angular/core';
import { UseCaseModel } from '@app/data/schema/usecase-model';
import { UseCaseModelsService } from '@app/data/services/usecase-models.service';
import { HttpErrorHandler } from '@app/shared/services/httpErrorHandler.service';

@Component({
  selector: 'app-current-use-cases',
  templateUrl: './current-use-cases.component.html',
  styleUrls: ['./current-use-cases.component.css']
})
export class CurrentUseCasesComponent implements OnInit {


  useCaseModels: UseCaseModel[] = [];

  constructor(
    private useCaseModelsService: UseCaseModelsService,
    private httpErrorHandler: HttpErrorHandler
  ) {
  }

  industries = [{
    "Key": "E-commerce",
    "Path": "./assets/icons/ecomm.svg"
  }];

  datasources = [
    {
      "Key": "Woocommerce",
      "Path": "./assets/logos/pnp-create-model-woocommerce-logo.svg"
    },
    {
      "Key": "API",
      "Path": "./assets/logos/pnp-create-model-api-logo.svg"
    },
    {
      "Key": "Excel",
      "Path": "./assets/logos/pnp-create-model-excel-logo.svg"
    }
  ];

  ngOnInit(): void {
    this.useCaseModelsService.get().subscribe({
      next: (value: UseCaseModel[]) => {
        this.useCaseModels = value.map(item => {
          item.dataSourceImage = this.datasources.find(d => d.Key == item.dataSource)!.Path;
          item.industryIcon = this.industries.find(d => d.Key == item.industry)!.Path;
          return item;
        });
      },
      error: (err) => {
        this.httpErrorHandler.handleError(err);
      },
    });
  }
}
