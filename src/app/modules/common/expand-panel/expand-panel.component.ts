import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatExpansionPanelHeader } from '@angular/material/expansion';

@Component({
  selector: 'ual-expand-panel',
  templateUrl: './expand-panel.component.html',
  styleUrls: ['./expand-panel.component.scss']
})
export class ExpandPanelComponent implements OnInit {
  @Input() tabIndex = -1;
  @Input() disabled = false; // Whether the panel is disabled
  @Input() hideToggle = false; // Remove the caret -- used for custom caret icon
  @Input() expanded = false; // Whether the panel is expanded
  @Input() openOnTitleClick = false; // Move the trigger point to the title element
  @Input() openOnCaretClick = false; // Move the trigger point to expand the panel to the caret exclusively
  @Input() openOnClassClick = ''; // Move the trigger point to expand when this class is clicked;
  @Input() collapsedHeight = '40px'; // The default height of the header panels height while it's collapsed
  @Input() expandedHeight = '40px'; // The default height of the header panels height while it's expanded
  @Input() inverseHeader = false; // Header will appear below the content instead of above

  @Output() readonly afterCollapse = new EventEmitter<undefined>();
  @Output() readonly afterExpand = new EventEmitter<undefined>();
  @Output() readonly closed = new EventEmitter<undefined>();
  @Output() readonly opened = new EventEmitter<undefined>();
  @Output() readonly destroyed = new EventEmitter<undefined>();
  @Output() readonly expandToggled = new EventEmitter<boolean>();

  openOnAnyClick = true;

  constructor() { }

  ngOnInit() {
    this.openOnAnyClick = !(this.openOnCaretClick || this.openOnTitleClick || this.openOnClassClick);
  }

  togglePanel(matExpansionPanelHeader: MatExpansionPanelHeader, event: Event) {
    matExpansionPanelHeader._toggle();

    if (this.openOnAnyClick) {
      matExpansionPanelHeader._toggle();

      return undefined;
    }

    if (this.isExpansionIndicator(event.target as HTMLElement)) {
      matExpansionPanelHeader._toggle();
    }
  }

  togglePanelFromTitle(matExpansionPanelHeader: MatExpansionPanelHeader, event: MouseEvent) {
    event.stopPropagation();

    if (this.openOnAnyClick) {
      matExpansionPanelHeader._toggle();

      return undefined;
    }

    if (this.openOnTitleClick) {
      matExpansionPanelHeader._toggle();

      return undefined;
    }

    if (this.openOnClassClick && this.isClassClicked(event.target as HTMLElement)) {
      matExpansionPanelHeader._toggle();
    }
  }

  handleAfterCollapse() {
    this.afterCollapse.emit();
  }

  handleAfterExpand() {
    this.afterExpand.emit();
  }

  handleClosed() {
    this.expandToggled.emit(this.expanded);
  }

  handleOpened() {
    this.expandToggled.emit(this.expanded);
  }

  private isExpansionIndicator(target: HTMLElement): boolean {
    return target.classList && target.classList.contains('mat-expansion-indicator');
  }

  /**
   * Will search the dom up to 6 parents for given class name
   * @param target HTML Target which has been clicked
   * @param iteration Max iterations to go up the dom in search of class name
   */
  private isClassClicked(target: HTMLElement, iteration = 0) {
    const currentIteration = iteration + 1;

    if (!target || currentIteration > 5) {
      return false;
    }

    return target.classList &&
      target.classList.contains(this.openOnClassClick) ||
      this.isClassClicked(target.parentElement, currentIteration);
  }
}
