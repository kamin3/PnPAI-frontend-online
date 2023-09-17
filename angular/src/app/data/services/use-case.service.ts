import { Observable, of, pipe, map, toArray } from 'rxjs';
import data from '@app/data/json/usecases.json';
import { Injectable } from '@angular/core';
import { UseCaseCategory, UseCase } from '../schema/usecase';

@Injectable({
    providedIn: 'root'
})
export class UseCaseService {
    get(): Observable<UseCaseCategory[]> {
        return of(...data.UseCases).pipe(
            map((item: any) => ({
                name: item.Name,
                value: item.Value,
                cases: item.Cases.map((item: any) => ({
                    name: item.Name,
                    value: item.Value
                } as UseCase)
                )
            } as UseCaseCategory))
            , toArray()
        );
    }
}
