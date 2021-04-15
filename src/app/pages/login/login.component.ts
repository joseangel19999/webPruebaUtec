import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mixinColor } from '@angular/material/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuarioService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginU:boolean;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  formulario:FormGroup;
  constructor(private formBuilder:FormBuilder
              ,private usuarioService:UsuarioService
              ,private router:Router
              ,private snackbar:MatSnackBar) { }
  

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formulario=this.formBuilder.group({
        correo:['',Validators.required],
        password:['',Validators.required]
    });
  }

  validarUsuario(){
    if(this.formulario.invalid){
      return;
    }
    this.loginU=true;
    this.usuarioService.loginUsuario(this.formulario.value).subscribe(respuesta=>{
      if(respuesta.exito==0){
        this.mostrarSnackBar(respuesta.mensaje);
        this.loginU=false;
      }else{
        this.navegacion();
        this.loginU=false;
      }
      console.log(respuesta);
    },error=>{
      console.log(error);
    });
   // this.router.navigate(['/personas']);
  }
  navegacion():void{
    this.router.navigate(['/usuarios']);
  }
  mostrarSnackBar(mensaje:string):void{
    this.snackbar.open(mensaje,'Ok',{
      duration:2500,
      verticalPosition:this.verticalPosition,
      horizontalPosition:this.horizontalPosition,
    })
  }

}
