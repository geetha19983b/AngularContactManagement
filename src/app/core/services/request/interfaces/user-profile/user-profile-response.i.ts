export interface UserProfileResponse {
  userId:string;
  firstName: string;
  lastName: string;
  birthDate: string;
  trivia: string;
  bio : string;
  avatar:string;
  designation:string;
  contactInfo: UserContactInfo;
  errorMessage?: any;
  statusCode?: any;
  responseData?: any;
  expandedStatus?: boolean;
}

export interface UserContactInfo {
  emails: string[];
  phoneNumbers: PhoneNumber[];
  addressLines: string[];
  countryCode: string;
}

export interface PhoneNumber {
  type: string;
  countryAccessCode: string;
  number: string;
  comment: string;
}
