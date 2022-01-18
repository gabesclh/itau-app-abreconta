import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(mod => mod.PerfilModule)
  },
  { path: '**', redirectTo: 'perfil' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
