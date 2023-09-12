import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VillageListComponent } from './village-list/village-list.component';
import { VillageEditComponent } from './village-edit/village-edit.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', component: VillageListComponent, pathMatch: 'full' },  // Rediriger vers la liste des villages par défaut
    { path: 'edit/:id', component: VillageEditComponent },
    { path: 'contact', component: ContactComponent },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
