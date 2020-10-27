import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(public firestore: AngularFirestore,
    public store: Store<AppState>,
    private authService: AuthService) { }


  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user.uid;

delete ingresoEgreso.uid;

    return this.firestore.doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso })
      // .then((ref: any) => {
      //
      //   console.log('exito! funciono', ref)
      // })
      // .catch(err => {
      //
      //   console.warn('puto error:', err)
      // });

  }

  initIngresosEgresosListener(uid:string){

   return this.firestore.collection(`${uid}/ingresos-egresos/items`).snapshotChanges()
    .pipe(
      map(snapshot =>{
        return snapshot.map(doc => {
          // const data:any = doc.payload.doc.data();
          return {
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any

          }
        })
      })
    )


  }


  borrarIngresoEgreso(uidItem:string){
    const uidUser = this.authService.user.uid;
  return  this.firestore.doc(`${uidUser}/ingresos-egresos/items/${uidItem}`).delete();
  }


}
