
export interface UALValidatorErrors {
  [key: string]: UALValidatorError;
}

export interface UALValidatorError {
  invalid: boolean;
  message: string;
}

export type UALValidator =
  'totalMaxLength' |
  'alphabetic' |
  'alphanumeric' |
  'maxLength' |
  'numeric' |
  'email' |
  'postalCode' |
  'atLeastOneRequired';
