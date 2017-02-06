import {
  Component,
  OnInit
} from '@angular/core';

import {
  StateHelper,
  StoreHelper
} from '../shared';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  // TypeScript public modifiers
  constructor(
    public storeHelper: StoreHelper
  ) { }

  public ngOnInit() {
    console.log('hello `Home` component');
  }

  public submitState(value: string) {
    console.log('submitState', value);
    if (value.length > 0) {
      this.storeHelper.update(StateHelper.showSpinner, true);
    } else {
      this.storeHelper.update(StateHelper.showSpinner, false);
    }
    this.localState.value = '';
  }
}
