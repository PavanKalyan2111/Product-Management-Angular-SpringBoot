import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
 
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'products', component:ProductsComponent, canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path: 'about', component:AboutComponent, canActivate:[RoleGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
