export class FormUtils {

  /**
   * Resets a control to initial state
   * Empties the value
   * Sets the control as untouched
   */
  static clearValue(control: AbstractControlTyped<string>) {
    control.setValue('');
    control.markAsUntouched();
  }

  /**
   * Removed the maxLength error from the errors array
   * @Usage Used on blur of an input
   */
  static clearMaxLenValidatorMessage(control: AbstractControlTyped<string>) {
    control.setErrors(
      Object.entries(control.errors)
        .filter(([key, value]) => {
          if (key === 'maxLength') {
            return true;
          }

          return false;
        })
    );

    control.updateValueAndValidity();
  }

  static showRequiredControls(formGroup: FormGroup) {
    Object.values(formGroup.controls)
      .forEach(control => {
        control.markAsTouched();
      });

    formGroup.markAsTouched();
  }
}
