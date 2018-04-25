import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'lay-header',
  templateUrl: 'lay-header.html'
})
export class LayHeaderComponent {

  // set alarm count
  alarmCount: number = 0;
  // interaction component data
  @Input() type: string = '';
  @Input() next: any = null;
  @Output() dismiss: any = new EventEmitter<boolean>();

  constructor(
    public viewController: ViewController
  ) { }

  /**
   *  Close Modal
   * @param  {boolean} bool
   */
  closeModal(bool: boolean) {
    this.dismiss.emit(bool);
  }

}
