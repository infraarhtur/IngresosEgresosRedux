import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui')
      .subscribe(ui => {
        this.cargando = ui.isLoading;
      })
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  iniciarSesion() {


    this.store.dispatch(ui.isLoading());
    const { email, password } = this.loginForm.value;
    this.auth.loginUsuario(email, password).then(respuesta => {

      this.store.dispatch(ui.stopLoading());
      this.router.navigate(['/']);
    }

    ).catch(error => {

      this.store.dispatch(ui.stopLoading());
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,

      })
    });
  }

}
