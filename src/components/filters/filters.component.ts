import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RequestPayload } from '../table/request-payload';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { AccordionModule } from 'primeng/accordion';
import { TooltipOptions } from 'primeng/api';
import { Option } from '../table/table.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CommonModule,
    SelectModule,
    ReactiveFormsModule,
    ButtonModule,
    AccordionModule,
    FloatLabelModule,
    InputTextModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent implements OnInit {
  @Input() isTableReady = false;
  @Input() axisOptions: Option[] = [];
  @Input() operationOptions: Option[] = [];
  @Input() facts: string[] = [];
  @Input() loading = true;
  onSubmit = output<RequestPayload>();

  isFormCorrect = false;

  previousFormValue: {
    x?: Option | null;
    y?: Option | null;
    z?: Option | null;
    operation?: Option | null;
    field?: Option | null;
    value?: Option | null;
  } = {
    x: null,
    y: null,
    z: null,
    operation: null,
    field: null,
    value: null,
  };

  readonly form = this._fb.group({
    fact: new FormControl<string | null>(null, [Validators.required]),
    x: new FormControl<Option | null>(null, [Validators.required]),
    y: new FormControl<Option | null>(null, [Validators.required]),
    z: new FormControl<Option | null>(null, [Validators.required]),
    operation: new FormControl<Option | null>(null, [Validators.required]),
    field: new FormControl<Option | null>(null, [Validators.required]),
    value: new FormControl<string | null>(null),
  });

  readonly tooltipConfig: TooltipOptions = {
    disabled: this.isTableReady,
  };

  constructor(private readonly _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.setValue({
      fact: null,
      x: null,
      y: null,
      z: null,
      operation: null,
      field: null,
      value: null,
    });
  }

  onValueChange(from: string, event: SelectChangeEvent): void {
    const { x, y, z, operation } = this.form.value;

    if (from === 'operation' && event.value['value'] === 'COUNT') {
      this.form.get('field')?.setValidators([Validators.required]);
    } else if (from === 'operation') {
      this.form.get('field')?.clearValidators();
    }

    //this.previousFormValue = this.form.value;
  }

  onFormSubmit(): void {
    const { fact, x, y, z, operation, field, value } = this.form.value;
    this.onSubmit.emit({
      fact: fact!,
      x: x!.value,
      y: y!.value,
      z: z!.value,
      operation: operation!.value,
      field: field!.value,
      value: value ?? undefined,
    });
  }
}
