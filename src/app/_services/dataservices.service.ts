import { Injectable } from '@angular/core';

import { AngularFireDatabase  } from "angularfire2/database";


@Injectable()
export class DataservicesService {

  issues:any = [];
  volumes:any = [];

  constructor(af:AngularFireDatabase) {
    this.issues = af.object("/issues");
    this.volumes = af.object("/volumes");
   }
}
