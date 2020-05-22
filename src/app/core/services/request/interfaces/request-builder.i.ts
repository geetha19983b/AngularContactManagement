export interface Service {
  body?: any;
  json?: any;
  method: 'POST' | 'GET' | 'PUT';
  url: string;
  optionalParams?: any;
}
