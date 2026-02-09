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
import { toast } from '@/hooks/use-toast';

function handleAuthError(error: any) {
  console.error("Firebase Auth Error:", error.code, error.message);
  let description = "An unknown error occurred. Please try again.";
  
  if (error.code) {
    switch (error.code) {
      case 'auth/wrong-password':
        description = 'Incorrect password. Please try again.';
        break;
      case 'auth/user-not-found':
        description = 'No account found with this email.';
        break;
      case 'auth/email-already-in-use':
        description = 'This email is already registered. Please login.';
        break;
      case 'auth/operation-not-allowed':
        description = 'This sign-in method is not enabled. It must be enabled in the Firebase console.';
        break;
      case 'auth/weak-password':
        description = 'The password is too weak. Please choose a stronger password.';
        break;
      case 'auth/popup-closed-by-user':
        description = 'The sign-in window was closed. Please try again.';
        break;
      case 'auth/cancelled-popup-request':
          description = 'The sign-in was cancelled. Please try again.';
          break;
      default:
        description = `An unexpected error occurred: ${error.code}`;
        break;
    }
  }
  toast({
    variant: "destructive",
    title: "Authentication Failed",
    description: description,
  });
}


/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance)
    .catch(handleAuthError);
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string, name: string): void {
  createUserWithEmailAndPassword(authInstance, email, password)
    .then((userCredential) => {
        if (userCredential.user) {
            updateProfile(userCredential.user, {
                displayName: name
            });
        }
    })
    .catch(handleAuthError);
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  signInWithEmailAndPassword(authInstance, email, password)
    .catch(handleAuthError);
}

/** Initiate Google sign-in (non-blocking). */
export function initiateGoogleSignIn(authInstance: Auth): void {
  const provider = new GoogleAuthProvider();
  signInWithPopup(authInstance, provider)
    .catch(handleAuthError);
}
