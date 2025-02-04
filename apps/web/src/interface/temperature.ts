import { Location } from "./location";

export interface Temperature {
  id: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  location: Location;
}
