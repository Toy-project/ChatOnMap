import { Component } from '@angular/core';

@Component({
  selector: 'lay-header',
  templateUrl: 'lay-header.html'
})
export class LayHeaderComponent {

  // set alarm count
  public alarmCount: number = 0;

  constructor() { }

}
