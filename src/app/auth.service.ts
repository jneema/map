import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private fireAuth: AngularFireAuth,
     private router: Router,
      private firestore: AngularFirestore,
      ) { }

  // login method
  login(email: string, password: string) {
    // Pass email and password to auth
    this.fireAuth.signInWithEmailAndPassword(email, password).then((userCredential) => {
      if (userCredential.user?.emailVerified) {
        // Email is verified, store token and navigate to dashboard
        localStorage.setItem('token', 'true');
        this.router.navigate(['/dashboard']);
      } else {
        // Email is not verified, show alert and navigate to login
        alert('Email not verified. Please check your email and verify.');
        this.router.navigate(['/login']);
      }
    }).catch(err => {
      alert(err.message);
      this.router.navigate(['/login']);
    });
  }

  // register method
  register(email: string, password: string) {
    // Create user with email and password
    this.fireAuth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      // Send email verification
      userCredential.user?.sendEmailVerification();
      alert('Registered Successfully. Please check your email for verification.');
      this.router.navigate(['/login']);
    }).catch(err => {
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }

  // logout method
  logout() {
    // Sign out user and remove token from local storage
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }).catch(err => {
      alert(err.message);
    });
  }

    // forgot password method
    forgotPassword(email: string) {
      // Send password reset email
      this.fireAuth.sendPasswordResetEmail(email)
        .then(() => {
          alert('Password reset email sent. Please check your email.');
          this.router.navigate(['/login'])
        })
        .catch((error) => {
          alert(error.message);
        });
    }

    // sign in with google
    googleSignIn() {
      return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(res => {
        this.router.navigate(['/dashboard'])
        localStorage.setItem('token', JSON.stringify(res.user?.uid))
      }, err => {
        alert(err.message)
      })
    }
// auth.service.ts
async isLoggedIn(): Promise<boolean> {
  const user = await this.fireAuth.currentUser;
  return user !== null;
}

async getCurrentUser(): Promise<any> {
  return this.fireAuth.currentUser;
}

      // Save form data to Firebase
      async submitFormData(
        userName: string,
        userPhoto: File | null,
        workLocation: string,
        workLatitude: number,
        workLongitude: number,
        homeLocation: string,
        homeLatitude: number,
        homeLongitude: number
      ): Promise<void> {
        try {
          const user = await this.fireAuth.currentUser;
    
          if (!user) {
            throw new Error('User not authenticated.');
          }
    
          let photoUrl: string | null = null;
    
          if (userPhoto) {
            const reader = new FileReader();
            reader.readAsDataURL(userPhoto);
            reader.onload = () => {
              photoUrl = reader.result as string;
    
              // Add user information and locations to Firestore
              this.firestore.collection('users').doc(user.uid).set({
                Name: userName,
                photoUrl,
                homeLocation: {
                  placeName: homeLocation,
                  latitude: homeLatitude,
                  longitude: homeLongitude,
                },
                workLocation: {
                  placeName: workLocation,
                  latitude: workLatitude,
                  longitude: workLongitude,
                },
                timestamp: new Date()
              });
              this.router.navigate(['/map'], {
                queryParams: {
                  homeLocation: homeLocation,
                  workLocation: workLocation
                }
            });
            };
          } else {
            // Add user information and locations to Firestore without a photo
            this.firestore.collection('users').doc(user.uid).set({
              firstName: userName,
              photoUrl,
              homeLocation: {
                placeName: homeLocation,
                latitude: homeLatitude,
                longitude: homeLongitude,
              },
              workLocation: {
                placeName: workLocation,
                latitude: workLatitude,
                longitude: workLongitude,
              },
              timestamp: new Date()
            });
          }
    
        } catch (error) {
          console.error('Error submitting form data:', error);
          throw error;
        }
      }
    }
