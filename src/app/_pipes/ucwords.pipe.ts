import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'ucwords'
})
@Injectable()
export class UcwordsPipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(val:string) {
    val = val.toLowerCase();
    return (val + '').replace(/^([a-z])|\s+([a-z])/g, ($1) => {
        return $1.toUpperCase();
    });
  }

}

// Source: https://gist.github.com/lalogrosz/e70af5d693c73959a224e2b218a1c044