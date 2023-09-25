import { Observable, of, pipe, map, toArray } from 'rxjs';
import data from '@app/data/json/currentUseCases.json';
import { Injectable } from '@angular/core';
import { UseCaseModel } from '../schema/usecase-model';

@Injectable({
    providedIn: 'root'
})
export class UseCaseModelsService {
    get(): Observable<UseCaseModel[]> {
        return of(...data.CurrentModels).pipe(
            map((item: any) => ({
                id: item.Id,
                name: item.Name,
                useCase: item.UseCase,
                industry: item.Industry,
                status: item.Status,
                dataSource: item.DataSource,
                lastTrainedDate: new Date(item.LastTrained),
                errorMessage: item.ErrorMessage,
            } as UseCaseModel))
            , toArray()
        );
    }
}
