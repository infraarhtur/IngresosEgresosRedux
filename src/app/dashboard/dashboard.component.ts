import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { auth } from 'firebase';
import { Subscription } from 'rxjs';
import * as ingresosEgresosActions from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ingresosSubs:Subscription;
  constructor(private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {


  }

  ngOnInit() {
    this.userSubs = this.store.select('user').pipe(
      filter(auth => auth.user != null)
    )
      .subscribe(({ user }) => {
        // console.log(user);
        this.ingresosSubs= this.ingresoEgresoService.initIngresosEgresosListener(user.uid.toString())
          .subscribe((items:IngresoEgreso[]) => {

            // console.log(items);
            this.store.dispatch(ingresosEgresosActions.setItems({ items }))

          }

          );
      })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSubs?.unsubscribe();
    this.ingresosSubs?.unsubscribe();
  }
}
