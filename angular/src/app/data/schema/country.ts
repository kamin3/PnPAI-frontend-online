import { City } from "@schema/city";

export interface Country {
    name: string;
    cities: City[];
}
