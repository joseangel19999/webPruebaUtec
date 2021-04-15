import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IPersona } from 'src/app/models/IPersona';
import { PersonaServicio } from 'src/app/services/personaServices';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayus';

@Component({
  selector: 'app-registrar-persona',
  templateUrl: './registrar-persona.component.html',
  styleUrls: ['./registrar-persona.component.css']
})
export class RegistrarPersonaComponent implements OnInit {

  formPersona:FormGroup;
    //posiciones del snacknbar
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    persona:IPersona;
    personaId:number;

  constructor(private formBuilder:FormBuilder
              ,private personaService:PersonaServicio
              ,private snackBar:MatSnackBar
              ,private router:Router
              ,private activatedRoute:ActivatedRoute) {
                if(this.router.url.includes('editarPersona')){
                 /*  this.activatedRoute.params.subscribe(data=>{
                    console.log(data);
                  }); */
                   this.activatedRoute.params
                      .pipe(
                        switchMap(({id})=>{
                          this.personaId=id;
                           return this.personaService.consultaPersona(id);
                          })).subscribe(respuesta=>{  
                            this.persona=respuesta;
                            this.modificarFormulario();
                         });
                      
            }
  }

  modificarFormulario(){
    this.formPersona.reset({//el reset permite solo agregar valores unos cuantos campos
      nombreCompleto: this.persona.nombreCompleto,
      correo: this.persona.correo,
  });
  }
  ngOnInit(): void {
    this.builFormulario();
  }
  builFormulario(){
     this.formPersona=this.formBuilder.group({
      nombreCompleto:['',{
        validators:[Validators.required,Validators.minLength(10),primeraLetraMayuscula]
      }],
      correo:['',Validators.required]
    });
  }
  guardarPersona(){
    if(this.formPersona.invalid){
      this.formPersona.markAllAsTouched();
      return;
    }
    if(this.persona.personaId){
      //añadimos un nuevo control al formpersona con sus atributos y valores
      this.formPersona.addControl('personaId', new FormControl(this.persona.personaId, Validators.required));
      this.personaService.modificarPersona(this.formPersona.value).subscribe(respuesta=>{
        if(respuesta.exito==1){
          this.mostrarSnackBar("Registro Actualizado");
        }
      }) 
    }else{
        this.personaService.registrarPersona(this.formPersona.value)
        .subscribe(respuesta=>{
            if(respuesta.exito==1){
              this.mostrarSnackBar("Registro Exitoso");
            }
      })
    }
  }
  mostrarSnackBar(mensaje:string){
    this.snackBar.open(mensaje,'Ok',{
      duration:2500,
      horizontalPosition:this.horizontalPosition,
      verticalPosition:this.verticalPosition
    })
  }
  obtenerErrrorCorreo():string{
    var correo=this.formPersona.get('correo');
    if(correo.hasError('required')){
      return 'El correo es obligatorio';
    }
  }
  obtenerErrorNombre():string{
    var nombre=this.formPersona.get('nombreCompleto');
    if(nombre.hasError('required')){
      return 'El campo es obligatorio';
    }
    if(nombre.hasError('minlength')){
      return 'El nombre debe de llevar mas de 10 caracteres';
    }
    if(nombre.hasError('primeraLetraMascula')){
      return 'La primeta letra debe ser mayuscula';
    }
  }
}
