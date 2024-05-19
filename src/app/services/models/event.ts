/* tslint:disable */
/* eslint-disable */
import { Organization } from '../models/organization';
import { User } from '../models/user';
export interface Event {
  eventDescription?: string;
  eventEndDate?: number;
  eventId?: number;
  eventLocation?: string;
  eventName?: string;
  eventStartDate?: number;
  eventStatus?: 'OPEN' | 'CLOSED';
  eventType?: 'SOCIAL' | 'ECO';
  organization?: Organization;
  volunteers?: Array<User>;
}
