import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { strict } from "assert";
import { switchMap } from "rxjs/operators";
import { IUsuario } from "src/app/models/IUsuario";
import { IUsuarioPost } from "src/app/models/IUsuarioPost";
import { PersonaService } from "src/app/services/alumnado.service";
import { UsuarioService } from "src/app/services/usuarioService";
import { primeraLetraMayuscula } from "src/app/utilidades/validadores/primeraLetraMayus";

@Component({
  selector: "app-registrar",
  templateUrl: "./registrar.component.html",
  styleUrls: ["./registrar.component.css"],
})
export class RegistrarComponent implements OnInit {
  //posiciones del snacknbar
  horizontalPosition: MatSnackBarHorizontalPosition = "start";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  validatos: string;
  form: FormGroup;
  usuario: IUsuario;
  errorsPasswprd: string;
  //formulario
  public formulario: FormGroup;
  //formulario agregar
  formAgregar = {
    nombreCompleto: new FormControl("", {
      validators: [
        Validators.required,
        Validators.minLength(5),
        primeraLetraMayuscula(),
      ],
    }),
    correo: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    passwordConfirm: new FormControl("", Validators.required),
    estatus: new FormControl(true, Validators.required),
  };
  //formulario atualizar
  formActualizar = {
    nombreCompleto: new FormControl("", Validators.required),
    correo: new FormControl("", Validators.required),
    password: new FormControl(""),
    passwordNuevo: new FormControl(""),
    passwordConfirmar: new FormControl(""),
    estatus: new FormControl("", Validators.required),
  };
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    if (this.router.url.includes("editarUsuario")) {
      this.activatedRouter.params
        .pipe(
          switchMap(({ id }) => {
            return this.usuarioService.getUsuarioRequest(id);
          })
        )
        .subscribe((respuesta) => {
          if (respuesta.correo != null) {
            this.usuario = respuesta;
            this.modificarFormulario();
          } else {
            this.router.navigate(["/usuarios"]);
          }
        });
    } else {
      this.builFormulario();
    }
  }
  ngOnInit(): void {}
  modificarFormulario() {
    this.formulario = this.formBuilder.group(this.formActualizar);
    this.formulario.reset({
      nombreCompleto: this.usuario.nombreCompleto,
      correo: this.usuario.correo,
      estatus: this.usuario.estatus,
      password: "",
      passwordNuevo: "",
      passwordConfirmar: "",
    });
    // this.form.removeControl('passwordConfirm');
  }
  builFormulario() {
    this.formulario = this.formBuilder.group(this.formAgregar);
  }
  guardarDatos() {
    if (this.usuario != null) {
      this.actualizarDatos();
      if (this.usuario.usuarioId) {
        this.formulario.addControl(
          "usuarioId",
          new FormControl(this.usuario.usuarioId)
        );
        this.usuarioService
          .actualizarUsuario(this.formulario.value)
          .subscribe((respuesta) => {
            if (respuesta.exito == 1) {
              this.mostrarSnackBar(respuesta.mensaje);
            }
          });
      }
    } else {
      if (this.formulario.invalid) {
        this.formulario.markAllAsTouched();
        return;
      }
      this.usuarioService.registrarUsuario(this.formulario.value).subscribe(
        (res) => {
          if (res.exito == 1) {
            this.mostrarSnackBar("Registro Exitoso");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  actualizarDatos() {
    let campoPasswordActual = this.formulario.get("password");
    let campoPasswordNuevo = this.formulario.get("passwordNuevo");
    let campoPasswordConfirm = this.formulario.get("passwordConfirmar");
    let passwordActual: string = campoPasswordActual.value;
    let passwordNuevo: string = campoPasswordNuevo.value;
    let passwordConfirmar: string = campoPasswordConfirm.value;
    if (passwordActual != null && passwordActual != "") {
      if (passwordActual.trim().length > 0) {
        campoPasswordNuevo.setErrors(this.formulario.get("passwordNuevo"));
        campoPasswordConfirm.setErrors(
          this.formulario.get("passwordConfirmar")
        );
      }
    } else {
      campoPasswordActual.updateValueAndValidity();
      campoPasswordNuevo.updateValueAndValidity();
      campoPasswordConfirm.updateValueAndValidity();
    }

    if (passwordNuevo != null && passwordNuevo !== "") {
      if (passwordNuevo.trim().length > 0) {
        campoPasswordActual.setErrors(this.formulario.get("password"));
        this.errorsPasswprd = "Password confirmar requerido";
        campoPasswordConfirm.setErrors(
          this.formulario.get("passwordConfirmar")
        );
      }
    }
    if (passwordConfirmar != null && passwordConfirmar != "") {
      if (passwordConfirmar.trim().length > 0) {
        campoPasswordActual.setErrors(this.formulario.get("password"));
        campoPasswordNuevo.setErrors(this.formulario.get("passwordNuevo"));
      }
    }
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
  }

  errorPass() {
    return "Campo obligatorio";
  }
  obtenerErrorEmail() {
    var campo = this.formulario.get("correo");
    if (campo.hasError("required")) {
      return "El campo Correo es Obligatorio";
    }
  }
  obtenerErrorNombreCompleto() {
    var campo = this.formulario.get("nombreCompleto");
    if (campo.hasError("required")) {
      return "El campo Nombre completo es Obligatorio";
    }
  }
  obtenerPasswordActual() {
    var campoPass2 = this.formulario.get("passwordActual");
    if (campoPass2.hasError("required")) {
      return "El campo Password es Obligatorio";
    }
  }
  obtenerErrorPassword() {
    var campoPass1 = this.formulario.get("password");
    var campoPass2 = this.formulario.get("passwordConfirm");
    if (campoPass1.hasError("required") || campoPass2.hasError("required")) {
      return "El campo Password es Obligatorio";
    }
  }
  obnetenerErrorName() {
    var campo = this.formulario.get("nombreCompleto");
    if (campo.hasError("required")) {
      return "El campo Nombre es Obligatorio";
    }
    if (campo.hasError("minlength")) {
      return "5 caracteres minimo";
    }
    if (campo.hasError("primeraLetraMascula")) {
      return campo.getError("primeraLetraMascula").mensaje;
    }
    return "";
  }
  mostrarSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, "Ok", {
      duration: 2500,
      verticalPosition: this.verticalPosition,
    });
  }
}
