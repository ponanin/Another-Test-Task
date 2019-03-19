import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstFormComponent } from './first-form/first-form.component';
import { SecondFormComponent } from './second-form/second-form.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'form1', pathMatch: 'full'
    },
    {
        path: 'form1', component: FirstFormComponent
    },
    {
        path: 'form2', component: SecondFormComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
