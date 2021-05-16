import {RouterModule, Routes} from '@angular/router';
import {PersonListComponent} from './components/person-list/person-list.component';
import {AddPersonComponent} from './components/add-person/add-person.component';
import {PersonDetailComponent} from './components/person-detail/person-detail.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-people' },
  { path: 'people-list', component: PersonListComponent },
  { path: 'add-people', component: AddPersonComponent },
  { path: 'edit-people/:id', component: PersonDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
