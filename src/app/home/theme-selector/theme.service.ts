import { Injectable } from '@angular/core';

import {
  Store,
  StoreHelper,
  StateHelper
} from '../../shared';
import { Theme } from './theme.model';

@Injectable()
export class ThemeService {
  constructor(
    private store: Store,
    private storeHelper: StoreHelper) { }

  public getAllThemes(): Theme[] {
    const themes = [
      { name: 'Light', value: 'light', isSelected: false },
      { name: 'Dark', value: 'dark', isSelected: false }
    ];
    const selectedTheme = this.getActiveTheme();
    const selectedIndex = themes.findIndex(theme => theme.value === selectedTheme);
    themes[selectedIndex].isSelected = true;
    return themes;
  }

  public getActiveTheme(): string {
    const state = this.store.getState();
    return state.selectedTheme;
  }

  public changeTheme(theme: string) {
    this.storeHelper.update(StateHelper.selectedTheme, theme);
  }
}
