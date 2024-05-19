/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface AddVolunteer$Params {
  volunteerId: number;
  eventId: number;
}

export function addVolunteer(http: HttpClient, rootUrl: string, params: AddVolunteer$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, addVolunteer.PATH, 'post');
  if (params) {
    rb.query('volunteerId', params.volunteerId, {});
    rb.query('eventId', params.eventId, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

addVolunteer.PATH = '/api/v1/event/add-volunteer';
