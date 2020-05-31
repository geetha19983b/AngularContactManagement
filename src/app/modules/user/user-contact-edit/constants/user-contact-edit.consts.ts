import { Validators } from '@angular/forms';
import { UALValidators } from 'src/app/common/validators/validators';

export class UserContactEditConsts {
  static readonly FIRST_NAME_VALIDATORS = Validators.compose([
    UALValidators.required(),
    UALValidators.alphabetic()
  ]);

  static readonly LAST_NAME_VALIDATORS = Validators.compose([
    UALValidators.required(),
    UALValidators.alphabetic()
  ]);

  static readonly DATE_VALIDATORS = Validators.compose([
    UALValidators.required(),
    UALValidators.minDate(150, 'years'),
    UALValidators.maxDate(0),
    UALValidators.date()
  ]);

  static readonly TRIVIA_VALIDATORS = Validators.compose([
    UALValidators.required()
    //UALValidators.alphabetic()
  ]);

  static readonly BIO_VALIDATORS = Validators.compose([
    UALValidators.required()
    //UALValidators.alphabetic()
  ]);
}