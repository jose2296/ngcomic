import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'stars'
})
export class StarsPipe implements PipeTransform {


  str_stars: any = '';

  transform(value: any, args?: any): any {


    if (value === 0) {
      return '😞 Bad Rate';
    }

    for (let i = 0; i < value; i++) {
      this.str_stars += '⭐';
    }

    return this.str_stars;
  }

}
