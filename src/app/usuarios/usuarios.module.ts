import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { ListarComponent } from './components/listar/listar.component';
import { GestionComponent } from './pages/gestion/gestion.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [UsuariosComponent, UsuarioComponent, BuscarComponent, ListarComponent, GestionComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    NzDividerModule,
    NzCardModule,
    NzGridModule,
    NzLayoutModule,
    NzSpaceModule,
    NzFormModule,
    NzInputModule,
    HttpClientModule,
    UsuariosRoutingModule,
    NzSelectModule,
    NzRadioModule,
    NzTableModule,
    NzIconModule,
    NzDropDownModule,
    FormsModule,
    NzPopconfirmModule,
    ReactiveFormsModule,
  ],
})
export class UsuariosModule {}
