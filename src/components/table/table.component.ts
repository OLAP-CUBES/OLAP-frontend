import { Component, OnDestroy, OnInit } from '@angular/core';
import { FiltersComponent } from '../filters/filters.component';
import { RequestPayload } from './request-payload';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, tap } from 'rxjs';
import { TableService } from '../../services/table.service';
import { Field, TableQuery } from '../../services/table-query';
import { DataField } from '../../services/data-structure';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableContent } from './table-content';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
export interface Option {
  label: string;
  value: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    FiltersComponent,
    ProgressSpinnerModule,
    SelectModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnDestroy {
  private readonly _destroy$ = new Subject<void>();

  filterDataLoading = false;
  tableDataLoading = false;

  dataFields: DataField[] = [];
  facts: string[] = [];
  axisOptions: Option[] = [];

  readonly operationOptions: Option[] = [
    { label: 'Sum', value: 'SUM' },
    { label: 'Average', value: 'AVG' },
    { label: 'Count', value: 'COUNT' },
    { label: 'Min', value: 'MIN' },
    { label: 'Max', value: 'MAX' },
  ];

  currentPayload!: RequestPayload;
  currentContent: TableContent[] = [];

  dimensions: string[] = [];
  currentDimension = '';

  headers: string[] = [];
  rows: (number | string | null)[][] = [];

  constructor(private readonly _tableService: TableService) {}

  ngOnInit(): void {
    this.test();
    this.filterDataLoading = true;
    this._tableService
      .getDataStructure()
      .pipe(
        tap(() => {
          this.filterDataLoading = false;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((data) => {
        this.axisOptions = data.fields.map((field) => ({
          label: field.humanReadableName,
          value: field.fieldName,
        }));

        this.dataFields = data.fields;
        this.facts = data.facts;
        console.log(data);
      });
  }
  test(): void {
    this._tableService.test().subscribe((res) => {
      this.currentPayload = {
        fact: 'person',
        x: 'firstName',
        y: 'health',
        z: 'job',
        field: 'year',
        operation: 'AVG',
      };
      this.currentContent = res;
      this.parseTableData(res, true);
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onDimensionChange(event: SelectChangeEvent): void {
    this.currentDimension = event.value;
    console.log(this.currentDimension);

    this.parseTableData(this.currentContent);
  }

  initTable(payload: RequestPayload): void {
    this.tableDataLoading = true;
    this.currentPayload = payload;

    const body: TableQuery = this.prepareRequestBody(payload);

    this._tableService
      .getTableContent(body)
      .pipe(
        tap(() => {
          this.tableDataLoading = false;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((res) => {
        this.currentContent = res;
        this.parseTableData(res, true);
      });
  }

  private parseTableData(res: TableContent[], initial: boolean = false): void {
    this.dimensions = res.map((dim) => dim.z);

    if (initial) {
      this.currentDimension = this.dimensions[0];
    }
    const rows = res.find((dim) => dim.z === this.currentDimension)!.items;
    this.headers = rows[0].map(
      (cell) => cell[this.currentPayload.x] ?? ''
    ) as string[];
    this.rows = rows.map((row) => {
      return [
        row[0][this.currentPayload.y],
        ...row.map((cell) => cell['result']),
      ];
    }) as (number | string | null)[][];
    console.log(rows);
  }

  private prepareRequestBody(payload: RequestPayload): TableQuery {
    return {
      definition: {
        fact: 'person',
        fields: this.dataFields
          .filter((field) => {
            return (
              field.fieldName === payload.x ||
              field.fieldName === payload.y ||
              field.fieldName === payload.z ||
              field.fieldName === payload.field
            );
          })
          .map((field) => {
            return {
              fieldName: field.fieldName,
              valueName: field.valueName,
            };
          }) as Field[],
      },
      query: {
        x: payload.x,
        y: payload.y,
        z: payload.z,
        operation: {
          field: payload.field,
          value: payload.value ?? '',
          aggregator: payload.operation,
        },
      },
    };
  }
}
