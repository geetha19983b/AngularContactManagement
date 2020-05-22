import { ValidatorFn } from '@angular/forms';
import moment from 'moment';
import { UALValidatorHelpers } from './validator-helpers';
import { UALValidatorErrors } from './validators.i';

export class UALValidators {
  static readonly DATE_FORMAT = 'DD MMM YYYY';

  /**
   * Returns whether or not the control value consists only of alphabetic characters
   */
  static alphabetic(): ValidatorFn {
    const pattern = /^[a-zA-Z]*$/;
    const regex = new RegExp(pattern);
    const message = 'Alphabetical characters only';
    const errorKey = 'alphabetic';

    return (control: AbstractControlTyped<string>): UALValidatorErrors =>
      UALValidatorHelpers.controlRegexErrorHelper(control, regex, message, errorKey);
  }

  /**
   * Returns whether or not the control value consists only of alphanumeric characters
   */
  static alphanumeric(): ValidatorFn {
    const pattern = /^[a-zA-Z0-9]*$/;
    const regex = new RegExp(pattern);
    const message = 'Alphanumeric characters only';
    const errorKey = 'alphanumeric';

    return (control: AbstractControlTyped<string>): UALValidatorErrors =>
      UALValidatorHelpers.controlRegexErrorHelper(control, regex, message, errorKey);
  }

  /**
   * Returns whether or not the control value exceeds maximum given characters
   */
  static maxLength(maxLength: number): ValidatorFn {
    // TODO: Figure out how to get the error message to show without invalidating the field
    // const errorKey = 'maxLength';
    // const message = `May not exceed ${maxLength} characters`;

    return (control: AbstractControlTyped<string>): UALValidatorErrors => {
      const invalid = !!control.value && control.value.length > maxLength;

      if (invalid) {
        control.setValue(control.value.slice(0, -1), {
          emitEvent: false
        });
      }

      // TODO: Figure out how to get the error message to show without invalidating the field
      return undefined;
    };
  }

  /**
   * Returns whether or not the control value contains at least given minimum characters
   */
  static minLength(minLength: number): ValidatorFn {
    const errorKey = 'minLength';
    const message = `Minimum ${minLength} characters`;

    return (control: AbstractControlTyped<string>): UALValidatorErrors => {
      const invalid = !!control.value && control.value.length < minLength;

      return UALValidatorHelpers.controlErrorHelper(control, invalid, message, errorKey, true);
    };
  }

  /**
   * Returns whether or not the control value consists only of numeric characters
   */
  static numeric(): ValidatorFn {
    const pattern = /^[0-9]*$/;
    const regex = new RegExp(pattern);
    const message = 'Numeric characters only';
    const errorKey = 'numeric';

    return (control: AbstractControlTyped<string>): UALValidatorErrors =>
      UALValidatorHelpers.genericControlHandler(control, regex, message, errorKey);
  }

  /**
   * Returns whether or not the control value is a semi valid email
   */

  static email(msg?: string): ValidatorFn {
    const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const regex = new RegExp(pattern);
    let message = 'Invalid email format';
    const errorKey = 'email';

    if (msg) {
      message = msg;
    }

    return (control: AbstractControlTyped<string>): UALValidatorErrors => {
      if (!control.value || !control.value.length) {
        return undefined;
      }

      return UALValidatorHelpers.controlRegexErrorHelper(control, regex, message, errorKey, true);
    };
  }
  /**
   * Returns the given field is mandatory
   */
  static required(stageError = true): ValidatorFn {
    const message = 'Field is required';
    const errorKey = 'required';

    return (control: AbstractControlTyped<string>): UALValidatorErrors => {
      const invalid = control.value === '';

      return UALValidatorHelpers.controlErrorHelper(control, invalid, message, errorKey, stageError);
    };
  }

  /**
   * Returns alphanumeric characters with just 2 or 3 letters followed by numbers
   */
  static mileagePlus(): ValidatorFn {
    const pattern = /^[a-zA-Z]{2,3}[0-9]*$/;
    const regex = new RegExp(pattern);
    const message = 'Invalid format';
    const errorKey = 'mileagePlus';

    return (control: AbstractControlTyped<string>): UALValidatorErrors => {
      if (!control.value || !control.value.length || control.value.length <= 2) {
        return undefined;
      }

      return UALValidatorHelpers.controlRegexErrorHelper(control, regex, message, errorKey, false);
    };
  }

