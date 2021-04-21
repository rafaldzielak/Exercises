import Mappable from "./Mappable";

export default class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId)!, {
      zoom: 4,
      center: { lat: 0, lng: 0 },
    });
  }

  addMarker(mappable: Mappable) {
    const marker = new google.maps.Marker({ map: this.googleMap, position: mappable.location });
    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({ content: mappable.marketContent() });
      infoWindow.open(this.googleMap, marker);
    });
  }
}

//   addUserMarker(user: User): void {
//     new google.maps.Marker({ map: this.googleMap, position: user.location });
//   }
//   addCompanyMarker(company: Company): void {
//     new google.maps.Marker({ map: this.googleMap, position: company.location });
//   }
// }
