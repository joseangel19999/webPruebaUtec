import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IUsuario } from "../models/IUsuario";
import { IUsuarioPost } from "../models/IUsuarioPost";
import { ILoginDTO } from "../models/loginDTO";
import { IRespuestaHttp } from "../models/IRespuestaHtpp";
import { map } from "rxjs/operators";

import { IUsuarioToken } from "../models/IUserToken";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {

  baseUrl: string = environment.baseUrl;

  get getUsuario(): IUsuarioToken {
    return JSON.parse(localStorage.getItem("dataUser"));
  }

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(`${this.baseUrl}/api/usuario`);
  }
  getUsuarioRequest(usuarioId: number) {
    return this.http.get<IUsuario>(`${this.baseUrl}/api/usuario/${usuarioId}`);
  }
  
  registrarUsuario(usuario: IUsuarioPost) {
    return this.http.post<IRespuestaHttp>(
      `${this.baseUrl}/api/usuario`,
      usuario
    );
  }
  actualizarUsuario(usuario: IUsuarioPost) {
    return this.http.put<IRespuestaHttp>(
      `${this.baseUrl}/api/usuario`,
      usuario
    );
  }
  eliminarUsuario(usuarioId: number) {
    return this.http.delete<IRespuestaHttp>(
      `${this.baseUrl}/api/usuario/${usuarioId}`
    );
  }
  loginUsuario(usuarioLogin: ILoginDTO): Observable<IRespuestaHttp> {
    return this.http
      .post<IRespuestaHttp>(`${this.baseUrl}/api/usuario/login`, usuarioLogin)
      .pipe(
        map((resp) => {
          if(resp.exito==1){
            localStorage.setItem("dataUser", JSON.stringify(resp.data));
          }
          return resp;
        })
      );
  }
  logoutUsuario() {
    localStorage.removeItem("dataUser");
  }
}
