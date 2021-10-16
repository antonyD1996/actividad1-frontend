import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { JwtResponse } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  SERVIDOR: string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string = "";
  constructor(private httClient: HttpClient, private router: Router) { }

  register(usuario: Usuario): Observable<JwtResponse> {
    return this.httClient.post<JwtResponse>(`${this.SERVIDOR}/register`, usuario).pipe(tap((res: JwtResponse) => {
      if (res) {
        //guardan token
        this.guardarToken(res.token, res['rol'])
      }

    })

    );
  }

  login(usuario: Usuario): Observable<JwtResponse> {
    return this.httClient.post<JwtResponse>(`${this.SERVIDOR}/autenticacion`, usuario).pipe(tap((res: JwtResponse) => {
      if (res) {
        //guardan token
        console.log(res);
        this.guardarToken(res.token, res['rol'])
      }

    })

    );
  }


  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER_ROL");
    this.router.navigateByUrl('/')
  }

  private guardarToken(token: string, rol: string): void {

    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("USER_ROL", rol);
    this.token = token;


  }

  validarAcceso(): void {
    const token = localStorage.getItem("ACCESS_TOKEN")
    const rol = localStorage.getItem("USER_ROL")
    if (token && rol) {
      rol === 'admin' ? this.router.navigateByUrl('/admin') : this.router.navigateByUrl('/user')
    } else {
      this.router.navigateByUrl('/auth/login')
    }
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN") || "";
    }
    return this.token;
  }

}
