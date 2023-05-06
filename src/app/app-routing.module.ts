import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './@core/guards/auth.guard';
import { DefaultLayoutComponent } from './@shared/components/layouts/default-layout/default-layout.component';
import { UnauthenticatedLayoutComponent } from './@shared/components/layouts/unauthenticated-layout/unauthenticated-layout.component';
import { AuthenticatedLayoutComponent } from './@shared/components/layouts/authenticated-layout/authenticated-layout.component';
import { ErrorPageNotFoundComponent } from './error-page-not-found/error-page-not-found.component';
import { ErrorUnauthorizedComponent } from './error-unauthorized/error-unauthorized.component';
import { ErrorPageComponent } from './error-page/error-page.component';

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
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'pages',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./page/page.module').then(m => m.PageModule)
      },
      {
        path: 'emp',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'cms',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
      },
      {
        path: 'timesheet',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./timesheet/timesheet.module').then(m => m.TimesheetModule)
      },
      {
        path: 'project',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./project/project.module').then(m => m.ProjectModule)
      },
      {
        path: 'leave',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./leave/leave.module').then(m => m.LeaveModule)
      },
      // {
      //   path: 'asset-management',
      //   canActivateChild: [AuthGuard],
      //   loadChildren: () => import('./asset-management/asset-management.module').then(m => m.AssetManagementModule)
      // }

    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },
  {
    path: 'unauthorized',
    component: ErrorUnauthorizedComponent
  },
  {
    path: '**', // wildcard will be at always last
    component: ErrorPageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
