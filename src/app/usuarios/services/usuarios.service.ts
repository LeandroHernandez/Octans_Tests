import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Usuario } from '../interfaces/usuarios.interface';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { Filter } from '../interfaces/filter.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private _url: string = 'http://localhost:1337';

  private _loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private _userSelect: Subject<Usuario> = new Subject();
  private _usuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject([]);

  public filters: Filter[] = [];
  public searchValue: string = '';

  public userSelect$ = this._userSelect.asObservable();
  public usaurios$ = this._usuarios.asObservable();
  public loading$ = this._loading.asObservable();

  public auth: boolean = true;

  constructor(private _http: HttpClient) {}

  selectUserEdit(usuario: Usuario) {
    this._userSelect.next(usuario);
  }

  registerUser(usuario: Usuario) {
    this._loading.next(true);
    return this._http.post<Usuario>(`${this._url}/usuarios`, usuario).pipe(mergeMap(() => this.getUsers()));
  }

  updateUser(usuario: Usuario, id: number) {
    this._loading.next(true);
    return this._http
      .put<Usuario>(`${this._url}/usuarios/${id}`, { ...usuario, id })
      .pipe(mergeMap(() => this.getUsers()));
  }

  getUsers(): Observable<Usuario[]> {
    const oldLoading = this._loading.getValue();
    this._loading.next(oldLoading ? true : true);
    let params = new HttpParams();
    if (this.searchValue) {
      params = params.append('nombre_contains', this.searchValue);
    }
    this.filters.forEach((filter) => {
      filter.value.forEach((value) => (params = params.append(filter.key, value)));
    });
    return this._http.get<Usuario[]>(`http://localhost:1337/usuarios`, { params }).pipe(
      tap((usuarios) => {
        this._usuarios.next(usuarios);
        this._loading.next(false);
      }),
      catchError(() => of([]))
    );
  }

  deleteUser(id: number) {
    this._loading.next(true);
    return this._http.delete<Usuario>(`${this._url}/usuarios/${id}`).pipe(mergeMap(() => this.getUsers()));
  }
}
