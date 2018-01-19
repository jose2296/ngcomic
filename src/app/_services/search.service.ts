import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class SearchService {

  stringSearch: string;

  event = new EventEmitter();

  constructor() {
  }

  public setStringSearch(str) {


    this.stringSearch = str;

    this.event.emit(this.stringSearch);

  }


}
