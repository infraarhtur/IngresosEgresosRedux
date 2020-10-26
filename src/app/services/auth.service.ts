import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;

  constructor(public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    public store: Store<AppState>
  ) { }

  crearUsuario(nombre: string, email: string, psw: string) {

    return this.auth.createUserWithEmailAndPassword(email, psw)
      .then(({ user }) => {

        const newUser = new Usuario(user.uid, nombre, user.email);
        return this.firestore.doc(`${user.uid}/usuario`)
          .set({ ...newUser })
      });


  }

  loginUsuario(email: string, psw: string) {
    return this.auth.signInWithEmailAndPassword(email, psw);

  }


  logOut() {

    return this.auth.signOut();
  }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {

      if (fuser) {
        //obtiene la informacion del nodo añadido de usuario por uid
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
          .subscribe((firestoreUser: any) => {
            console.log(firestoreUser);

            const usuario = Usuario.fromFirebase(firestoreUser);
            this.store.dispatch(authActions.setUser({ user: usuario }))
          })
        // this.store.dispatch(authActions.setUser({}))
      } else {
        if(this.userSubscription){
          this.userSubscription.unsubscribe();
        }
        //
        this.store.dispatch(authActions.unSetUser());
      }


    })
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }

}
