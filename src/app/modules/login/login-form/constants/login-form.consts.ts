import { Validators } from '@angular/forms';
import { UALValidators } from '../../../../common/validators/validators';

export class LoginFormConsts {
  /** Base Validators */

  static readonly USERID_VALIDATORS = Validators.compose([
    UALValidators.required(),
    UALValidators.minLength(4),
    UALValidators.maxLength(4),
    UALValidators.numeric()
  ]);

  static readonly PASSWORD_VALIDATORS = Validators.compose([
    UALValidators.required(),
    UALValidators.minLength(2),
    UALValidators.maxLength(2),
    UALValidators.alphanumeric()
  ]);

}