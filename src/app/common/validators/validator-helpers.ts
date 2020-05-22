import { UALValidatorErrors } from './validators.i';
import { FormControl } from '@angular/forms';

/**
 * The purpose of this class is to abstract repeatable code from
 * within the UALValidator class
 */
export class UALValidatorHelpers {

  /**
   * @description Helper method to handle standardized way to update a UALValidator error which uses a regex
   */
  static controlRegexErrorHelper(
    control: AbstractControlTyped<string>,
    regex: RegExp,
    message: string,
    errorKey: string,
    stageError = false
  ): UALValidatorErrors {
    const passed = regex.test(control.value);

    if (!passed) {
      if (stageError) {
        control.markAsUntouched();
      } else {
        control.markAsTouched();
      }

      control.errorMessage = message;

      return {
        [errorKey]: {
          invalid: true,
          message
        }
      };
    }

    if (control.errorMessage && control.errorMessage === message) {
      control.errorMessage = undefined;
    }

    let hasControlErrors = false;
    if (control.errors) {
      delete control.errors[errorKey];
      hasControlErrors = !!Object.keys(control.errors).length;
    }

    return hasControlErrors ? control.errors : undefined;
  }

  /**
   * @description Helper method to handle standardized way to update a UALValidator error
   */
  static controlErrorHelper(
    control: AbstractControlTyped<string>,
    invalid: boolean,
    message: string,
    errorKey: string,
    stageError = false
  ): UALValidatorErrors {
    if (invalid) {
      if (stageError) {
        control.markAsUntouched();
      } else {
        control.markAsTouched();
      }

      control.errorMessage = message;

      return {
        [errorKey]: {
          invalid: true,
          message
        }
      };
    }

    if (control.errorMessage && control.errorMessage === message) {
      control.errorMessage = undefined;
    }

    let hasControlErrors = false;
    if (control.errors) {
      delete control.errors[errorKey];
      hasControlErrors = !!Object.keys(control.errors).length;
    }

    return hasControlErrors ? control.errors : undefined;
  }

  /**
   * @description Helper method to handle standardized way to update a UALValidator error
   */
  static formGroupErrorHelper(
    invalid: boolean,
    message: string,
    errorKey: string
  ): UALValidatorErrors {
    if (invalid) {
      return {
        [errorKey]: {
          invalid: true,
          message
        }
      };
    }

    return undefined;
  }

  static genericControlHandler(control: AbstractControlTyped<string>, regex: RegExp, message: string, errorKey: string) {
    if (!control.value || !control.value.length) {
      return undefined;
    }

    return UALValidatorHelpers.controlRegexErrorHelper(control, regex, message, errorKey);
  }
}
