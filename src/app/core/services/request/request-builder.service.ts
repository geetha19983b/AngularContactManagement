import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from './interfaces/request-builder.i';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestBuilderService {
  private _BASE_URL = this.setBaseApiUrlFromDomain();

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Executes GET and POST requests
   * @returns service response data
   */
  setRequest(requestData: Service) {
    if (requestData.method.toLowerCase() === 'get') {
      return this.http
        .get(this._BASE_URL + requestData.url);
    } else if (requestData.method.toLowerCase() === 'post') {
      return this.http
        .post(this._BASE_URL + requestData.url, requestData.json) as any;
    } else if (requestData.method.toLowerCase() === 'put') {
      return this.http
        .put(this._BASE_URL + requestData.url, requestData.json) as any;
    }
  }

  /**
   * Determine the Api url based off domain origin
   * @returns Api url if found in config object, else return default config apiUrl
   */
  private setBaseApiUrlFromDomain() {
    const domainOriginUrl = location.origin;

    if (domainOriginUrl.includes('localhost')) {
      return environment.apiUrl;
    }

    //return `${domainOriginUrl}/api/`;
    return 'api/';
    
  }

}