import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'signin-form',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  @Output() onsubmit = new EventEmitter();

  signIn() {
    console.log('Form submitted');
    this.onsubmit.emit();
  }
}
