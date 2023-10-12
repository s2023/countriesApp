import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

//sininterfaz type Region = 'Africa'|'Americas'|'Asia'|'Europe'|'Oceania';
@Component({
  selector: 'by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  //v1 public regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor( private countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion( region: Region ):void  {
  //v1 searchByRegion( region: string ):void  {
    this.isLoading = true;
    this.selectedRegion = region;
    this.countriesService.searchRegion( region )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

}
