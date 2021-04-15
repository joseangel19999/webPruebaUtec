import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuarioToken } from 'src/app/models/IUserToken';
import { LoginServices } from 'src/app/services/loginService';
import { UsuarioService } from 'src/app/services/usuarioService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showFiller = false;
  get getUsuario(){
    return this.loginService.getUsuario;
  }
  constructor(
    private loginService:UsuarioService
    ,private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
     this.loginService.logoutUsuario();
    this.router.navigate(['/login']);
  }
}
