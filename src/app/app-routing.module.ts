import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/pages/auth/auth.component';
import { UsuariosGuard } from './usuarios/guards/usuarios.guard';
import { GestionComponent } from './usuarios/pages/gestion/gestion.component';

const routes: Routes = [
  {
    path: 'gestion',
    component: GestionComponent,
    loadChildren: () => import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
    canLoad: [UsuariosGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: 'gestion',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
