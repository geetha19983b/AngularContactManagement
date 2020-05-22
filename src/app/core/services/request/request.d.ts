export interface PostBodyRequest {
  body: object;
}

export interface PostJsonRequest {
  json: object;
}

export interface ServiceQueryParameter {
  params: any;
  url: string;
}

export interface PageLoadSpinner {
  enabled: boolean;
  description: string;
}
