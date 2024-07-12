import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HandleDialogService {
  constructor() {}
  DialogSub = new BehaviorSubject<boolean>(null);

  // OpenDialog() {
  //   this.DialogSub.next(true);
  // }
}
