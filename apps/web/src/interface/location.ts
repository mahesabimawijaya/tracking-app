import { Temperature } from "./temperature";
import { Traffic } from "./traffic";

export interface Location {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  temperatures?: Temperature[];
  traffics?: Traffic[];
}
