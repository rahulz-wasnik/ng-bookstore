
// 3rd Party Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Application files
import { RouteConstant } from './shared/constant/route.constant';

const routes: Routes = [
    { path: RouteConstant.home, loadChildren: './feature/home/home.module#HomeModule' },
    { path: RouteConstant.book, loadChildren: './feature/book-details/book-details.module#BookDetailsModule' },
    { path: '', redirectTo: RouteConstant.home, pathMatch: 'full' },
    { path: '**', redirectTo: RouteConstant.home, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
