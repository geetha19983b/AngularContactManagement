import { MatSnackBarConfig } from '@angular/material/snack-bar';

export type SnackType = 'error' | 'success' | 'info' | 'warning' | 'critical';

export interface SnackParams {
  snackType?: SnackType;
}

export interface SnackBarQueueItem {
  beingDispatched: boolean;
  configParams?: MatSnackBarConfig<SnackBarParams>;
}

export interface SnackBarParams {
  type: string;
  message: string;
  hasIcon?: boolean;
  iconName?: string;
  hasTitle?: boolean;
  title?: string;
  hasSuccessIcon?: boolean;
  hasAction?: boolean;
  actionName?: string;
  actionData?: any;
}
