import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso-model';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { appstateWithingreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresoEgresos: IngresoEgreso[];
ingresosSubs :Subscription;

  constructor(private ingresoEgresoService: IngresoEgresoService,
    private store: Store<appstateWithingreso>) { }

  ngOnInit() {
  this.ingresosSubs=  this.store.select('ingresosEgresos').subscribe(({ items }) => {
      this.ingresoEgresos = items;
      console.log(items)
    })
  }
  ngOnDestroy(): void {


    this.ingresosSubs.unsubscribe();
  }


  borrar(uid:string){

   this. ingresoEgresoService.borrarIngresoEgreso(uid)
   .then( ()=> Swal.fire('Borrado', 'item borrado', 'success'))
   .catch(err => Swal.fire('Error', err.message,'error'))
console.log(uid);
  }

}
