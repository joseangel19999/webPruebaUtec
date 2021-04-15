import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPersona } from '../models/IPersona';
import { IRespuestaHttp } from '../models/IRespuestaHtpp';

@Injectable({
    providedIn:'root'
})
export class PersonaServicio{

    baseUrl:string = environment.baseUrl;
    
    constructor(private htpp:HttpClient){
    }

    getPersonas(){
       return this.htpp.get<IPersona[]>(`${this.baseUrl}/api/persona`);
    }
    registrarPersona(persona:IPersona){
       return  this.htpp.post<IRespuestaHttp>(`${this.baseUrl }/api/persona`,persona);
    }
    eliminarPersona(personaId:number){
       return this.htpp.delete<IRespuestaHttp>(`${this.baseUrl}/api/persona/${personaId}`);
    }
    consultaPersona(personaId){
       return this.htpp.get<IPersona>(`${this.baseUrl}/api/persona/${personaId}`);
    }
    modificarPersona(persona:IPersona){
       return this.htpp.put<IRespuestaHttp>(`${this.baseUrl}/api/persona`,persona);
    }
}