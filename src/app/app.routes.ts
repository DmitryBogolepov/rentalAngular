import {RouterModule, Routes} from '@angular/router';
import { Main } from './views/main/main';
import { Catalog } from './views/catalog/catalog';
import {ApartmentComponent} from './views/apartment/apartment';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  { path: '', component: Main },
  { path: 'catalog', component: Catalog },
  { path: 'apartment/:id', component: ApartmentComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
