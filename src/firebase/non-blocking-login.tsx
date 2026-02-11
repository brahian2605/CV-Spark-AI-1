'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';

/** Iniciar sesión anónima (sin bloqueo). */
export function initiateAnonymousSignIn(authInstance: Auth) {
  return signInAnonymously(authInstance);
}

/** Iniciar registro con correo/contraseña (sin bloqueo). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string, name: string) {
  return createUserWithEmailAndPassword(authInstance, email, password)
    .then((userCredential) => {
        if (userCredential.user) {
            return updateProfile(userCredential.user, {
                displayName: name
            });
        }
    });
}

/** Iniciar sesión con correo/contraseña (sin bloqueo). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string) {
  return signInWithEmailAndPassword(authInstance, email, password);
}

/** Iniciar sesión con Google (sin bloqueo). */
export function initiateGoogleSignIn(authInstance: Auth) {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(authInstance, provider);
}
