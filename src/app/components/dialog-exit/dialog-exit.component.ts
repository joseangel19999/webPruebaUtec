import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-exit',
  templateUrl: './dialog-exit.component.html',
  styleUrls: ['./dialog-exit.component.css']
})
export class DialogExitComponent implements OnInit {

  constructor(
    private matdialogRef:MatDialogRef<DialogExitComponent>
     ) { }

  ngOnInit(): void {
  }

  salir(){
    this.matdialogRef.close(true);
  }
  cerrar(){
    this.matdialogRef.close(false);
  }

}
