
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DialogConfirmarComponent } from 'src/app/components/dialog-confirmar/dialog-confirmar.component';
import { IPersona } from 'src/app/models/IPersona';
import { PersonaServicio } from 'src/app/services/personaServices';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit  {
  displayedColumns: string[] = ['posicion', 'nombre', 'correo', 'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource;
  //variables para asignar el tamaño de la paginacion de la tabla
  page_size:number=3;
  page_number:number=1;
  pageSizeOptions=[3,5,10];
  listaPersonas:IPersona[]=[];
  persona:IPersona;
  constructor(
    private personaService:PersonaServicio
    ,private matDialog:MatDialog
    ,private matSnackbar:MatSnackBar) { 
     
   
  }
  ngOnInit(): void {
    this.personaService.getPersonas().subscribe(data=>{
      this.dataSource.data=data;
    },error=>{
      console.log("error ",error);
    });
  }
  //metodo que reacciona el evento del paginador y asigna las paginas del tamaño seleccionado
  handlePage(e:PageEvent){
    this.page_size=e.pageSize;
    this.page_number=e.pageIndex+1;
  } 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  borrarRegistroTabla(i:number){
    this.dataSource.data.splice(i,1);
    this.dataSource.paginator=this.paginator;
  }
  mostrarSnackbar(mensaje:string){
    this.matSnackbar.open(mensaje,'Ok',{
      duration:3000
    })
  }
  eliminar(persona:IPersona,i:number):void{
    const dialog= this.matDialog.open(DialogConfirmarComponent,{
      width:'250px',
      data:persona.nombreCompleto
    });
    dialog.afterClosed().subscribe(resultado=>{
        if(resultado){
          this.personaService.eliminarPersona(persona.personaId).subscribe(respuesta=>{
            if(respuesta.exito==1){
                this.borrarRegistroTabla(i);
                this.mostrarSnackbar("Se elimino el registro");
            }
          })
        }
    });
  }

  applyFilter(event: Event) {
   // this.dataSource.filter = filterValue.trim().toLowerCase();
  }  
}
