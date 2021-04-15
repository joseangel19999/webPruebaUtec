import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogExitComponent } from '../dialog-exit/dialog-exit.component';

@Component({
  selector: 'app-dialog-confirmar',
  templateUrl: './dialog-confirmar.component.html',
  styleUrls: ['./dialog-confirmar.component.css']
})
export class DialogConfirmarComponent implements OnInit {

  constructor(
    private matdialogRef:MatDialogRef<DialogExitComponent>
    ,@Inject(MAT_DIALOG_DATA) public correo:string
    ) { }

  ngOnInit(): void {
  }

  eliminar(){
    this.matdialogRef.close(true);
  }
  cerrar(){
    this.matdialogRef.close(false);
  }
}
