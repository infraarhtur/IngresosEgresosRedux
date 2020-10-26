import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private auth: AngularFireAuth,
    private router: Router,
    private store: Store<AppState>
  ) { }


  ngOnInit() {
    this.registroForm = this.fb.group({

      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.uiSubscription = this.store.select('ui')
    .subscribe(ui => {
      this.cargando = ui.isLoading;
    })

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.uiSubscription.unsubscribe();
  }


  crearUsuario() {
    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'espere por favor',

    //   onBeforeOpen: () => {
    //     Swal.showLoading()
    //   }


    // });



    if (this.registroForm.invalid) {
      return false;
    }

    const { nombre, correo, password } = this.registroForm.value;
    this.authService.crearUsuario(nombre, correo, password).then(credenciales => {
      console.log(credenciales);
      this.store.dispatch(ui.stopLoading());

      // Swal.close();
      this.router.navigate(['/']);
    }).catch(err => {
      this.store.dispatch(ui.stopLoading());
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,

      })
    }

    );


  }

}
