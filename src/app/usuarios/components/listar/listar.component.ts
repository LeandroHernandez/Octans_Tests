import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, of } from 'rxjs';
import { Rol, Usuario } from '../../interfaces/usuarios.interface';
import { catchError } from 'rxjs/operators';
import { UsuariosService } from '../../services/usuarios.service';
import { Filter } from '../../interfaces/filter.interface';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  public searchValue: string = '';
  public visible: boolean = false;

  filters: Filter[] = [];

  get usuarios$(): Observable<Usuario[]> {
    return this._usuariosSvc.usaurios$;
  }

  get loading$(): Observable<boolean> {
    return this._usuariosSvc.loading$;
  }

  constructor(private _http: HttpClient, private _usuariosSvc: UsuariosService) {}

  ngOnInit(): void {
    this.listarRoles();
    this.loadDataFromServer();
  }

  filterState = [
    { text: 'Sí', value: true },
    { text: 'No', value: false },
  ];

  filterRol = [];

  listarRoles(): void {
    this._http
      .get<Rol[]>('http://localhost:1337/roles')
      .subscribe((resp) => (this.filterRol = resp.map((rol) => ({ text: rol.nombre, value: rol.id }))));
  }

  loadDataFromServer(): void {
    this._usuariosSvc.filters = this.filters;
    this._usuariosSvc.searchValue = this.searchValue;
    this._usuariosSvc.getUsers().subscribe();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { filter } = params;
    this.filters = filter;
    this.loadDataFromServer();
  }

  reset(): void {
    this.searchValue = '';
    this.filters = [];
    this.loadDataFromServer();
  }

  search(): void {
    this.visible = false;
    this.loadDataFromServer();
  }

  deleteUser(id: number) {
    console.log(id);
    this._usuariosSvc.deleteUser(id).subscribe();
  }

  editUser(usuario: Usuario) {
    this._usuariosSvc.selectUserEdit(usuario);
  }
}
