import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: '', redirectTo: "/homepage", pathMatch: "full" },
  { path: "create-account", component: CreateaccountComponent },
  { path: "sign-in", component: SignInComponent },
  { path: "manage-account", component: ManageAccountComponent },
  { path: "cart", component: CartComponent },
  { path: "product-detail/:id", component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }