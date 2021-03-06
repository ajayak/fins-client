import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'fs-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent {
  @Input() public open = false;

  public folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
}
