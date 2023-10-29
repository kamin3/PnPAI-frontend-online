import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Industry } from '@schema/industry';
import { IndustryService } from '@app/data/services/industry.service';

@Component({
  selector: 'app-use-cases',
  templateUrl: './use-cases.component.html',
  styleUrls: ['./use-cases.component.css']
})
export class UseCasesComponent implements OnInit {

  @Output() selectedCaseEmit = new EventEmitter<string>();

  industries: Industry[] = [];
  selectedCaseValue: string = "";
  constructor(private industryService: IndustryService) {

  }
  ngOnInit(): void {
    this.industryService.getall("IND-123").subscribe({
      next: (value) => {
        this.industries = value.message;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectCase(value: string) {
    this.selectedCaseValue = value;
  }

  generateToken() {
    this.selectedCaseEmit.emit(this.selectedCaseValue);
  }
}
