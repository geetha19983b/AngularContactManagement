import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { CardFabIcon, ExpandedIconState, TabChangedEvent } from './card.i';

@Component({
  selector: 'ual-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {
  @Input() bar = false;
  @Input() canExpand = true;
  @Input() expanded = false;
  @Input() fabIcons: CardFabIcon[] = [];
  @Input() headerTitle: string;
  @Input() menuOptions: any[] = [];
  @Input() moveOrder = 0;
  @Input() showHeader = true;
  @Input() showMenu = true;
  @Input() stickyContent = false;
  @Input() canNotAddFab = false;
  @Input() readonly maxFabIcons = 6;

  @Output() readonly beforeAddNewFab = new EventEmitter<undefined>();
  @Output() readonly expandToggled = new EventEmitter<boolean>();
  @Output() readonly tabChanged = new EventEmitter<TabChangedEvent>();

  @ViewChild('matTabGroup') matTabGroup: MatTabGroup;

  canAddNewFab = true;
  canMoveDown = false;
  canMoveUp = false;
  expandedIcon: ExpandedIconState = this.expanded ? 'fullscreen' : 'fullscreen_exit';
  panelCardClasses = {};
  outletName = 'router-outlet';

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  /**
   * Assumes all cards are siblings of one another.
   * If there is a sibling above or below this card, then enable
   * or disable the move up / move down menu item.
   */
  checkSiblingElements(): void {
    const elemRef: HTMLElement = this.elementRef.nativeElement;
    const parentRef: HTMLElement = this.renderer.parentNode(elemRef);
    const aboveElem = parentRef.previousElementSibling;
    const belowElem = parentRef.nextElementSibling;

    this.canMoveUp = !!aboveElem && aboveElem.localName === this.outletName ? false : !!aboveElem;
    this.canMoveDown = !!belowElem && belowElem.localName === this.outletName ? false : !!belowElem;
    this.setMoveOrder();
  }

  fabTrackBy(index: number, cardFab: CardFabIcon): string {
    return cardFab.id;
  }

  handleAddNewFab(): void {
    const currentFabIconCount = this.fabIcons.length;

    if (currentFabIconCount < this.maxFabIcons) {
      this.beforeAddNewFab.emit();

      // If parent added their own fab icon do nothing
      if (currentFabIconCount === this.fabIcons.length) {
        this.fabIcons.push({
          selected: false,
          color: 'accent',
          label: `${currentFabIconCount + 1}`,
          headerTitle: 'New Panel'
        });
      }

      this.canAddNewFab = this.checkCanAddNewFab();
    }
  }

  /** When the tab changes, update the mat ink bar */
  handleChangeTab(index: number): void {
    const elRef: HTMLElement = this.elementRef.nativeElement;
    const matInkBar = elRef.querySelector('mat-ink-bar');
    const inkBarFromTop = (index * 45) + 5;

    this.renderer.setStyle(matInkBar, 'top', `${inkBarFromTop}px`);

    this.updateSelected(index);
    this.tabChanged.emit({ index });
  }

  movePanelDown(): void {
    const elemRef: HTMLElement = this.elementRef.nativeElement;
    const parentRef: HTMLElement = this.renderer.parentNode(elemRef);
    const containerRef: HTMLElement = this.renderer.parentNode(parentRef);
    const containerChildren = Array.from(containerRef.children)
      .filter(containerChild => containerChild.localName !== this.outletName);
    const updatedMoveOrder = this.moveOrder += 2;

    const insertBefore: HTMLElement = containerChildren[updatedMoveOrder] as HTMLElement;

    if (insertBefore) {
      this.renderer.insertBefore(containerRef, parentRef, insertBefore);
    } else {
      this.renderer.appendChild(containerRef, parentRef);
    }
  }

  movePanelUp(): void {
    const elemRef: HTMLElement = this.elementRef.nativeElement;
    const parentRef: HTMLElement = this.renderer.parentNode(elemRef);
    const containerRef: HTMLElement = this.renderer.parentNode(parentRef);
    const containerChildren = Array.from(containerRef.children)
      .filter(containerChild => containerChild.localName !== this.outletName);
    const updatedMoveOrder = this.moveOrder > 0 ? this.moveOrder -= 1 : 0;

    const insertBefore: HTMLElement = containerChildren[updatedMoveOrder] as HTMLElement;
    this.renderer.insertBefore(containerRef, parentRef, insertBefore);
  }

  ngAfterViewInit() {
    if (this.stickyContent) {
      this.updateTabHeaderHeight();
    }
  }

  ngOnInit() {
    this.setExpandedState();
    this.canAddNewFab = this.checkCanAddNewFab();
    this.stickyContent = this.checkShowStickyContent();
    this.panelCardClasses = this.formPanelCardClasses();
    this.setFabIcons();
    this.checkSiblingElements();
  }

  toggleExpand(): void {
    this.expanded = !this.expanded;
    this.setExpandedState();
    this.expandToggled.emit(this.expanded);
    this.expandedIcon = this.expanded ? 'fullscreen_exit' : 'fullscreen';
  }

  private checkCanAddNewFab() {
    return this.fabIcons.length < this.maxFabIcons && !this.canNotAddFab;
  }

  /** You can't have sticky content without multiple fabs */
  private checkShowStickyContent() {
    return this.stickyContent && (this.fabIcons.length > 1 || this.bar && this.canAddNewFab);
  }

  private formPanelCardClasses() {
    return {
      'sticky-content': this.stickyContent,
      'no-bar': !this.bar
    };
  }

  private setExpandedState(): void {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;

    if (this.expanded) {
      this.renderer.removeClass(nativeElement, 'collapsed');
      this.renderer.addClass(nativeElement, 'expanded');
    } else {
      this.renderer.removeClass(nativeElement, 'expanded');
      this.renderer.addClass(nativeElement, 'collapsed');
    }
  }

  /** If no fab icons are given, then generate one */
  private setFabIcons(): void {
    if (!this.fabIcons.length) {
      this.fabIcons = [{
        label: '1',
        headerTitle: this.headerTitle,
        color: 'accent',
        selected: true,
        id: `${this.fabIcons.length}`,
        toolTipText: `${this.fabIcons.length}`
      }];
    }
  }

  /** The order in which this card exists on the dom */
  private setMoveOrder(): void {
    let currentMoveOrder = 0;
    const elemRef: HTMLElement = this.elementRef.nativeElement;
    const parentRef: HTMLElement = this.renderer.parentNode(elemRef);
    const containerRef: HTMLElement = this.renderer.parentNode(parentRef);
    const containerChildren = Array.from(containerRef.children)
      .filter(containerChild => containerChild.localName !== this.outletName);

    containerChildren.forEach((child, index) => {
      if (child === parentRef) {
        currentMoveOrder = index;
      }
    });

    this.moveOrder = currentMoveOrder;
  }

  private updateSelected(selectedIndex: number): void {
    this.fabIcons.forEach((fabIcon, index) => {
      index === selectedIndex ? fabIcon.selected = true : fabIcon.selected = false;
    });
  }

  private updateTabHeaderHeight(): void {
    const elRef: HTMLElement = this.elementRef.nativeElement;
    const tabHeaderContainer = elRef.getElementsByTagName('mat-tab-header')[0];
    const stickyContentContainerHeight = elRef.getElementsByClassName('content sticky')[0].clientHeight;
    const updatedHeight = `calc(100% + ${stickyContentContainerHeight}px)`;
    this.renderer.setStyle(tabHeaderContainer, 'height', updatedHeight);
  }
}
