import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuarios.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  public usuarioAEditar: Usuario = null;

  constructor() {}

  ngOnInit(): void {}

  usarioEdit(event: Usuario) {
    this.usuarioAEditar = event;
  }
}