  /**
   * Returns true if date entered is less than min
   * @param min Number of days from current date
   * @param units Units of measure to represent min -- default is days
   */
  static minDate(min: number, units: moment.unitOfTime.DurationConstructor = 'days'): ValidatorFn {
    const errorKey = 'matDatepickerMin';
    const message = 'Invalid min date';

    return (control: AbstractControlTyped<string>): UALValidatorErrors => {
      if (!control.value) {
        return undefined;
      }

      const date = moment(control.value)
        .utc();
      const minDate = moment()
        .subtract(min + 1, units)
        .utc();
      const invalid = date.isBefore(minDate);

      return UALValidatorHelpers.controlErrorHelper(control, invalid, message, errorKey, true);
    };
  }

  /**
   * Returns true if date entered exceeds max
   * @param max Number of days from current date
   * @param units Units of measure to represent max -- default is days
   */
  static maxDate(max: number, units: moment.unitOfTime.DurationConstructor = 'days'): ValidatorFn {
    const errorKey = 'matDatepickerMax';
    const message = 'Invalid max date';

    return (control: AbstractControlTyped<string>): UALValidatorErrors => {
      const date = moment(control.value)
        .utc();
      const maxDate = moment()
        .add(max, units)
        .utc();
      const invalid = date.isAfter(maxDate);

      return UALValidatorHelpers.controlErrorHelper(control, invalid, message, errorKey, true);
    };
  }

  static date(): ValidatorFn {
    const errorKey = 'matDatepickerParse';
    const message = 'Invalid format';

    return (control: AbstractControlTyped<string>): UALValidatorErrors => {
      if (control.value === '') {
        return undefined;
      }
      const inputValue = moment(control.value)
        .format(UALValidators.DATE_FORMAT);

      const invalid = (moment(inputValue, UALValidators.DATE_FORMAT)
        .format(UALValidators.DATE_FORMAT)
        .toUpperCase() !== inputValue.toUpperCase()) || inputValue === 'Invalid date';

      // TODO: Come back one day and try to figure out a better solution to remove these
      if (control.errors) {
        delete control.errors.matDatepickerParse;
        delete control.errors.matDatepickerMin;
        delete control.errors.matDatepickerMax;
      }

      return UALValidatorHelpers.controlErrorHelper(control, invalid, message, errorKey, true);
    };
  }

  /**
   * Allows developer to set the state of a control to invalid with a custom error message
   * This method is used if there is some custom validation logic to be done at the
   * component level.
   * @param message Custom error message for your invalidated control
   */
  static invalidateControl(message: string): ValidatorFn {
    const errorKey = 'invalidateControl';

    return (control: AbstractControlTyped<string>): UALValidatorErrors => {
      if (!control.value || !control.value.length) {
        return undefined;
      }

      return UALValidatorHelpers.controlErrorHelper(control, true, message, errorKey);
    };
  }

