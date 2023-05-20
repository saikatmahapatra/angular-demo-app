import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsLayoutComponent } from './settings-layout.component';
import { SiteSettingsComponent } from './site-settings/site-settings.component';
import { SiteMetaComponent } from './site-meta/site-meta.component';

const routes: Routes = [
  {
    path: '', component: SettingsLayoutComponent,
    children: [
      { path: '', component: SiteSettingsComponent },
      { path: 'site-meta', component: SiteMetaComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
