import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  MatTableDataSource } from '@angular/material/table';
import { DialogConfirmarComponent } from 'src/app/components/dialog-confirmar/dialog-confirmar.component';
import { IUsuario } from 'src/app/models/IUsuario';
import { UsuarioService } from 'src/app/services/usuarioService';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  //cabezera de la tabla
  displayedColumns: string[] = ['posicion', 'nombre', 'correo', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource;
  page_size:number=3;
  page_number:number=1;
  pageSizeOptions=[3,5,10];
 /*  listaUsuarios:IUsuario[]=[]; */
  constructor(
    private usuarioService:UsuarioService
    ,private matdialog:MatDialog
    ,private matsnackBar:MatSnackBar) { 
   
  }
  ngOnInit(): void {
   this.cargarUsuario(); 
  }
  cargarUsuario(){
    this.usuarioService.getUsuarios().subscribe((data:IUsuario[])=>{
      this.dataSource.data = data;
    },error=>{
      console.log("error ",error);
    });
  }

  //se carga cada vez que seleccionamos el numero de paginacion
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  /* 
  handlePage(e:PageEvent){
    this.page_size=e.pageSize;
    this.page_number=e.pageIndex+1;
  } */

  mostrarSnackbar(mensaje:string){
    this.matsnackBar.open(mensaje,'Ok',{
      duration:3000
    });
  }
  borrarDatoTabla(i:number):void{
    this.dataSource.data.splice(i, 1);
    this.dataSource.paginator =this.paginator;
  }
  eliminar(usuario:IUsuario,i:number):void{
     const dialog=this.matdialog.open(DialogConfirmarComponent,{
      width:'250px',
      data:usuario.nombreCompleto
    });
    dialog.afterClosed().subscribe(res=>{
      if(res){
        this.usuarioService.eliminarUsuario(usuario.usuarioId).subscribe(respuesta=>{
          if(respuesta.exito==1){
            this.borrarDatoTabla(i);
            this.mostrarSnackbar("Se elimino el Registro");
          }
        });
      }
    }); 
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
   // this.dataSource.filter = filterValue.trim().toLowerCase();
  }  
}