  /**
   * Valida characters include letters, numbers, spaces, hyphens, periods
   */
  static postalCode(): ValidatorFn {
    const pattern = /^[a-zA-Z0-9-. ']*$/;
    const regex = new RegExp(pattern);
    const message = 'Unexpected character';
    const errorKey = 'postalCode';

    return (control: AbstractControlTyped<string>): UALValidatorErrors =>
      UALValidatorHelpers.controlRegexErrorHelper(control, regex, message, errorKey);
  }

  /**
   * Returns whether or not the total length of given control keys is greater than or equal to a given
   * max length
   *
   * @param groupName Control Group to display in the error message. i.e. "Full name... exceeds maxLen characters"
   */
  static totalMaxLength(controlKeys: string[], maxLen: number, groupName: string): ValidatorFn {
    const message = `${groupName} exceeds ${maxLen} characters`;
    const errorKey = 'totalMaxLength';

    return (formGroup: FormGroupTyped<any>): UALValidatorErrors => {
      const formGroupControlKeys = controlKeys || Object.keys(formGroup.controls);
      let totalLength = 0;

      formGroupControlKeys.forEach(formGroupControlKey => {
        totalLength += formGroup.controls[formGroupControlKey].value.length;
      });

      const invalid = totalLength > maxLen;

      formGroupControlKeys.forEach(formGroupControlKey => {
        const control = formGroup.controls[formGroupControlKey];

        if (!control.hasError('required')) {
          control.setErrors(
            UALValidatorHelpers.controlErrorHelper(control, invalid, message, errorKey), {
            emitEvent: false
          });
        }
      });

      return UALValidatorHelpers.formGroupErrorHelper(invalid, message, errorKey);
    };
  }

  /**
   * Validator for if the controls of a formgroup have a value
   * @param controlKeys Will only check these controls if given. If undefined, we check all controls on the formGroup.
   * @returns true if all given controls have no values.
   */
  static atLeastOneRequired(controlKeys?: string[]): ValidatorFn {
    const message = 'At least 1 field is required';
    const errorKey = 'mustContainValue';

    return (formGroup: FormGroupTyped<any>): UALValidatorErrors => {
      const formGroupControlKeys = controlKeys || Object.keys(formGroup.controls);
      /** If all the controls are empty, set invalid to true */
      const invalid = !!!formGroupControlKeys
        .find(key => formGroup.controls[key].value);

      return UALValidatorHelpers.formGroupErrorHelper(invalid, message, errorKey);
    };
  }

  /**
   * Validates if the controls of a formgroup have a value or combination with the special field
   * @param primaryValidationSet has the values which are atleast one of them is required for the valid validity
   * * @param secondaryValidationSet has the values which requires validateAgainst value for the valid validation
   * * @param validateAgainst is the special field which reuires combination of secondaryValidationSet values for valid validation
   * @returns true if all given controls have no values or fields that has value that cant enable search alone.
   */
  static lastNameCombinations(
    primaryValidationSet: string[],
    secondaryValidationSet: string[],
    validateAgainst: string): ValidatorFn {
    const message = `atleast 1 field or combination of ${validateAgainst} is required`;
    const errorKey = 'mustContainValueWithLastName';

    return (formGroup: FormGroup): UALValidatorErrors => {
      const formGroupControlKeys = primaryValidationSet || Object.keys(formGroup.controls);
      const primaryValuesExists = formGroupControlKeys
        .find(key => formGroup.controls[key].value);

      const invalid = primaryValuesExists ? false : !(secondaryValidationSet
        .find(key => formGroup.controls[key].value) && formGroup.controls[validateAgainst].value);

      return UALValidatorHelpers.formGroupErrorHelper(invalid, message, errorKey);
    };
  }

  /**
   * Checks if a given set of controls have valid values before enabling the form
   * @param controlKeys Group of controls which need to have values before the form is considered valid
   */
  static groupRequired(controlKeys?: string[]): ValidatorFn {
    const message = `Fields required: ${String(controlKeys)}`;
    const errorKey = 'groupRequired';

    return (formGroup: FormGroupTyped<any>): UALValidatorErrors => {
      const formGroupControlKeys = controlKeys || Object.keys(formGroup.controls);
      /** If all the controls are empty, set invalid to true */
      const invalid = formGroupControlKeys
        .some(key =>
          !formGroup.controls[key].value || !formGroup.controls[key].valid
        );

      return UALValidatorHelpers.formGroupErrorHelper(invalid, message, errorKey);
    };
  }

  /**
   * Returns whether or not the control value consists only of the characters in the regex
   */
  static bookingClass(): ValidatorFn {
    const pattern = /^[A-Za-z]$/;
    const regex = new RegExp(pattern);
    const message = 'Invalid booking class';
    const errorKey = 'bookingClass';

    return (control: AbstractControlTyped<string>): UALValidatorErrors =>
      UALValidatorHelpers.genericControlHandler(control, regex, message, errorKey);
  }

  static includeSpecificFilters(): ValidatorFn {
    const pattern = /^([ ]?[a-zA-Z]{2}[ ]?,)*([ ]?[a-zA-Z]{2}[ ]?)+$/;
    const regex = new RegExp(pattern);
    const message = 'Invalid Format';
    const errorKey = 'includeSpecificFilters';

    return (control: AbstractControlTyped<string>): UALValidatorErrors =>
      UALValidatorHelpers.genericControlHandler(control, regex, message, errorKey);
  }

  static datesOrder(): ValidatorFn {
    const message = 'Dates are not in order';
    const errorKey = 'datesOrderRequired';

    return (formGroup: FormGroupTyped<any>): UALValidatorErrors => {
      const trips = formGroup.controls as any as FormGroupTyped<any>[];

      for (let i = 0; i < trips.length - 1; i++) {
        const trip = trips[i] as FormGroup;
        const nextTrip = trips[i + 1] as FormGroup;

        if (!trip.controls.departureDate.value || !nextTrip.controls.departureDate.value) {
          return UALValidatorHelpers.formGroupErrorHelper(true, message, errorKey);
        } else if (moment(trip.controls.departureDate.value, UALValidators.DATE_FORMAT, true)
          .isAfter(moment(nextTrip.controls.departureDate.value, UALValidators.DATE_FORMAT, true))) {
          return UALValidatorHelpers.formGroupErrorHelper(true, message, errorKey);
        }
      }
    };
  }

  static allRowsDisabled(): ValidatorFn {
    const message = 'All rows disabled';
    const errorKey = 'allRowsDisabled';

    return (formGroup: FormGroupTyped<any>): UALValidatorErrors => {
      const trips = formGroup.controls as any as FormGroupTyped<any>[];
      const enabledRows = trips.find(form => !form.value.isDisabled);
      if (!enabledRows) {
        return UALValidatorHelpers.formGroupErrorHelper(true, message, errorKey);
      }
    };
  }
}
