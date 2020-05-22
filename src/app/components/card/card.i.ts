export interface TabChangedEvent {
  index: number;
}

export interface ExpandToggledEvent {
  component: HTMLElement;
  expanded: boolean;
  moveOrder?: number;
}

export interface CardFabIcon {
  color: string;
  headerTitle?: string;
  label: string;
  selected: boolean;
  id?: string;
  toolTipText?: string;
}

export interface CardCustomerData {
  PNRNumber?: string;
  FirstName: string;
  LastName: string;
  MPNumber?: string;
  dob: string;
  MileagePlusLevel?: string;
  MillionMilerStatus?: string;
}

export type ExpandedIconState = 'fullscreen' | 'fullscreen_exit';
