import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AcercadeComponent } from './pages/acercade/acercade.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { RegistrarPersonaComponent } from './pages/registrar-persona/registrar-persona.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AdminGuard } from './seguridad/admin.guard';

const _ROUTES:Routes=[
    {path:'home',component:InicioComponent},
    {path:'personas',component:PersonaComponent,canActivate:[AdminGuard]},
    {path:'editarPersona/:id',component:RegistrarPersonaComponent,canActivate:[AdminGuard]},
    {path:'registrarPersona',component:RegistrarPersonaComponent,canActivate:[AdminGuard]},
    {path:'usuarios',component:UsuariosComponent,canActivate:[AdminGuard]},
    {path:'registrar',component:RegistrarComponent,canActivate:[AdminGuard]},
    {path:'editarUsuario/:id',component:RegistrarComponent,canActivate:[AdminGuard]},
    {path:'login',component:LoginComponent},
    {path:'acercade',component:AcercadeComponent},
    {path:'**',pathMatch:'full',redirectTo:'login'}
] 
@NgModule({
    imports: [
        RouterModule.forRoot(_ROUTES)
    ],
    exports: [
        RouterModule
    ],declarations:[]
})
export class AppRoutingModule{
    
}
