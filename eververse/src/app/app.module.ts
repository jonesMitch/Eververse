import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

import { HeaderComponent } from './header/header.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { CapitalizePipe } from './capitalize.pipe';
import { ProductCardComponent } from './product-card/product-card.component';
import { PricePipe } from './price.pipe';
import { TitlePipe } from './title.pipe';
import { CartComponent } from './cart/cart.component';
import { ProductHorizComponent } from './product-horiz/product-horiz.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    CreateaccountComponent,
    SignInComponent,
    ManageAccountComponent,
    CapitalizePipe,
    ProductCardComponent,
    PricePipe,
    TitlePipe,
    CartComponent,
    ProductHorizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatBadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
