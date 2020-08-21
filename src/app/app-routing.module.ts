import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { ItemsComponent } from './items/items.component';
import { DealsComponent } from './deals/deals.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
	{ path: 'general', component: GeneralComponent },
	{ path: 'items', component: ItemsComponent },
	{ path: 'deals', component: DealsComponent },
	{ path: 'customers', component: CustomersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
	GeneralComponent,
	ItemsComponent,
	DealsComponent,
	CustomersComponent
 ];
