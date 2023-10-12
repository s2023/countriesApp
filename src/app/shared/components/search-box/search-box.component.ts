import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();
  //v1 public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    //v1sinOnDestroy this.debouncer
    .pipe(
      debounceTime(400)
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
      // console.log('debouncer value', value)
    });
  }
/* v1  ngOnInit(): void {
    this.debouncer
     .subscribe( value => {
       console.log('debouncer value', value)
     })
   } */

   ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
    // console.log('destruido')
  }

  emitValue( value: string ):void {
    this.onValue.emit( value );
  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );
    // console.log( searchTerm );
  }
}
