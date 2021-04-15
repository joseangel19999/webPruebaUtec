import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './menu/home/home.component';
import { AppRoutingModule } from './routing';
import { MaterialModule } from './materialModule';
import { BarraLateralComponent } from './barra-lateral/barra-lateral.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AlumnoComponent } from './pages/alumno/alumno.component';
import { ProfesoresComponent } from './pages/profesores/profesores.component';
import { NavbarComponent } from './menu/navbar/navbar.component';
import { AcercadeComponent } from './pages/acercade/acercade.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './menu/footer/footer.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
//peticiones http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaginacionPipe } from './pipes/paginacion.pipe';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { DialogExitComponent } from './components/dialog-exit/dialog-exit.component';
import { DialogConfirmarComponent } from './components/dialog-confirmar/dialog-confirmar.component';
import { TokenInterceptorService } from './interceptores/token-interceptor.service';
import { RegistrarPersonaComponent } from './pages/registrar-persona/registrar-persona.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BarraLateralComponent,
    AlumnoComponent,
    ProfesoresComponent,
    NavbarComponent,
    AcercadeComponent,
    InicioComponent,
    LoginComponent,
    FooterComponent,
    PersonaComponent,
    RegistrarComponent,
    PaginacionPipe,
    UsuariosComponent,
    DialogExitComponent,
    DialogConfirmarComponent,
    RegistrarPersonaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,

  ],
  providers: [
     {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi:true
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
