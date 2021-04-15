import { Injectable,OnInit } from '@angular/core';
import { ILoginDTO } from '../models/loginDTO';
import { IPersonaDTO } from '../models/personaDTO';
import { PersonaService } from './alumnado.service';

@Injectable({
    providedIn:'root'
})

export class LoginServices implements OnInit{

    listaPersonas:IPersonaDTO[]=[];
    constructor(private servicePersona: PersonaService){

    }
    ngOnInit(): void {
       
    }
    loginUsuario(usuario:ILoginDTO):void{
      this.llenarLista();
        this.listaPersonas.map((item)=>{
             if(usuario.correo===item['correo']  && usuario.password===item['pass1']){
                localStorage.setItem('userLogin',usuario.correo);
            }
        });
    }
    llenarLista(){
        this.listaPersonas= this.servicePersona.getListaPersonas();
    }
    logout(){
        localStorage.removeItem('userLogin');
    }

}