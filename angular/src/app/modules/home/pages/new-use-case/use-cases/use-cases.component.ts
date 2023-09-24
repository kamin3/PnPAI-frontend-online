import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UseCase, UseCaseCategory } from '@app/data/schema/usecase';
import { UseCaseService } from '@app/data/services/use-case.service';

@Component({
  selector: 'app-use-cases',
  templateUrl: './use-cases.component.html',
  styleUrls: ['./use-cases.component.css']
})
export class UseCasesComponent implements OnInit {

  @Output() selectedCaseEmit = new EventEmitter<number>();

  useCases: UseCaseCategory[] = [];
  selectedCaseValue: number = 0;
  constructor(private useCaseService: UseCaseService) {

  }
  ngOnInit(): void {
    this.useCaseService.get().subscribe({
      next: (value: UseCaseCategory[]) => {
        this.useCases = value;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectCase(value: number) {
    this.selectedCaseValue = value;
  }

  generateToken() {
    this.selectedCaseEmit.emit(this.selectedCaseValue);
  }
}
