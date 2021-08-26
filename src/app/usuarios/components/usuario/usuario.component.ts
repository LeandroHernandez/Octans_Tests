import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Rol, Usuario } from '../../interfaces/usuarios.interface';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  public usuariosForm: FormGroup = this._fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    activo: [true, [Validators.required]],
    rol: ['', [Validators.required]],
  });

  public usuarioEdit: Usuario = null;

  public roles: Rol[] = [];
  constructor(private _http: HttpClient, private _fb: FormBuilder, private _usauriosSvc: UsuariosService) {}

  ngOnInit(): void {
    this.listarRoles();
    this._usauriosSvc.userSelect$.subscribe((usuario) => {
      const updateUser = { ...usuario, rol: usuario.rol.id };
      this.usuariosForm.patchValue(updateUser);
      this.usuarioEdit = usuario;
    });
  }

  listarRoles(): void {
    this._http.get<Rol[]>('http://localhost:1337/roles').subscribe((resp) => (this.roles = resp));
  }

  onSubmit() {
    if (this.usuariosForm.valid) {
      if (this.usuarioEdit) {
        this._usauriosSvc
          .updateUser(this.usuariosForm.value, this.usuarioEdit.id)
          .subscribe(() => this.usuariosForm.reset());
      } else {
        this._usauriosSvc.registerUser(this.usuariosForm.value).subscribe(() => this.usuariosForm.reset());
      }
    }
  }
}
