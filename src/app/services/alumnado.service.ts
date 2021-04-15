import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { IPersonaDTO } from '../models/personaDTO';
import { IResponse } from './response';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  listaPersonas:IPersonaDTO[]=[];
  listaTemp:IPersonaDTO[]=[];
  response:IResponse;
    //el behavierSubject es como un observable con mas funciones
    private usuarioSubject: BehaviorSubject<IResponse>;
    //variable de tipo Obserbable IUsuario para comunicar los cambios datos del usuario
    private respuesta; 
    private itemsObservable;

  constructor() { 
    this.respuesta=new Subject<IResponse>();
    this.itemsObservable== this.respuesta.asObservable();
  }

  registroPersona(persona:IPersonaDTO):Observable<IResponse>{
    this.llenarLista();
    this.listaPersonas;
    if(this.listaPersonas!=null){
      this.listaPersonas.push(persona);
      localStorage.setItem('listPersonas',JSON.stringify(this.listaPersonas)); 
    }else{
      this.listaTemp.push(persona);
      localStorage.setItem('listPersonas',JSON.stringify(this.listaTemp)); 
    }
    this.response={
      exito:1,
      mensaje:'Registro Exitoso',
      data:''
    }
    this.respuesta.next(this.response);
    return this.respuesta;
   /*  if(this.listaPersonas.length==0){

    } */
    /* this.listaPersonas.push(persona);
    localStorage.setItem('listPersonas',JSON.stringify(this.listaPersonas)); */
  }

  getListaPersonas():IPersonaDTO[]{
    this.llenarLista();
    return this.listaPersonas;
  }
  eliminarPersona(index:number){
    this.llenarLista();
    this.listaPersonas.splice(index,1);
    localStorage.setItem('listPersonas',JSON.stringify(this.listaPersonas));
  }
  llenarLista():void{
    this.listaPersonas=JSON.parse(localStorage.getItem('listPersonas'));
  }
}
