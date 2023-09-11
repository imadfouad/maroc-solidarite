import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VillageListComponent } from './village-list/village-list.component';
import { VillageEditComponent } from './village-edit/village-edit.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/villages', pathMatch: 'full' }, // Rediriger vers la liste des villages par défaut
  { path: 'villages', component: VillageListComponent },
  { path: 'edit/:id', component: VillageEditComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
