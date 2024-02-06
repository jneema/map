import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  homeLocation: any;
  workLocation: any;
  homeLocationInputValue: string = '';
  workLocationInputValue: string = '';
  map: google.maps.Map | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('Received queryParams:', params);

      const homeLocationStr = params['homeLocation'] || '';
      const workLocationStr = params['workLocation'] || '';

      this.homeLocation = homeLocationStr ? { placeName: homeLocationStr } : null;
      this.workLocation = workLocationStr ? { placeName: workLocationStr } : null;

      // Check if both locations are defined before showing direction
      if (this.homeLocation && this.workLocation) {
        // Now, you can fill the inputs or update your form model accordingly
        this.fillInputs();

        // Show directions on the map
        this.initializeMap();
        this.showDirectionsOnMap();
      } else {
        console.error('Home or work location is not defined.');
      }
    });
  }

  fillInputs() {
    this.homeLocationInputValue = this.homeLocation.placeName;
    this.workLocationInputValue = this.workLocation.placeName;
  }

  private initializeMap(): void {
    if (!this.map) {
      this.map = new google.maps.Map(document.getElementById('map-container') as HTMLElement, {
        center: { lat: 0, lng: 0 }, // Set to your default center
        zoom: 8, // Set to your default zoom level
      });
    }
  }

  private showDirectionsOnMap(): void {
    this.initializeMap(); // Ensure that the map is initialized
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({ map: this.map });

    const request: google.maps.DirectionsRequest = {
      origin: this.homeLocation.placeName,
      destination: this.workLocation.placeName,
      travelMode: google.maps.TravelMode.WALKING,
    };

    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
      } else {
        console.error('Directions request failed:', status);
      }
    });
  }
}
