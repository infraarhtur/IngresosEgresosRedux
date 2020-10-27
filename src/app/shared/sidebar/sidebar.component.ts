import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
nombre:string ='';
userSubs :Subscription;

  constructor( private router:Router,  private authService:AuthService, private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit() {

  this.userSubs =   this.store.select('user').pipe(
    filter(({user}) =>user != null)
  )

  .subscribe(({user})=> { this.nombre= user?.nombre.toString()})
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();

  }

  logOut(){
    this.authService.logOut().then(resp=> {
      this.router.navigate(['/login']);

    });

  }

}
