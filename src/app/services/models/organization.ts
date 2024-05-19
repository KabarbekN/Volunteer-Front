/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface Organization {
  address?: string;
  bin?: string;
  description?: string;
  email?: string;
  name?: string;
  organizationId?: number;
  owner?: User;
  phone?: string;
}
