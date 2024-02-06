/// <reference types="@types/googlemaps" />

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userName: string = '';
  userPhoto: File | null = null;

  selectedHomePlace: { placeName: string, latitude: number, longitude: number } | null = null;
  selectedWorkPlace: { placeName: string, latitude: number, longitude: number } | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Check if the user is logged in, redirect to login if not
    this.authService.isLoggedIn().then((loggedIn) => {
      if (!loggedIn) {
        this.router.navigate(['/login']);
      }
    });

    // Set user's first and last name if available
    this.authService.getCurrentUser().then((user) => {
      if (user) {
        this.userName = user.displayName || '';
      }
    });

    // Move the setupAutocomplete calls outside of DOMContentLoaded
    this.setupAutocomplete('home-location-input', place => this.selectedHomePlace = place, 'KE');
    this.setupAutocomplete('work-location-input', place => this.selectedWorkPlace = place, 'KE');
  }

  private setupAutocomplete(inputId: string, callback: (place: { placeName: string, latitude: number, longitude: number } | null) => void, countryCode: string): void {
    const locationInput = document.getElementById(inputId) as HTMLInputElement;

    if (locationInput) {
      const autocomplete = new google.maps.places.Autocomplete(locationInput, {
        componentRestrictions: { country: countryCode }
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        if (place.geometry && place.geometry.location) {
          const selectedPlace = {
            placeName: place.name,
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          };

          callback(selectedPlace);
        } else {
          console.log(`Invalid place object for ${inputId}:`, place);
          callback(null);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.userName && this.selectedHomePlace && this.selectedWorkPlace) {
      this.authService.submitFormData(
        this.userName,
        this.userPhoto,
        this.selectedWorkPlace.placeName,
        this.selectedWorkPlace.latitude,
        this.selectedWorkPlace.longitude,
        this.selectedHomePlace.placeName,
        this.selectedHomePlace.latitude,
        this.selectedHomePlace.longitude
      );

      // Reset the form after successful submission
      this.resetForm();
    } else {
      console.log('Please fill in all required fields.');
    }
  }

  onPhotoChange(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.userPhoto = files[0];
    }
  }

  resetForm(): void {
    this.userName = '';
    this.userPhoto = null;
    this.selectedHomePlace = { placeName: '', latitude: 0, longitude: 0 };
    this.selectedWorkPlace = { placeName: '', latitude: 0, longitude: 0 };
  }
}
