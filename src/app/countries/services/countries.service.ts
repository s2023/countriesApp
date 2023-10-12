import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  public cacheStore: CacheStore = {
    byCapital:   { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion:    { region: '', countries: [] },
  }

  constructor(private http: HttpClient ) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ));
  }

  private loadFromLocalStorage() {
    if ( !localStorage.getItem('cacheStore') ) return;
    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

  private getCountriesRequest( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) ),
        //cuandodebouncersearchbox delay( 2000 ),
      );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${ this.apiUrl }/alpha/${ code }`;
    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => of(null) )
      );
  }

  searchCapital( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.getCountriesRequest(url)
/*4. v1.1r    return this.http.get<Country[]>( url )
      .pipe(
        catchError( error => {
          console.log(error);
          return of([])
        })
        // 3. v1 pipe
        // .pipe(
        //   catchError( () => of([]) )
        // );
        // 2. rxjs ops
        // tap( countries => console.log( 'Paso tap 1', countries ) ),
        // map( countries => [] ),
        // tap( countries => console.log( 'Paso tap 2', countries ) ),
      ); */
      .pipe(
        tap( countries => this.cacheStore.byCapital = { term, countries }),
        //v2 tap( countries => this.cacheStore.byCapital = { term: term, countries: countries }),
        //v1 tap( countries => this.cacheStore.byCapital.countries = countries ),
        tap( () => this.saveToLocalStorage() ),
      );
  }
/*   1. v1
  searchCapital( term: string ): Observable<Country> {
    return this.http.get(`${ this.apiUrl }/capital/${term }`);
  } */

  searchCountry( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ term }`;
    return this.getCountriesRequest(url)
/*4. v1r     return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) )
      ); */
      .pipe(
        tap( countries => this.cacheStore.byCountries = { term, countries }),
        tap( () => this.saveToLocalStorage() ),
      );
  }

  searchRegion( region: Region ): Observable<Country[]> {
  //v1 searchRegion( region: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${ region }`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion = { region, countries }),
      tap( () => this.saveToLocalStorage() ),
    );
  }

}
