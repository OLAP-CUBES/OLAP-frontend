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
    return this._http.get<DataStructure>(
      'http://localhost:4200/person/structure'
    );
  }
}
