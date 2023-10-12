import { Country } from './country.interface';
import { Region } from './region.type';

export interface CacheStore {
  byCapital:   TermCountries;
  byCountries: TermCountries;
  byRegion:    RegionCountries;
}
/*v1 export interface CacheStore {
  byCapital: {
    term: string,
    countries: Country[]
  }
} */

export interface TermCountries {
  term: string;
  countries: Country[];
}

export interface RegionCountries {
  region:    Region;
  countries: Country[];
}
