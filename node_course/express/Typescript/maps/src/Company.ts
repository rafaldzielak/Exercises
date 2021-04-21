import faker from "faker";
import Mappable from "./Mappable";

export default class Company implements Mappable {
  companyName: string;
  catchPhrase: string;
  location: { lat: number; lng: number };

  constructor() {
    this.companyName = faker.company.companyName();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = { lat: parseFloat(faker.address.latitude()), lng: parseFloat(faker.address.longitude()) };
  }
  marketContent = (): string => `Company Name: ${this.companyName}`;
}
