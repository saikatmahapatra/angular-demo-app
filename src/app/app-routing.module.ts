import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './@core/guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DefaultLayoutComponent } from './@shared/components/layouts/default-layout/default-layout.component';
import { UnauthenticatedLayoutComponent } from './@shared/components/layouts/unauthenticated-layout/unauthenticated-layout.component';
import { AuthenticatedLayoutComponent } from './@shared/components/layouts/authenticated-layout/authenticated-layout.component';

// Routing with lazy loading
const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: UnauthenticatedLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'example',
        loadChildren: () => import('./ng-example/ng-example.module').then(m => m.NgExampleModule)
      },
    ]
  },
  {
    path: '',
    component: AuthenticatedLayoutComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'pages',
        canActivate: [AuthGuard],
        loadChildren: () => import('./page/page.module').then(m => m.PageModule)
      },
      {
        path: 'user',
        canActivate: [AuthGuard],
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'cms',
        canActivate: [AuthGuard],
        loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
      },
      {
        path: 'timesheet',
        canActivate: [AuthGuard],
        loadChildren: () => import('./timesheet/timesheet.module').then(m => m.TimesheetModule)
      },
      {
        path: 'project',
        canActivate: [AuthGuard],
        loadChildren: () => import('./project/project.module').then(m => m.ProjectModule)
      }

    ]
  },
  {
    path: '**', // wildcard will be at always last
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
