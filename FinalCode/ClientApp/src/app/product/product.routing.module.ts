import { ViewComponent } from './view/view.component';
import { RouterModule } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { ProductComponent } from './product.component';
import { AddComponent } from './add/add.component';
import { NgModule } from '@angular/core';

const routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: '',
        component: ListingComponent,
      },
      {
        path: 'add',
        component: AddComponent,
      },
      {
        path: 'view/:id',
        component: ViewComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductRoutingModule {

}
