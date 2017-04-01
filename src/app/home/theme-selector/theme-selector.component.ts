import { Component } from '@angular/core';

import { Theme } from './theme.model';
import { ThemeService } from './theme.service';

@Component({
  selector: 'fs-theme-selector',
  template: `
  <button md-icon-button
          [mdMenuTriggerFor]="themeMenu">
    <md-icon> color_lens </md-icon>
  </button>
  <md-menu #themeMenu="mdMenu">
    <button *ngFor="let theme of themes"
            md-menu-item
            (click)="selectTheme(theme.value)">
      <span>
        <md-icon *ngIf="theme.isSelected">check</md-icon>
        {{theme.name}}
      </span>
    </button>
  </md-menu>
  `
})

export class ThemeSelectorComponent {
  public themes: Theme[];
  constructor(private themeService: ThemeService) {
    this.fillThemes();
  }

  public selectTheme(theme: string) {
    this.themeService.changeTheme(theme);
    this.fillThemes();
  }

  private fillThemes() {
    this.themes = this.themeService.getAllThemes();
  }
}
