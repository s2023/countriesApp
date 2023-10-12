import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id )),
      )
      .subscribe( country => {
        if ( !country ) return this.router.navigateByUrl('');
/* v1        if ( !country ) {
          return this.router.navigateByUrl('');
        }
        console.log('Se ha encontrado un pais')
        return*/
        return this.country = country;
      });
  }

/*v1   ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({ id }) => {
      //2 .subscribe( (params) => {
      //1 .subscribe( (params: any) => {

        this.countriesService.searchCountryByAlphaCode( id )
          .subscribe( country => {
            console.log({ country })
          });

        //2 console.log({ params: params['id'] })
        //1 console.log({ params: params.id })
      }); */

/*logica   searchCountry( params: Params ) {
  //1 searchCountry( code: string ) {
    this.countriesService.searchCountryByAlphaCode( params ['id'] )
    //1 this.countriesService.searchCountryByAlphaCode( code )
    .subscribe( country => {
      console.log({ country })
    });
  } */

  }






