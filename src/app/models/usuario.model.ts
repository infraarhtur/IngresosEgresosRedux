export class Usuario {

  static fromFirebase({ email, uid, nombre }) {
    return new Usuario(uid,nombre, email )
  }

  constructor(
    public uid: String,
    public nombre: String,
    public email: String
  ) {

  }
}
