
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IconRegistryService } from '../../../core/services/icon-registry/icon-registry.service';

/**
 * If you're getting a 404 error...
 * You must download the icon and include it into the folder src/assets/orion/icons
 * ^ Make sure the icon is upper snake cased as the others are
 */

@Component({
  selector: 'ual-orion-icon',
  styleUrls: ['./orion-icon.component.scss'],
  templateUrl: './orion-icon.component.html'
})
export class OrionIconComponent implements OnInit, OnChanges {
  @Input() icon: string;

  constructor(
    private iconRegistryService: IconRegistryService
  ) { }

  /**
   * Handles when an icon value changes dynamically
   */
  ngOnChanges(changes: SimpleChanges) {
    if (!this.icon) { return; }
    if (changes.icon && !changes.icon.firstChange && changes.icon.currentValue !== changes.icon.previousValue) {
      this.capitalizeIcon();
      this.iconRegistryService.checkRegisteredIcons(this.icon);
    }
  }

  ngOnInit() {
    if (!this.icon) { return; }
    this.capitalizeIcon();
    this.iconRegistryService.checkRegisteredIcons(this.icon);
  }

  private capitalizeIcon() {
    const firstChar = this.icon.charAt(0);
    this.icon = this.icon.replace(firstChar, firstChar.toUpperCase());
  }
}
