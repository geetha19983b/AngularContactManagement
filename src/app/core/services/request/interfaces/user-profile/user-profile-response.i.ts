export interface UserProfileResponse {
  id:number;
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
  facebookId:string,
  linkedInId:string;
  twitterId:string;
  phoneNumbers: PhoneNumber[];
  homeAddressLines: string[];
  officeAddressLines: string[];
  countryCode: string;
}

export interface PhoneNumber {
  type: string;
  countryAccessCode: string;
  number: string;
  comment: string;
}
