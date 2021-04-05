import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appRandomColor]'
})
export class RandomColorDirective {

  @HostBinding('style.color')
  backgroundColor: string = this.getRandomColor();
  constructor() { }

  private getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

}
