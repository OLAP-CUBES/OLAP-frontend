import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TableComponent } from '../components/table/table.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: AppComponent },
  { path: 'table', component: TableComponent },
];
