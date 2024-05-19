/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createOrganization } from '../fn/organization-controller/create-organization';
import { CreateOrganization$Params } from '../fn/organization-controller/create-organization';

@Injectable({ providedIn: 'root' })
export class OrganizationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createOrganization()` */
  static readonly CreateOrganizationPath = '/api/v1/organization';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createOrganization()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrganization$Response(params: CreateOrganization$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return createOrganization(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createOrganization$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrganization(params: CreateOrganization$Params, context?: HttpContext): Observable<{
}> {
    return this.createOrganization$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
