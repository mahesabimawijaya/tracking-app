import { Location } from "./location";

export interface Traffic {
  id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  location: Location;
}
