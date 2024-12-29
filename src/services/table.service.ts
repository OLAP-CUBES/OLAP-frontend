import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableQuery } from './table-query';
import { tableContent, TableContent } from '../components/table/table-content';
import { Observable, of } from 'rxjs';
import { DataStructure } from './data-structure';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private readonly _http: HttpClient) {}

  getTableContent(body: TableQuery): Observable<TableContent[]> {
    return this._http.post<TableContent[]>(
      'http://localhost:4200/person/table',
      body
    );
  }

  getDataStructure(): Observable<DataStructure> {
    return of({
      facts: ['person'],
      fields: [
        {
          fieldName: 'firstName',
          valueName: 'name',
          humanReadableName: 'First Name',
        },
        {
          fieldName: 'lastName',
          valueName: 'surname',
          humanReadableName: 'Last Name',
        },
        {
          fieldName: 'year',
          valueName: 'year',
          humanReadableName: 'Year of birth',
        },
        {
          fieldName: 'health',
          valueName: 'healthType',
          humanReadableName: 'Health',
        },
        { fieldName: 'job', valueName: 'jobName', humanReadableName: 'Job' },
      ],
    });
  }

  test(): Observable<TableContent[]> {
    return of(tableContent);
  }
}
